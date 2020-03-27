<template>
    <section>
        <Header/>
        <div v-if="usernameExists=='loading'" class="text-center loading">
            <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else-if="usernameExists=='exists'">
            <ProfileHeader :profiledata="dataObject"/>
            <ProfileSubHeader :profiledata="dataObject"/>
            <ProfileBody :profiledata="dataObject"/>
        </div>
        <div v-else-if="usernameExists=='no'">
            <ProfileUnavailable/>
        </div>
    </section>
</template>
<script>
import Header from '../../components/Header'
import ProfileHeader from './ProfileHeader'
import ProfileSubHeader from './ProfileSubHeader'
import ProfileBody from './ProfileBody'
import ProfileUnavailable from './ProfileUnavailable'
import axios from './../../network'

export default {
    components:{
        Header,
        ProfileHeader,
        ProfileSubHeader,
        ProfileBody,
        ProfileUnavailable
    },
    data(){
        return{
            dataObject: '',
            usernameExists: '',
        }
    },
    mounted() {
        let username = this.$route.params.username;
        this.usernameExists = 'loading';
        axios.post(`/get-user-profile?username=${username}`)
            .then(response => {
                this.dataObject = response.data.data;
                this.usernameExists = 'exists';
            }).catch(error => {
                this.usernameExists = 'no';
            })
    }
}
</script>

<style scoped>
.loading {
    margin: 5%;
}
</style>





