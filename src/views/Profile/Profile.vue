<template>
    <section>
        <Header/>
        <div v-if="usernameExists=='exists'">
            <ProfileHeader :profiledata="dataObject"/>
            <ProfileSubHeader :profiledata="dataObject"/>
            <ProfileBody :profiledata="dataObject"/>
        </div>
        <div v-if="usernameExists=='no'">
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




