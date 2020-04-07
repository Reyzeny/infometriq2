<template>
    <section class="container">
        <div class="row">
            <div class="col-md-10 sub-header-section">
                <modal name="edit-profile-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true" @before-open="onBeforeModelOpen">
                    <div class="edit-profile-layout">
                        <div class="close-layout"><button @click="closeEditProfile">&times;</button></div>
                        <h1>Edit Profile</h1>
                        <div v-if="profile_page==1" class="row">
                            <div class="col-md-6">
                                <div>
                                    <label for="firstname">First name</label>
                                    <input type="text" class="form-control" name="firstname" placeholder="Enter your first name" v-model="firstname"/>
                                    <div v-if="!firstname" class="error">{{firstname_error}}</div>
                                </div>
                                <div>
                                    <label for="lastname">Last name</label>
                                    <input type="text" class="form-control" name="lastname" placeholder="Enter your last name" v-model="lastname"/>
                                    <div v-if="!lastname" class="error">{{lastname_error}}</div>
                                </div>
                                <div>
                                    <label for="website">Website</label>
                                    <input type="text" class="form-control" name="website" placeholder="e.g http://www.johnsmith.com" v-model="website"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <label for="occupation">Occupation</label>
                                    <input type="text" class="form-control" name="occupation" placeholder="Enter your occupation" v-model="occupation"/>
                                    <div v-if="!occupation" class="error">{{occupation_error}}</div>
                                </div>
                                <div>
                                    <label for="date_of_birth">Date of birth</label>
                                    <input id="date_of_birth" name="date_of_birth" type="date" class="form-control" placeholder="Enter your date of birth" v-model="dob"/>
                                </div>
                                <div>
                                    <label for="phone">Phone number</label>
                                    <input type="mobile" name="phone" class="form-control" placeholder="Enter your phone number" v-model="phone"/>
                                    <div v-if="!phone" class="error">{{phone_error}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="profile_page==2" class="row">
                            <div class="col-md-6">
                                <div>
                                    <label for="address">Address</label>
                                    <input type="text" name="address" class="form-control" placeholder="e.g  12 JohnSmith street" v-model="address"/>
                                </div>
                                <div>
                                    <label for="city">City</label>
                                    <input type="text" name="city" class="form-control" placeholder="Enter your state or city" v-model="state"/>
                                </div>
                                
                                <div>
                                    <label>Country</label>
                                    <input type="text" name="country" class="form-control" placeholder="Enter your country name" v-model="country"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <label for="state">State</label>
                                    <input type="text" name="state" class="form-control" placeholder="Enter your state or city" v-model="state"/>
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="email" name="email" class="form-control" placeholder="Enter your email" v-model="email" disabled/>
                                </div>
                                <div>
                                    <label>Quote</label>
                                    <input type="text" name="quote" class="form-control" placeholder="Write your favorite quote" v-model="quote"/>
                                </div>
                            </div>
                        </div>
                        <div  v-else-if="profile_page==3" class="row">
                            <div class="col-md-6">
                                <div>
                                    <label>Facebook link</label>
                                    <input type="text" class="form-control" placeholder="e.g https://facebook.com/jason" v-model="facebook_url"/>
                                </div>
                                <div>
                                    <label>Twitter link</label>
                                    <input type="text" class="form-control" placeholder="e.g https://twitter.com/jason"  v-model="twitter_url"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <label>Linkedin link</label>
                                    <input type="text" class="form-control" placeholder="e.g https://linkedin.com/in/jason" v-model="linkedin_url"/>
                                </div>
                                <div>
                                    <label>Instagram link</label>
                                    <input type="text" class="form-control" placeholder="e.g https://instagram.com/jason" v-model="instagram_url"/>
                                </div>
                                <div>
                                    <label>Youtube link</label>
                                    <input type="text" class="form-control" placeholder="e.g https://youtube.com/jason" v-model="youtube_url"/>
                                </div>
                            </div>
                        </div>
                        <div class="button-layout">
                            <button v-if="profile_page==3 && !save_active" @click="onSaveProfile" class="save">Save</button>
                            <button v-if="profile_page==3 && save_active" class="save" disabled>
                                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </button>
                            
                            <button v-if="profile_page!=3" @click="moveNextEditProfile" class="next">Next</button>
                            <button v-if="profile_page>1" @click="movePreviousEditProfile" class="previous">Previous</button>
                        </div>
                    </div>
                </modal>
                <div class="menu">
                    <span v-if="isMyProfile">[ <a @click="showEditProfile"><img src="../../assets/images/edit_icon.png"/> Edit Profile</a> ]</span>
                    <span>[ <a href="#"><img src="../../assets/images/briefcase.png"/> Jobs</a> ]</span>
                    <span>[ <a href="#"><img src="../../assets/images/mail.png"/> Contact</a> ]</span>
                    <span>[ <a href="#"><img src="../../assets/images/gallery.png"/> Gallery</a> ]</span>
                </div>
                <div>
                <input type="text" class="profile-url" :value="url" readonly/>
                </div>
                <div class="audio-section">
                    <p>Listen to this article</p>
                    <audio/>
                    <p class="audio-description">This audio file was created from a revision of the '{{profiledata.firstname}}  {{profiledata.lastname}}' article and does not reflect
                        subsequent edits to the article.
                    </p>
                    <p class="source">From infometriQ data survey & internal evaluation</p>
                </div>
                <div style="display:flex;">
                    <rating class="rating" number=4 description="Excellent"/>
                    <rating class="rating" number=3 description="Good"/>
                    <rating class="rating" number=2 description="Average"/>
                    <rating class="rating" number=1 description="Poor"/>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </section>
</template>
<script>
import rating from '../../components/Rating.vue';
import axios from './../../network'
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
    name: "ProfileSubHeader",
    components: {
        rating,
    },
    props: ['profiledata'],
    computed: {
        url() {
            let username = this.profiledata.username ? this.profiledata.username : '';
            return `www.infometriq.com/${username}`;
        },
        isMyProfile() {
            let userData = JSON.parse(localStorage.getItem("user_data"));
            return userData && (this.profiledata.username==userData.username);
        },
        ...mapState("user", ["refreshUserData"]),
        ...mapGetters("user", ["isLoggedIn"]),
        
        // ...mapState ([
        //         'user'
        //     ])
    },
    data() {
        return{
            profile_page: 1,
            firstname: this.profiledata.firstname,
            lastname: this.profiledata.lastname,
            occupation: this.profiledata.occupation,
            dob: this.profiledata.birthday,
            phone: this.profiledata.phone,
            email: this.profiledata.email,
            address: this.profiledata.address,
            city: this.profiledata.city,
            state: this.profiledata.state,
            country: this.profiledata.country,
            facebook_url: this.profiledata.facebook,
            twitter_url: this.profiledata.twitter,
            linkedin_url: this.profiledata.linkedin,
            instagram_url: this.profiledata.instagram,
            youtube_url: this.profiledata.youtube,
            quote: this.quote,
            website: this.website,

            save_active: false,


            firstname_error: '',
            lastname_error: '',
            occupation_error: '',
            phone_error: '',

            
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        showEditProfile() {
            this.$modal.show('edit-profile-modal');
            console.log("refresh data is ", this.refreshUserData);
            console.log("data's ", this.isLoggedIn);
        },
        closeEditProfile() {
            this.$modal.hide('edit-profile-modal');
        },
        moveNextEditProfile() {
            this.profile_page = this.profile_page==3 ? 1 : this.profile_page+1;
        },
        movePreviousEditProfile() {
            this.profile_page = this.profile_page==1 ? 3 : this.profile_page-1;
        },
        onBeforeModelOpen() {
            this.profile_page = 1;
        },
        onDataValidated() {
            if(!this.firstname) {
                this.showFirstnameError("First name is required");
                this.profile_page=1;
                return false;
            }
            if(!this.lastname) {
                this.showLastnameError("Last name is required");
                this.profile_page=1;
                return false;
            }
            if (!this.occupation) {
                this.showOccupationError("Occupation is required");
                this.profile_page=1;
                return false;
            }
            if(!this.phone) {
                this.showPhoneError("Phone number is required");
                this.profile_page=2;
                return false;
            }
            return true;
        },
        onSaveProfile() {
            this.resetErrors();
            if (!this.onDataValidated()) return;
            this.save_active=true;
            axios.post('/update-user',{
                firstname: this.firstname,
                lastname: this.lastname,
                phone: this.phone,
                occupation:this.occupation,
                // "email":this.profiledata.email,
                username:this.profiledata.username,
                birthday: this.dob,
                address: this.address,
                city: this.city,
                state:this.state,
                country: this.country,
                facebook: this.facebook_url,
                twitter: this.twitter_url,
                instagram: this.instagram_url,
                linkedin: this.linkedin_url,
                youtube: this.youtube,
                quote: this.quote,
                website: this.website
            }).then(response=> {
                console.log("update user response is ", response);
                console.log("refresh user data before is  ", this.refreshUserData)
                this.save_active=false;
                this.changeRefreshState(true);
                console.log("refresh user data is now ", this.refreshUserData)
                this.closeEditProfile();
            }).catch(error => {
                this.save_active=false;
                console.log("update user error is ", error);
                console.log("update user error response is ", error.response);
            })
        },
        resetErrors() {

        },
        showFirstnameError(errorDetails) {
            this.firstname_error = errorDetails;
        },
        showLastnameError(errorDetails) {
            this.lastname_error = errorDetails;
        },
        showOccupationError(errorDetails) {
            this.occupation_error = errorDetails;
        },
        showPhoneError(errorDetails) {
            this.phone_error = errorDetails;
        },
    }
}
</script>

<style scoped>
.sub-header-section {
    margin-left: 0;
    margin-right: 0;
}
.menu span {
    margin-right: 1%;
    font-size: 1.4rem;
}
.menu img {
    height: 1.4rem;
    width: 1.4rem;
}
.menu a {
    cursor: pointer;
}

.profile-url {
    margin-top: 1%;
    padding: 1%;
    border: 2px solid #84A2FA;
    border-radius: 1rem;
    width: 50%;
    display: block;
}

.audio-description {
    width: 40%;
    font-weight: 400 !important; 
}
.audio-section {
    margin-top: 1%;
    font-size: 1.4rem;
}
.audio-section p{
    font-weight: 600;
}
.source {
    font-weight: 400 !important;
    font-style: italic;

}
div .rating {
    margin: 1%;
    cursor: pointer;
}
.edit-profile-layout {
    padding: 4% !important;
}
.edit-profile-layout h1 {
    font-size: 2rem !important;
    /* margin-left: 1%; */
    /* padding-bottom: 3%; */
}

.edit-profile-layout label {
    font-size: 1.4rem !important;
    margin-top: 3%;
}
.edit-profile-layout input {
    background-image: none !important;
    font-size: 1.3rem !important;
    height: 6% !important;
    padding: 2% !important;
}
.edit-profile-layout .button-layout {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5%;
}
.edit-profile-layout .button-layout .next{
    background-color: #84A2FA !important;
    color: white !important;
    margin-left: 3% !important;
}
.edit-profile-layout .button-layout .previous{
    background-color: white !important;
    color: #84A2FA !important;
    margin-right: 3% !important;
}
.edit-profile-layout .button-layout .save{
    background-color: #84A2FA !important;
    color: white !important;
    margin-left: 3% !important;
}
.close-layout {
    display: flex;
    flex-direction: row-reverse;
}
.error {
    color: red;
    font-size: 1.5rem;
}

@media screen and (max-width: 768px) {

    .profile-url {
        margin-top: 5%;
        margin-bottom: 5%;
        width: 100%;
    }
    .audio-description {
        width: 100%;
    }
    .sub-header-section {
        margin-left: 5%;
        margin-right: 5%;
    }
}

</style>


