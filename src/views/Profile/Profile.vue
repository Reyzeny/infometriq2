<template>
    <section>
        <Header/>
        <div v-if="usernameExists=='loading'" class="text-center loading">
            <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else-if="usernameExists=='exists'">
            <IndividualProfile v-if="profileType==`individual`" :dataObject="dataObject"/>
            <PropertyProfile v-else-if="profileType==`property`" :dataObject="dataObject"/>
            <ProfileUnavailable v-else/>
        </div>
        <div v-else-if="usernameExists=='no'">
            <ProfileUnavailable/>
        </div>
    </section>
</template>
<script>
import Header from '../../components/Header'
import IndividualProfile from './IndividualProfile'
import PropertyProfile from './PropertyProfile'
import ProfileUnavailable from './ProfileUnavailable'
import axios from './../../network'
import {mapState, mapActions} from 'vuex'

export default {
    components:{
        Header,
        IndividualProfile,
        PropertyProfile,
        ProfileUnavailable
    },
    computed: {
        ...mapState("user", ["refreshUserData"]),
        
    },
    data(){
        return{
            dataObject: '',
            usernameExists: '',
            profileType: '',
        }
    },
    mounted() {
        this.usernameExists = 'loading';
        this.loadUserProfile();
    },
    watch: {
        refreshUserData() {
            if (this.refreshUserData){
                this.loadUserProfile();
                this.changeRefreshState(false);
            }
        }
    },
    methods: {
        ...mapActions("user", ["changeRefreshState"]),
        loadUserProfile() {
            let username = this.$route.params.username;
            axios.post(`/get-user-profile?username=${username}`)
                .then(response => {
                    this.dataObject = response.data.data;
                    this.profileType = this.dataObject.type.toLowerCase();
                    console.log(this.dataObject);
                    this.usernameExists = 'exists';
                }).catch(error => {
                    this.usernameExists = 'no';
                })
        }
    }
}
</script>

<style scoped>
.loading {
    margin: 5%;
}
</style>





