<template>
    <section class="profile-section profile-section--body">
        <div class="container">
            <div class="wrap">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card-wrapper">
                            <div class="card">
                                <div class="card__inner">
                                    <div class="m-b-sm">
                                        <ul class="list-inline text-link">
                                            <li v-if="isMyProfile"><a @click="showEditBiodata"><i class="icon icon-edit"></i>Edit Profile</a></li>
                                            <li><a href=""><i class="icon icon-briefcase"></i> Jobs</a></li>
                                            <li><a href=""><i class="icon icon-mail"></i> Contact</a></li>
                                            <li><a href=""><i class="icon icon-image"></i> Gallery</a></li>
                                        </ul>
                                        <modal name="edit-biodata-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true" @before-open="onBeforeBiodataOpen">
                                            <biodata-edit :profiledata="profiledata"/>
                                        </modal>
                                    </div>
                                    <div>
                                        <div style="display:flex;">
                                            <rating class="rating" :rating_number="4" description="Excellent"/>
                                            <rating class="rating" :rating_number="3" description="Good"/>
                                            <rating class="rating" :rating_number="2" description="Average"/>
                                            <rating class="rating" :rating_number="1" description="Poor"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card__inner">
                                    <h4 class="card__title">About<img v-if="isMyProfile" @click="showEditAbout" class="edit-icon" src="@/assets/images/edit_icon.png"/></h4>
                                    <div class="card__body m-t-md">
                                        <p v-html="profiledata.about"></p>
                                    </div>
                                    <div class="m-t-sm">
                                        <button class="btn btn-xs btn-info">See more</button>
                                    </div>
                                    <modal name="edit-about-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true">
                                        <about-edit :profiledata="profiledata"/>
                                    </modal>
                                </div>
                            </div>

                            <div v-for="profileObject in profiledata.profile_headings" :key="profileObject.id" class="card">
                                <div :id="getSectionId(profileObject.heading)" class="card__inner">
                                    <h4 class="card__title">{{profileObject.heading}}<img v-if="isMyProfile" @click="showEditInformation(profileObject)" class="edit-icon" src="@/assets/images/edit_icon.png"/></h4>
                                    <div v-html="profileObject.content" class="m-t-sm">
                                    </div>
                                </div>
                                <modal :name="`edit-${profileObject.heading}-information-modal`" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true">
                                    <information-edit :profileObject="profileObject" />
                                </modal>
                            </div>
                            <div class="card">
                                <div class="card__inner">
                                    <h4 class="card__title">Education<img v-if="isMyProfile" @click="showEditEducation(false)" class="edit-icon" src="@/assets/images/add.png"/></h4>
                                    <div v-for="educationObject in profiledata.educational_history" :key="educationObject.id" class="m-t-sm">
                                        <div class="info-item">
                                            <div class="info-item__title">{{educationObject.name}} <span class="date">• {{formatShortDate(educationObject.from)}} - {{formatShortDate(educationObject.to)==null ? "Date" : formatShortDate(educationObject.to)}}</span></div>
                                            <p>{{educationObject.certificate}}<span v-if="educationObject.grade">({{educationObject.grade}})</span></p>
                                            <div class="education-actions" v-if="isMyProfile"><a class="edit-education" @click="showEditEducation(true, educationObject)">Edit</a> <a class="delete-education" @click="deleteEducationDetail(educationObject)">Delete</a></div>
                                        </div>
                                    </div>
                                    <modal name="edit-education-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true">
                                        <education-edit :education_write_mode="education_write_mode" :educationObject="parsedEducationObject"/>
                                    </modal>
                                </div>
                            </div>

                            
                            <div class="card">
                                <div class="card__inner">
                                    <h4 class="card__title">CV</h4>
                                    <div class="m-t-md">
                                        <a href="" class="btn btn-info"><i class="icon icon-bookmark"></i> View Sowemimo Abiodun's CV</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card-wrapper">
                            <div class="card">
                                <div class="card__inner">
                                    <h4 class="card__title">Reviews</h4>
                                    <div class="reviews m-t-sm">
                                        <div class="review">
                                            <div class="review__user">John Adelagba <span class="date">• 25th Jan 2018</span></div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam delectus recusandae quisquam, eum exercitationem dignissimos unde. Officia, autem. Sint, eaque?</p>
                                            <div>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                            </div>
                                        </div>
                                        <div class="review">
                                            <div class="review__user">John Adelagba <span class="date">• 25th Jan 2018</span></div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam delectus recusandae quisquam, eum exercitationem dignissimos unde. Officia, autem. Sint, eaque?</p>
                                            <div>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                            </div>
                                        </div>
                                        <div class="review">
                                            <div class="review__user">John Adelagba <span class="date">• 25th Jan 2018</span></div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam delectus recusandae quisquam, eum exercitationem dignissimos unde. Officia, autem. Sint, eaque?</p>
                                            <div>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                            </div>
                                        </div>
                                        <div class="review">
                                            <div class="review__user">John Adelagba <span class="date">• 25th Jan 2018</span></div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam delectus recusandae quisquam, eum exercitationem dignissimos unde. Officia, autem. Sint, eaque?</p>
                                            <div>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                            </div>
                                        </div>
                                        <div class="review">
                                            <div class="review__user">John Adelagba <span class="date">• 25th Jan 2018</span></div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam delectus recusandae quisquam, eum exercitationem dignissimos unde. Officia, autem. Sint, eaque?</p>
                                            <div>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                                <i class="icon icon-star-full1"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import rating from '../../components/Rating.vue';
import EditBiodata from './EditBiodata';
import EditAbout from './EditAbout';
import EditInformation from './EditInformation';
import EditEducation from './EditEducation';
import axios from './../../network'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "ProfileBody",
    props: ['profiledata'],
    components: {
        rating,
        "biodata-edit": EditBiodata,
        "about-edit": EditAbout,
        "information-edit": EditInformation,
        "education-edit": EditEducation,
    },
    computed: {
        ...mapGetters("user", ["isLoggedIn"]),
        isMyProfile: function() {
            let userData = JSON.parse(localStorage.getItem("user_data"));
            return userData && (userData.username==this.profiledata.username);
        },
    },
    data() {
        return {
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            education_write_mode: '',
            parsedEducationObject: '',
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        getSectionId(heading) {
            if (heading=="personal life" || heading=="company life") return "life";
            heading = heading.toLowerCase();
            heading = heading.trim();
            heading = heading.replace(' ', '_')
            return heading
        },
        onBeforeBiodataOpen() {
            // this.profile_page = 1;
        },
        showEditBiodata() {
            this.$modal.show('edit-biodata-modal');
        },
        showEditAbout() {
            this.$modal.show('edit-about-modal');
        },
        showEditInformation(profileObject) {
            this.$modal.show(`edit-${profileObject.heading}-information-modal`);
        },
        showEditEducation(edit_mode, educationObject) {
            console.log(educationObject)
            this.education_write_mode = edit_mode ? 'edit' : 'new';
            this.parsedEducationObject = educationObject;
            this.$modal.show("edit-education-modal");
        },
        deleteEducationDetail(educationObject) {
            this.profiledata.educational_history = this.profiledata.educational_history.filter(currentEducationIteration => currentEducationIteration.id != educationObject.id)
            axios.delete(`/delete-educational-history/${educationObject.id}`)
                .then(response=>{
                    console.log("response after deleting is ", response)
                }).catch(error=>{
                    console.log("error in deleting is ", error)
                    console.log("error response in deleting is ", error.response)
                })
        },



        
        
        
        onSaveAbout() {
            if (!this.about_content) return;
            this.save_active=true;
            axios.post('/update-user',{
                about: this.about_content
            }).then(response=> {
                console.log("update user response is ", response);
                console.log("refresh user data before is  ", this.refreshUserData)
                this.save_active=false;
                this.changeRefreshState(true);
                console.log("refresh user data is now ", this.refreshUserData)
                this.closeAboutModal();
            }).catch(error => {
                this.save_active=false;
                console.log("update user error is ", error);
                console.log("update user error response is ", error.response);
            })
        },
        formatShortDate(date_string) {
            console.log("date string in profile body is ", date_string)
            if (!date_string) return;
            let date_split = date_string.split('-');
            let year = date_split[0];
            let month_in_number = Number(date_split[1]) - 1;
            console.log("date split 1 is ", date_split[1], " and month is ", this.months[Number(date_split[1])])
            return `${this.months[month_in_number]} ${year}`
        },
        onSaveProfileSectionData(profileObject, headerContent) {
            this.save_active=true;
            axios.post('/update-profile-heading',{
                header_id: profileObject.id,
                content: headerContent
            }).then(response=>{
                console.log(`update profile ${profileObject.heading} response is `, response);
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
        
        
        onSaveProfileContent(profileObject) {
            console.log("profile object ", profileObject)
            console.log("content to update is ", this.profile_content, " and header id is ", profileObject.id)
            if (!this.profile_content) return;
            this.save_active = true;
            axios.post('/update-profile-heading',{
                header_id: profileObject.id,
                content: this.profile_content
            }).then(response=>{
                console.log("on save profile content is ", response);
                this.changeRefreshState(true)
                this.save_active = false;
                this.closeEditProfileModal(profileObject);
            }).catch(error=>{
                console.log("on save profile error is ", error);
                console.log("on save profile error response is ", error.response);
            })
        }
    }
}
</script>

<style scoped>
div .rating {
    margin: 1%;
    cursor: pointer;
}
.edit-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    float: right;
}
.education-actions {
    margin-top: 1.5%;
}
.education-actions .edit-education {
    cursor: pointer;
    color: #6D8AC7 !important;
    font-size: 1.3rem;
    font-weight: 600;
    margin-right: 8%;
    border: 1px solid #6D8AC7;
    border-radius: 0.3rem;
    padding: 0.2rem;
}

.education-actions .delete-education {
    cursor: pointer;
    color: red !important;
    font-size: 1.3rem;
    font-weight: 600;
    border: 1px solid red;
    border-radius: 0.3rem;
    padding: 0.2rem;
}
.form-check .form-check-label  {
    font-weight: 600;
    margin-left: 1%;
    font-size: 1.3rem;
    color: #6D8AC7;
}

/*

.profile-body-section {
    margin-left: 0;
    margin-right: 0;
}
.card {
    padding: 1% 1% 2% 3%;
}
.card .profile {
    margin-top: 4%;
}
.edit-icon-container {
    display: flex;
    flex-direction: row-reverse;
}
.edit-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}
.more {
    color: #6D8AC7;
    font-weight: 500;
}
.more img {
    width: 2rem;
    height: 2rem;
}
.profile-title {
    display: flex;
    justify-content: space-between;
}
.profile-title h3, .review-title h3 {
    margin-top: 2%;
    font-size: 1.8rem;
    color: #6D8AC7;
    font-weight: 500 !important;
}
.profile-title h3::after, .review-title h3::after {
    content:"";
    display: block;
    width: 50%;
    border-bottom-color: darkgrey;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    padding-top: 3%;
}
.profile .profile-content {
    margin-top: 0.5%;
    font-size: 1.4rem;
}
.education{
    margin-top: 3%;
}
.education .school {
    font-weight: 700;
    font-size: 1.7rem;
    color: black;
}
.education .degree{
    font-size: 1.5rem;
    color: black;
}

.education .time{
    font-size: 1.4rem;
}
.edit-education-layout {
    margin: 3%;
}
.edit-education-layout .form-control {
    background-image: none !important;
    font-size: 1.6rem !important;
}
.edit-education-layout .form-group {
    margin-top: 2%;
}
.edit-education-layout h1 {
    font-size: 2rem !important;
    padding-bottom: 3%;
}
.edit-education-layout .button-layout {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5%;
}
.edit-education-layout .button-layout .save{
    background-color: #84A2FA !important;
    color: white !important;
    margin-left: 3% !important;
}
.education-additonal-comment {
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08) !important;
    border-radius: 4px !important;
    border-color: #E3E6E6 !important;
    padding-left: 2rem !important;
    padding-top: 2rem !important;
    font-size: 1.6rem !important;
    font-weight: 600 !important;
    color: #000 !important;
    width: 100%;
}
.education-actions {
    margin-top: 1.5%;
}
.education .edit-education {
    cursor: pointer;
    color: #6D8AC7 !important;
    font-size: 1.3rem;
    font-weight: 600;
    margin-right: 8%;
    border: 1px solid #6D8AC7;
    border-radius: 0.3rem;
    padding: 0.2rem;
}

.education .delete-education {
    cursor: pointer;
    color: red !important;
    font-size: 1.3rem;
    font-weight: 600;
    border: 1px solid red;
    border-radius: 0.3rem;
    padding: 0.2rem;
}
.form-check .form-check-label  {
    font-weight: 600;
    margin-left: 1%;
    font-size: 1.3rem;
    color: #6D8AC7;
}
.review-title {
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
}
.circle-dot {
    height: 0.7rem;
    width: 0.7rem;
    background-color: #bbb;
    border-radius: 100%;
    display: inline-block;
    vertical-align: baseline;
    margin: 0 1%;
}
.profile-review {
    margin-top: 2%;
}
.reviewer-name {
    font-weight: 600;
    font-size: 1.8rem;
    color: black;
}
.review-date {
    font-weight: 500;
    color: darkgray;
}
.review-detail {
    font-weight: 500;
}
.rating-star{
    width: 2rem;
    height: 2rem;
}
.about {
    max-lines: 2;
}
.edit-about-layout {
    margin: 3%;
}
.edit-about-layout h1 {
    font-size: 2rem !important;
    padding-bottom: 3%;
}
.edit-about-layout .button-layout {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5%;
}
.edit-about-layout .button-layout .save{
    background-color: #84A2FA !important;
    color: white !important;
    margin-left: 3% !important;
}
.error {
    color: red;
    font-size: 1.5rem;
}
@media screen and (max-width: 1000px) {
    .profile-body-section {
        margin-left: 5%;
        margin-right: 5%;
    }
    
}
*/
</style>


