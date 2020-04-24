<template>
    <div>
        <ProfileHeader :profiledata="dataObject"/>
        <ProfileBody :profiledata="dataObject"/>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader'
import ProfileBody from './ProfileBody'
export default {
    components: {
        ProfileHeader,
        ProfileBody
    },
    props: ['dataObject'],
}
</script>

