<template>
    <section class="profile-section profile-section--header bg-alt">
        <div class="container">
            <div class="wrap">
                <h3 class="profile-header__name">{{profiledata.firstname}} {{profiledata.lastname}}</h3>
                <div class="profile-header">
                    <div class="profile-header__avatar header-card">
                        <img :src="profiledata.profile_image" alt="" class="profile-header__avatar__image">
                    </div>
                    <div class="profile-header__meta header-card">
                        <div>
                            <div v-for="(info, name) in information" :key="info" class="profile-header__row">
                                <div class="profile-label">{{name}}:</div>
                                <div class="profile-value">{{info}}</div>
                                <div v-if="name=='Social'" class="profile-value">
                                    <ul class="list-inline">
                                        <li>
                                            <a :href="profiledata.linkedin" target="_blank"><i class="icon icon-linkedin"></i></a>
                                        </li>
                                        <li>
                                            <a :href="profiledata.twitter" target="_blank"><i class="icon icon-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a :href="profiledata.facebook" target="_blank"><i class="icon icon-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a :href="profiledata.instagram" target="_blank"><i class="icon icon-instagram"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="profile-header__row">
                                <div class="profile-label">Rating:</div>
                                <div class="profile-value">
                                    <i class="icon icon-star-full1 text-brand"></i>
                                    <i class="icon icon-star-full1 text-brand"></i>
                                    <i class="icon icon-star-full1 text-brand"></i>
                                    <i class="icon icon-star-full1 text-brand"></i>
                                    <i class="icon icon-star-full1 text-brand"></i>
                                </div>
                            </div>
                            <div class="profile-header__row">
                                <div class="profile-value m-t-sm text-bold text-brand">{{formatWebsiteUrl}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-header__content header-card">
                        <ul class="list-unstyled content-links">
                            <li><a href="#life"><i class="icon icon-user"></i> <span>Personal Life</span></a></li>
                            <li><a href="#business"><i class="icon icon-briefcase"></i> <span>Business</span></a></li>
                            <li><a href="#political"><i class="icon icon-users"></i> <span>Politics</span></a></li>
                            <li><a href="#recognition"><i class="icon icon-award"></i> <span>Recognition</span></a></li>
                            <li><a href="#references"><i class="icon icon-share"></i> <span>References</span></a></li>
                            <li><a href="#history"><i class="icon icon-globe"></i> <span>History</span></a></li>
                            <li><a href="#view_cv"><i class="icon icon-book"></i> <span>CV</span></a></li>
                            <li><a href="#signature"><i class="icon icon-edit"></i> <span>Signature</span></a></li>
                            <li><a href="#reviews"><i class="icon icon-chat-bubble-dots"></i> <span>Reviews</span></a></li>
                        </ul>
                    </div>
                    <div class="profile-header__badge header-card">
                        <div style="height: 200px; padding-top: 30px;">
                            <img src="@/assets/images/MetriQ-Verifiied.png" alt="">
                        </div>
                        <div>
                            <button class="btn btn-info"><i class="icon icon-video"></i> <span>Video</span></button>
                            <button class="btn btn-info"><i class="icon icon-play"></i> <span>Audio</span></button>
                        </div>
                    </div>
                </div>
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

        formatWebsiteUrl(){
            return this.profiledata.website ? this.profiledata.website : `infometriq.com/${this.profiledata.username}`;
        },

        information: function() {
            
            return {
                "Born": this.formatDate(this.profiledata.birthday),
                "State": this.profiledata.state,
                "Country": this.profiledata.country,
                "Phone": this.profiledata.phone,
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
/*
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

@media screen and (max-width: 1000px) {
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




 .btn-file input[type=file] {
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
} 
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
}*/
</style>


