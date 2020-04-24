<template>
  <div class="head">
    <header class="main-header visible-lg">
            <div class="main-header__wrap">
                <div class="main-header__left">
                    <router-link class="main-header__logo" to="/">
                        <img src="@/assets/images/logo.png" alt="InfoMetriQ">
                    </router-link>
                </div>
                <div class="main-header__right">
                    <nav v-if="isLoggedIn" class="nav nav--header">
                        <ul class="nav__menu">
                            <!-- <li class="nav__item nav__button"><router-link to="/login"><i class="icon icon-user nav__icon"></i>Log in</router-link></li> -->
                            <li class="nav__item nav__item--has-dropdown">
                                    <a href="">Account
                                        <ul class="nav__dropdown">
                                            <li class="nav__dropdown__item"><router-link :to="`/${getUsername}`">My Profile</router-link></li>
                                            <li @click="logout" class="nav__dropdown__item"><a> Logout</a></li>
                                        </ul>
                                    </a>
                                </li>
                        </ul>
                    </nav>
                    <nav v-else class="nav nav--header">
                        <ul class="nav__menu">
                            <li class="nav__item nav__button"><router-link to="/login"><i class="icon icon-user nav__icon"></i>Log in</router-link></li>
                            <li class="nav__item nav__button nav__button--brand"><router-link to="/signup" class=""><span>Get started</span></router-link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <header class="header-mobile hidden-lg">
            <div class="container">
                <div class="wrap">
                    <div class="row">
                        <div class="header-mobile__col col-xs-6">
                            <h1 class="m-t-0 m-b-0">
                                <router-link class="header-mobile__logo" to="/">
                                    <img src="@/assets/images/logo.png" alt="InfoMetriQ">
                                </router-link>
                            </h1>
                        </div>
                        <div class="header-mobile__col col-xs-6 text-right">
                            <ul class="nav__menu">
                                <li v-if="!isLoggedIn" class="nav__item">
                                    <router-link role="button" class="header-mobile__menu-button text-bold" to="/login">Login</router-link>
                                </li>
                                <li class="nav__item">
                                    <a role="button" class="header-mobile__menu-button menu-btn" @click.stop="toggleSideBar"><i class="icon icon-menu"></i></a>
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