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
                                <li class="nav__item nav__button"><a href="login.php"><i class="icon icon-user nav__icon"></i>Log in</a></li>
                                <li class="nav__item nav__button nav__button--brand"><a href="signup.php" class=""><span>Get started</span></a></li>
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
                            <a class="header-mobile__logo" href="index.php">
                                <img src="http://info.test/site-main/assets/images/logo.png" alt="InfoMetriQ">
                            </a>
                        </h1>
                    </div>
                    <div class="header-mobile__col col-xs-6 text-right">
                        <ul class="nav__menu">
                            <li class="nav__item">
                                <a role="button" href="http://info.test/signin" class="header-mobile__menu-button text-bold">Login</a>
                            </li>
                            <li class="nav__item">
                                <a role="button" class="header-mobile__menu-button menu-btn"  @click="active=!active">
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
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">
      <ul class="nav__menu nav__menu--vertical">
        <li class="nav__item nav__item--header"><span>Menu</span></li>
        <li class="nav__item nav__button"><a href="login.php"><i class="icon icon-user nav__icon"></i>Log in</a></li>
        <li class="nav__item nav__button nav__button--brand"><a href="signup.php" class=""><span>Get started</span></a></li>
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
    data() {
        return {
            active:false,
        }
    }
}
</script>

<style>
.altbg{
    background-color: #f5f5f5 !important;
}
</style>