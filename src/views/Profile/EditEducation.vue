<template>
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
            <button v-if="!save_active" @click="onSaveEducation" class="btn save">Save</button>
            <button v-else class="btn save" disabled>
                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
            </button>
            <button class="btn" @click="closeEducationModal">Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from './../../network'
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
    props: ['education_write_mode', 'educationObject'],
    data() {
        return{
            save_active: false,
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
            educationHistoryId: 0
        }
    },
    mounted() {
        console.log("education write mode is ", this.education_write_mode)
        if (this.education_write_mode=='new') {
            this.institution = '';
            this.certificateOptionSelected = '';
            this.additional_comment = '';
            this.currently_studying = false;
            this.educationHistoryId = 0;       
        }else{
            this.institution = this.educationObject.name;
            this.certificateOptionSelected = this.educationObject.certificate
            this.additional_comment = this.educationObject.extra_info;
            this.currently_studying = this.educationObject.to === null
            this.from_date = this.educationObject.from;
            this.to_date = this.educationObject.to;
            this.educationHistoryId = this.educationObject.id;
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        closeEducationModal() {
            this.$modal.hide("edit-education-modal");
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
    }
}
</script>

<style scoped>
@import 'bootstrap';
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
.error {
    color: red;
    font-size: 1.5rem;
}
.btn {
    font-size: 1.5rem;
    font-weight: 600;
}
</style>


