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
            <button v-if="!save_active" @click="onSaveEducation" class="save">Save</button>
            <button v-else class="save" disabled>
                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
            </button>
            <button @click="closeEducationModal">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

