<template>
    <div class="edit-about-layout">
        <h1>Write a short bio</h1>
        <editor api-key="4tu7qtzsooh81aj24yusfadjzdu5lutuuncwqnyemjrd3sam" initial-value="" v-model="about_content"></editor>
        <div class="button-layout">
            <button v-if="!save_active" @click="onSaveAbout" class="btn save">Save</button>
            <button v-else class="btn save" disabled>
                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
            </button>
            <button class="btn" @click="closeAboutModal">Cancel</button>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from './../../network'
import { mapGetters, mapActions } from 'vuex';
export default {
    components:{
        "editor": Editor,
    },
    props: ['profiledata'],
    data() {
        return{
            save_active: false,
            about_content:this.profiledata != undefined ? this.profiledata.about : "",
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        closeAboutModal() {
            this.$modal.hide("edit-about-modal");
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
    }
}
</script>

<style scoped>
@import 'bootstrap';
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
.btn {
    font-size: 1.5rem;
    font-weight: 600;
}

</style>


