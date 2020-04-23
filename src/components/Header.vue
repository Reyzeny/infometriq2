<template>
  <div class="head">
      <header class="main-header visible-lg " >
        <nav class="navbar navbar-expand-lg navbar-light bg-light transperent" v-bind:class="{ 'altbg': headType == 'true' }">
            <div class="container-fluid main-header__wrap">
                <router-link class="main-header__logo" to="/">
                    <img src="../assets/site-main/assets/images/logo.png" alt="InfoMetriQ"
                ></router-link >
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                        <nav class="nav nav--header">
                            <ul class="nav__menu">
                                <li class="nav__item nav__item--has-dropdown">
                                    <a href="">Company
                                        <ul class="nav__dropdown">
                                            <li class="nav__dropdown__item"><a href="">About</a></li>
                                            <li class="nav__dropdown__item"><a href="">Team</a></li>
                                            <li class="nav__dropdown__item"><a href="">Services</a></li>
                                        </ul>
                                    </a>
                                </li>
                                <li v-if="isLoggedIn" class="nav__item nav__item--has-dropdown">
                                    <a href="">Account
                                        <ul class="nav__dropdown">
                                            <li class="nav__dropdown__item"><router-link :to="`/${getUsername}`">My Profile</router-link></li>
                                        </ul>
                                    </a>
                                </li>
                                <li v-if="!isLoggedIn" class="nav__item nav__button"><router-link class="login" to="/login"><i class="icon icon-user nav__icon"></i>Log In</router-link></li>
                                <li v-if="!isLoggedIn" class="nav__item nav__button nav__button--brand"><router-link class="signup" to="/signup"><span>Get started</span></router-link></li>
                                <li v-if="isLoggedIn" class="nav__item nav__button nav__button--brand"><a class="logout" @click="logout"><span>Logout</span></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <header class="header-mobile hidden-lg"  v-bind:class="{ 'altbg': headType == 'true' }">
        <div class="container">
            <div class="wrap">
                <div class="row">
                    <div class="header-mobile__col col-xs-6">
                        <h1 class="m-t-0 m-b-0">
                            <router-link class="header-mobile__logo" to="/">
                                <img src="../assets/site-main/assets/images/logo.png" alt="InfoMetriQ">
                            </router-link>
                        </h1>
                    </div>
                    <div class="header-mobile__col col-xs-6 text-right">
                        <ul class="nav__menu">
                            <li class="nav__item">
                                <router-link v-if="!isLoggedIn" role="button" to="/login" class="header-mobile__menu-button text-bold">Login</router-link>
                            </li>
                            <li class="nav__item">
                                <a role="button" class="header-mobile__menu-button menu-btn"  @click.stop="toggleSideBar">
                                    <font-awesome-icon :icon="['fas', 'bars']" />
                                </a>
                                 <!-- <vs-button @click="active=!active">Open Sidebar</vs-button> -->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <vs-sidebar  v-model="active">
      <ul class="nav__menu nav__menu--vertical">
        <li class="nav__item nav__item--header"><span>Menu</span></li>
        
        <li v-if="!isLoggedIn" class="nav__item nav__button"><router-link to="/login"> Log in</router-link></li>
        <li v-if="!isLoggedIn" class="nav__item nav__button nav__button--brand"><router-link to="/signup" class=""><span>Get started</span></router-link></li>
        <li v-if="isLoggedIn" class="nav__item nav__button"><router-link :to="`/${getUsername}`"><i class="icon icon-info nav__icon"></i>My Profile</router-link></li>
        <li v-if="isLoggedIn" class="nav__item nav__button nav__button--brand"><a @click="logout" class=""><span>Logout</span></a></li>
        <div class="divider"></div>
        <li class="nav__item nav__button"><a href=""><i class="icon icon-info nav__icon"></i>About</a></li>
        <li class="nav__item nav__button"><a href=""><i class="icon icon-award nav__icon"></i>Privacy policy</a></li>
        <li class="nav__item nav__button"><a href=""><i class="icon icon-hand-stop nav__icon"></i>Terms &  agreement</a></li>
      </ul>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
    name: "Header",
    props : ['headType'],
    computed: {
        isLoggedIn: function () {
            let userData = JSON.parse(localStorage.getItem("user_data"));
            return userData && userData.auth_token && userData.username;
        },
        getUsername: function() {
            let userData = JSON.parse(localStorage.getItem("user_data"));
            return userData.username;
        }
    },
    data() {
        return {
            active:false,
        }
    },
    watch:{
        active: function(){
            console.log("status of active is ", this.active)
        }
    },
    methods: {
        logout() {
            console.log("logout clicked");
            localStorage.clear();
            this.$router.push('/');
        },
        showPage() {
            toggleSideBar();
        },
        toggleSideBar() {
            // console.log("in close side bar");
            // console.log("active is ", this.active)
            this.active = !this.active;
            // console.log("active after click is ", this.active)
        }
    }
}
</script>



<style>
.altbg{
    background-color: #f5f5f5 !important;
}
.login {
    text-decoration: none !important;
}
.signup {
    text-decoration: none !important;
}
</style>