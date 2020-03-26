<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="card profile-img">
                        <img src="../../assets/site-main/assets/images/user-1.jpg" class="card-img-top" alt="image_profile">
                        <div class="card-body">
                            <p class="profile-text">
                                Quote:<br>    
                                "There's nothing"                            
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card profile-content">
                        <h1 class="fullname">{{profiledata.firstname}} {{profiledata.lastname}}</h1>
                        <p class="occupation">{{profiledata.occupation}}</p>
                        <div v-for="(info, name) in information" :key="info" class="row">
                            <div class="col-xs-5 data">
                                {{name}}:
                            </div>
                            <div class="col-xs-7">
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
                        <a class="contents" href="#"><span><img src="../../assets/images/user.png"/></span><span class="contents-title">{{life}}</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/business.png"/></span><span class="contents-title">Business</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/political.png"/></span><span class="contents-title">Political</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/recognition.png"/></span><span class="contents-title">Recognition</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/references.png"/></span><span class="contents-title">References</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/history.png"/></span><span class="contents-title">History</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/viewcv.png"/></span><span class="contents-title">View CV</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/signature.png"/></span><span class="contents-title">Signature</span></a>
                        <a class="contents" href="#"><span><img src="../../assets/images/user.png"/></span><span class="contents-title">Reviews</span></a>
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

export default {
    name: "ProfileHeader",
    props: ['profiledata'],
    computed: {
        life: function() {
            return this.profiledata.type=='individual' ? 'Personal Life' : 'Company Profile';
        },

        information: function() {
            return {
                "Born": this.profiledata.birthday,
                "State": this.profiledata.state,
                "Country": this.profiledata.country,
                "Phone": this.profiledata.phone,
                "Website": this.profiledata.website,
                "Email": this.profiledata.email,
                "Social":"****"
            }
        }
    },
    data () {
        return {
            
        }
    },
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
}
.profile-img {
    background-color: #F6F6F6;
    border-color: #E1E1E1;
    /* margin-left: 10%; */
    /* margin-right: 5%; */
}
.profile-text {
    font-size: 1.3rem;
}
.card img {
    width: auto;
    height: 70%;
    margin: 1%;
    border-color: #F6F6F6;
    border-radius: 0;
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
</style>


