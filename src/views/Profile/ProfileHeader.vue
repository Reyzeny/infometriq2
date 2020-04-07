<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div v-if="imageUploadStatus=='upload_error'" class="error">Error uploading image</div>
                        <div class="profile-img">
                            <img v-if="profiledata.profile_image" :src="profiledata.profile_image" class="card-img-top" alt="Profile Image">
                            <img v-else src="../../assets/images/user_image_placeholder.svg" class="card-img-top" alt="Profile Image">
                            <span v-if="imageUploadStatus=='uploading'" class="spinner-image spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                            <span class="btn-file">
                                <img class="edit-image" src="../../assets/images/photo-camera.svg"><input type="file" @change="imageSelected">
                            </span>
                        </div>
                        <div class="card-body user-quote">
                            <p>Quote:</p>
                            <blockquote><span>&ldquo;</span>{{profiledata.quote}}<span>&rdquo;</span></blockquote>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card profile-content">
                        <h1 class="fullname">{{profiledata.firstname}} {{profiledata.lastname}}</h1>
                        <p class="occupation">{{profiledata.occupation}}</p>
                        <div v-for="(info, name) in information" :key="info" class="row">
                            <div class="col-xs-4 data">
                                {{name}}:
                            </div>
                            <div class="col-xs-8 data-value">
                                {{info}}
                            </div>
                        </div>
                        <div class="social-media">
                            <a target="_blank" :href="profiledata.facebook"><img src="../../assets/images/facebook.png"/></a>
                            <a target="_blank" :href="profiledata.instagram"><img src="../../assets/images/instagram.png"/></a>
                            <a target="_blank" :href="profiledata.twitter"><img src="../../assets/images/twitter.png"/></a>
                            <a target="_blank" :href="profiledata.youtube"><img src="../../assets/images/youtube.png"/></a>
                            <a target="_blank" :href="profiledata.linkedin"><img src="../../assets/images/linkedin.png"/></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card content">
                        <p class="content-header">Content</p>
                        <a class="contents" href="#life"><span><img src="../../assets/images/user.png"/></span><span class="contents-title">{{life}}</span></a>
                        <a class="contents" href="#business"><span><img src="../../assets/images/business.png"/></span><span class="contents-title">Business</span></a>
                        <a class="contents" href="#political"><span><img src="../../assets/images/political.png"/></span><span class="contents-title">Political</span></a>
                        <a class="contents" href="#recognition"><span><img src="../../assets/images/recognition.png"/></span><span class="contents-title">Recognition</span></a>
                        <a class="contents" href="#references"><span><img src="../../assets/images/references.png"/></span><span class="contents-title">References</span></a>
                        <a class="contents" href="#history"><span><img src="../../assets/images/history.png"/></span><span class="contents-title">History</span></a>
                        <a class="contents" href="#view_cv"><span><img src="../../assets/images/viewcv.png"/></span><span class="contents-title">View CV</span></a>
                        <a class="contents" href="#signature"><span><img src="../../assets/images/signature.png"/></span><span class="contents-title">Signature</span></a>
                        <a class="contents" href="#reviews"><span><img src="../../assets/images/user.png"/></span><span class="contents-title">Reviews</span></a>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card badge-container">
                        <img class="text-center" src="../../assets/images/seal.png"/>
                        <video class="text-center" src="../../assets/images/seal.png"/>
                        
                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: "ProfileHeader",
    props: ['profiledata'],
    computed: {
        life: function() {
            return this.profiledata.type=='individual' ? 'Personal Life' : 'Company Profile';
        },

        information: function() {
            let websiteUrl = this.profiledata.website ? this.profiledata.website : `infometriq.com/${this.profiledata.username}`;
            return {
                "Born": this.formatDate(this.profiledata.birthday),
                "State": this.profiledata.state,
                "Country": this.profiledata.country,
                "Phone": this.profiledata.phone,
                "Website": websiteUrl,
                "Email": this.profiledata.email,
                "Social":""
            }
        },
        user_image() {
            return this.profiledata && this.profiledata.profile_image ? this.profiledata.profile_image : ""
        }
    },
    data () {
        return {
            profileImageSelected: '',
            imageUploadStatus: ''
        }
    },
    methods: {
        formatDate(date_string) {
            console.log("date string is ", date_string)
            console.log(typeof(date_string))
            if (!date_string) return;
            let date_split = date_string.split('-');
            let newDate = new Date(date_split[0], date_split[1]-1, date_split[2]);
            return newDate.toDateString();
        },
        imageSelected(e) {
            console.log("image selected")
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return
            this.createImage(files[0])
        },
        createImage(file) {
            console.log("created image file")
            let reader = new FileReader()
            let vm = this;
            reader.onload = (e)=>{
                vm.profileImageSelected = e.target.result;
                this.uploadMyImage(vm.profileImageSelected)
            }
            reader.readAsDataURL(file)
        },
        uploadMyImage(image) {
            console.log("upload immage")
            let userData = JSON.parse(localStorage.getItem("user_data"));
            let headerParams = {
                "Authorization":`Bearer ${userData.auth_token}`,
            }
            let config =  {
                headers: headerParams,
            }
            let myObject = {
                image: image
            }
            this.imageUploadStatus = 'uploading';
            axios.post('http://calm-plains-58791.herokuapp.com/api/upload-image', myObject, config)
                .then(response=>{
                    console.log("response is ", response.data.data.profile_image)
                    this.imageUploadStatus = 'uploaded'
                    this.profiledata.profile_image = ""
                    this.profiledata.profile_image = response.data.data.profile_image
                    console.log("profile data profile image is ", this.profiledata.profile_image)
            }).catch(error=>{
                this.imageUploadStatus = 'upload_error'
                console.log("error is ", error)
                console.log("error response is ", error.response)
            })
        },
    }
}
</script>

<style scoped>
section {
    margin-top: 4%;
}
.card {
    height: 35rem;
    overflow: hidden;
    box-shadow: 0 0 0 0;
    margin: 5%;
}
.profile-img {
    border-color: #E1E1E1;
}
.user-quote {
    background-color: #F6F6F6;
    border-color: #E1E1E1;
}
.user-quote p{
    font-size: 1.3rem;
}
.user-quote blockquote{
    font-size: 1.5rem;
    font-weight: 600;
}
.row .data {
    font-weight: 600;
}

.profile-content {
    border-color: darkgray;
    padding: 5%;
}

.profile-content .fullname {
    font-size: 2rem !important;
    color: black;
}
.occupation {
    margin-top: 4%;
    font-size: 1.9rem !important;
    font-weight: 500;
}
.social-media {
    margin-top: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: baseline;
}
.social-media a {
    margin: 2% 5%;
}
.social-media img {
    width: 1.8rem;
    height: 1.8rem;
}
.content {
    border-color: darkgray;
}
.content-header {
    border-bottom: 1px solid #E1E1E1;
    font-size: 1.8rem; 
    padding: 0 5%;
    margin: 1% 5%;
}
.content a {
    padding-top: 2%; 
}
.contents img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 5%;
    margin-left: 5%;
}
.contents .contents-title {
    font-size: 1.2rem;
    font-weight: 400;
}
.badge-container {
    border-color: darkgray;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

}
.badge-container img {
    height: 15rem;
    width: 15rem;
    margin: auto;
}

@media screen and (max-width: 768px) {
    .profile-img img {
        width: 0 auto;
        height: auto;
    }
    .card {
        height: auto;
    }
    .row .data-value {
        margin: 2% 0;
    }
    .row .data {
        margin: 2% 0;
    }
}




/* .btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;   
    cursor: inherit;
    display: block;
} */
.btn-file {
    width: 3rem !important;
    height: 3rem !important;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1%;
    margin-top: 1%;
}
.btn-file .edit-image {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: pointer; 
}
.spinner-image {
    position: absolute;
    top: 50%;
    right: 50%;
}
.error {
    color: red;
    font-size: 1.3rem;
}
</style>


