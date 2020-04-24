<template>
    <div class="edit-about-layout">
        <h1>{{profileObject.heading}}</h1>
        <editor api-key="4tu7qtzsooh81aj24yusfadjzdu5lutuuncwqnyemjrd3sam" initial-value="" v-model="profile_content"></editor>
        <div class="button-layout">
            <button v-if="!save_active" @click="onSaveInformationContent(profileObject)" class="save">Save</button>
            <button v-else class="save" disabled>
                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
            </button>
            <button @click="closeEditInformationModal(profileObject)">Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from './../../network'
import { mapGetters, mapActions } from 'vuex';
import Editor from '@tinymce/tinymce-vue';
export default {
    props: ['profileObject'],
    components:{
        "editor": Editor,
    },
    data() {
        return{
            profile_content: this.profileObject.content,
            save_active: false,
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        closeEditInformationModal(profileObject) {
            this.$modal.hide(`edit-${profileObject.heading}-information-modal`);
        },
        onSaveInformationContent(profileObject) {
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
                this.closeEditInformationModal(profileObject);
            }).catch(error=>{
                console.log("on save profile error is ", error);
                console.log("on save profile error response is ", error.response);
                this.save_active = false;
            })
        }
    }
}
</script>

