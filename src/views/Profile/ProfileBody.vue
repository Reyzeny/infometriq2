<template>
    <section class="container">
        <div class="row">
            <div class="col-md-10 profile-body-section">
                <div class="card">
                    <div class="edit-icon-container"><img v-if="isMyProfile" @click="showAboutModal" class="edit-icon" src="../../assets/images/edit_icon.png"/></div>
                    <p v-if="showReadMoreArrow" class="about about-short" v-html="profiledata.about"></p>
                    <p id="about-complete-content" class="about about-full collapse">{{profiledata.about}}</p>
                    <br>
                    <br>
                    <p class="more" data-toggle="collapse" data-target="#about-complete-content" @click="showReadMoreArrow=!showReadMoreArrow"><span v-if="showReadMoreArrow">Read more</span><span v-if="!showReadMoreArrow">Read less</span> <img v-if="showReadMoreArrow" src="../../assets/images/double_arrow.png"/><img v-if="!showReadMoreArrow" src="../../assets/images/double_arrow_up.png"/></p>
                    <modal name="edit-about-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true" @before-open="onBeforeAboutOpen">
                        <div class="edit-about-layout">
                            <h1>Write a short bio</h1>
                            <editor api-key="4tu7qtzsooh81aj24yusfadjzdu5lutuuncwqnyemjrd3sam" init="{plugins: 'wordcount'}" initial-value="" v-model="about_content"></editor>
                            <div class="button-layout">
                                <button v-if="!save_active" @click="onSaveAbout" class="save">Save</button>
                                <button v-else class="save" disabled>
                                    <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                                    <span class="sr-only">Loading...</span>
                                </button>
                                <button @click="closeAboutModal">Cancel</button>
                            </div>
                        </div>
                    </modal>
                </div>
                <div class="card">
                    <div class="profile-title"><h3>Education</h3><img v-if="isMyProfile" @click="showEducationModal(false)" class="edit-icon" src="../../assets/images/add.png"/></div>
                    <div v-for="educationObject in profiledata.educational_history" :key="educationObject.id" class="education">
                        <div class="school">{{educationObject.name}}</div>
                        <div class="degree">{{educationObject.certificate}}<span v-if="educationObject.grade">({{educationObject.grade}})</span></div>
                        <div v-if="educationObject.to" class="time">{{formatShortDate(educationObject.from)}} - {{formatShortDate(educationObject.to)}}</div>
                        <div v-else class="time">{{formatShortDate(educationObject.from)}} - Currently studying here</div>
                        <div class="education-actions" v-if="isMyProfile"><a class="edit-education" @click="showEducationModal(true, educationObject)">Edit</a> <a class="delete-education" @click="deleteEducationDetail(educationObject)">Delete</a></div>
                    </div>
                    <modal name="edit-education-modal" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true">
                            <div class="edit-education-layout">
                                <h1>Add Educational History</h1>
                                <form>
                                    <div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Institution" v-model="institution">
                                            <div v-if="!institution" class="error">{{institution_error}}</div>
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control" v-model="certificateOptionSelected">
                                                <option disabled value="">Select Certificate</option>
                                                <option v-for="option in certificateOptions" v-bind:value="option.value" :key="option.value">
                                                    {{ option.text }}
                                                </option>
                                            </select>
                                            <div v-if="!certificateOptionSelected" class="error">{{certificate_error}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="from_date">From</label>
                                                    <input id="from_date" name="from_date" type="date" class="form-control" v-model="from_date"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div v-if="currently_studying==false" class="form-group">
                                                    <label for="to_date">To</label>
                                                    <input id="to_date" name="to_date" type="date" class="form-control" v-model="to_date"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" v-model="currently_studying" id="currently_studying">
                                            <label class="form-check-label" for="currently_studying">
                                                I'm currently studying here
                                            </label>
                                        </div>
                                        <div v-if="!from_date || (!currently_studying && !to_date)" class="error">{{range_error}}</div>
                                        <div class="form-group">
                                            <textarea rows="8" class="education-additonal-comment" placeholder="Additional Comment" v-model="additional_comment"></textarea>
                                        </div>
                                    </div>
                                </form>
                                <div class="button-layout">
                                    <button v-if="!save_active" @click="onSaveEducation" class="save">Save</button>
                                    <button v-else class="save" disabled>
                                        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                                        <span class="sr-only">Loading...</span>
                                    </button>
                                    <button @click="closeEducationModal">Cancel</button>
                                </div>
                            </div>
                        </modal>
                </div>
                <div class="card">
                    <div v-for="profileObject in profiledata.profile_headings" :key="profileObject.id" class="profile">
                        <div :id="getSectionId(profileObject.heading)" class="profile-title"><h3>{{profileObject.heading}}</h3><img v-if="isMyProfile" @click="showEditProfileModal(profileObject)" class="edit-icon" src="../../assets/images/edit_icon.png"/></div>
                        <div class="profile-content" v-html="profileObject.content"></div>
                        <modal :name="`edit-${profileObject.heading}-modal`" :adaptive="true" :width="'80%'" :height="'auto'" :scrollable="true" @before-open="onBeforeProfileOpen(profileObject)">
                            <div class="edit-about-layout">
                                <h1>{{profileObject.heading}}</h1>
                                <editor api-key="4tu7qtzsooh81aj24yusfadjzdu5lutuuncwqnyemjrd3sam" initial-value="" v-model="profile_content"></editor>
                                <div class="button-layout">
                                    <button v-if="!save_active" @click="onSaveProfileContent(profileObject)" class="save">Save</button>
                                    <button v-else class="save" disabled>
                                        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                                        <span class="sr-only">Loading...</span>
                                    </button>
                                    <button @click="closeEditProfileModal(profileObject)">Cancel</button>
                                </div>
                            </div>
                        </modal>
                    </div>
                </div>
                <!-- <div class="card">
                    <div class="review-title"><h3>Reviews</h3></div>
                    <div class="profile-review" v-for="reviewInfo in reviews" :key="reviewInfo">
                        <p><span class="reviewer-name">{{reviewInfo.name}}</span><span class="circle-dot"></span><span class="review-date">{{reviewInfo.date}}</span></p>
                        <p class="review-detail">Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm</p>
                        <p><img class="rating-star" v-for="n in rating_number" :key="n" src="../../assets/images/star-blue.png"/><img class="rating-star" v-for="n in (5-rating_number)" :key="n" src="../../assets/images/star-blue.png"/></p>
                    </div>
                </div> -->
            </div>
            <div class="col-md-2"></div>
        </div>
    </section>
</template>
<script>
import Editor from '@tinymce/tinymce-vue';
import axios from './../../network'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "ProfileBody",
    props: ['profiledata'],
    components: {
        "editor": Editor,
    },
    watch: {
        currently_studying() {
            console.log("currently studying is ", this.currently_studying);
            this.to_date = '';
        }
    },
    computed: {
        isMyProfile: function() {
            let userData = JSON.parse(localStorage.getItem("user_data"));
            return userData && (userData.username==this.profiledata.username);
            // return true;
        },
        
        ...mapGetters("user", ["isLoggedIn"])

    },
    data() {
        return {
            reviews: [
                {
                    name: "John Adelagba",
                    date: "25th Jan 2018",
                    review: "This a review",
                    rating: 5
                }
            ],
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
            rating_number: 2,
            showReadMoreArrow: true,
            save_active: false,
            about_content: this.profiledata.about,
            profile_content: '',
            institution: '',
            from_date: '',
            to_date: '',
            additional_comment: '',
            certificateOptionSelected: '',
            certificateOptions: [
                {text: "No Degree", value: "No Degree"},
                {text: "Diploma", value: "Diploma"},
                {text: "Bachelors Degree", value: "Bachelors Degree"},
                {text: "Masters Degree", value: "Masters Degree"},
            ],
            currently_studying: false,

            
            institution_error:'',
            certificate_error: '',
            range_error:'',

            education_write_mode: '',
            educationHistoryId: 0
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
        showAboutModal() {
            this.$modal.show("edit-about-modal");
        },
        closeAboutModal() {
            this.$modal.hide("edit-about-modal");
        },
        onBeforeAboutOpen() {

        },
        onBeforeProfileOpen(profileObject) {
            this.profile_content = profileObject.content;
        },
        showEditProfileModal(profileObject) {
            this.$modal.show(`edit-${profileObject.heading}-modal`);
        },
        closeEditProfileModal(profileObject) {
            this.$modal.hide(`edit-${profileObject.heading}-modal`);
        },
        showEducationModal(edit_mode, educationObject) {
            console.log(educationObject)
            this.education_write_mode = edit_mode ? 'edit' : 'new';
            if (edit_mode) {
                this.institution = educationObject.name;
                this.certificateOptionSelected = educationObject.certificate
                this.additional_comment = educationObject.extra_info;
                this.currently_studying = educationObject.to === null
                this.from_date = educationObject.from;
                this.to_date = educationObject.to;
                this.educationHistoryId = educationObject.id;
            }else{
                this.institution = '';
                this.certificateOptionSelected = '';
                this.additional_comment = '';
                this.currently_studying = false;
                this.educationHistoryId = 0;
            }
            this.$modal.show("edit-education-modal");
        },
        closeEducationModal() {
            this.$modal.hide("edit-education-modal");
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
        onEducationDetailsValidated() {
            if (!this.institution) {
                this.showInstitutionError();
                return false;
            }
            if (!this.certificateOptionSelected) {
                this.showCertificateError();
                return false;
            }
            if (!this.from_date || (!this.currently_studying && !this.to_date)) {
                this.showRangeError();
                return false;
            }
            return true;
        },
        onSaveEducation() {
            this.resetEducationErrors();
            if (!this.onEducationDetailsValidated()) return;
            this.save_active=true;
            this.education_write_mode == 'new' ? this.onSaveNewEducationHistory() : this.onUpdateEducationHistory(this.educationHistoryId);
        },
        onSaveNewEducationHistory() {
            axios.post('/add-educational-history',{
                institution: this.institution,
                certificate: this.certificateOptionSelected,
                from: this.from_date,
                to: this.to_date,
                extra_info: this.additional_comment
            }).then(response=>{
                console.log("adding educational history response is ", response);
                this.changeRefreshState(true);
                this.save_active=false;
                this.closeEducationModal();
            }).catch(error=>{
                this.save_active=false;
                console.log("adding educational history error is ", error);
                console.log("adding educational history error response is ", error.response);
            })
        },
        onUpdateEducationHistory(educationHistoryId) {
            axios.post(`/update-educational-history/${educationHistoryId}`,{
                institution: this.institution,
                certificate: this.certificateOptionSelected,
                from: this.from_date,
                to: this.to_date,
                extra_info: this.additional_comment
            }).then(response=>{
                console.log("adding educational history response is ", response);
                this.changeRefreshState(true);
                this.save_active=false;
                this.closeEducationModal();
            }).catch(error=>{
                this.save_active=false;
                console.log("adding educational history error is ", error);
                console.log("adding educational history error response is ", error.response);
            })
        },
        resetEducationErrors() {

        },
        showInstitutionError() {
            this.institution_error = "Enter your institution name";
        },
        showCertificateError() {
            this.certificate_error = "Select a degree you pursued or currently pursuing";
        },
        showRangeError() {
            this.range_error = "Select a valid date"
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
</style>


