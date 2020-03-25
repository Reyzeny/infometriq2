<template>
    <section class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <p class="no-profile">Sorry, This profile is not available</p>
                <button @click="goBack">Go Back</button>
                <router-link class="go-home" to="/">Go Home</router-link>
            </div>
            <div class="col-md-3"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ProfileUnavailable",
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.no-profile {
    font-size: 2rem;
    font-weight: 800;
    margin-top: 5%;
}
.no-profile .go-home {
    margin-left: 10% !important;
}
</style>


