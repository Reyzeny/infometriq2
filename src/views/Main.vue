<template>
<div class="page page--alt">  
    <Header/>  
    <div class="bg-white">
        <section class="landing-section landing-section--search">
            <div class="container">
                <div class="wrap">
                    <div class="row">
                        <div class="col-lg-8 col-center">
                            <div class="search-container">
                                <div class="search-container__logo">
                                    <h1 class="text-brand">InfoMetriQ</h1>
                                </div>
                                <div class="search-container__search">
                                    
                                    <vue-bootstrap-typeahead
                                        ref="searchbar"
                                        class="ht "
                                        v-model="query"
                                        :data="users"
                                        :serializer="item => item.display"
                                        @hit="selectedUser($event)"
                                        placeholder="Search here ..."
                                    />

                                </div>
                                <div class="search-container__meta">
                                    <ul class="search-meta-ul list-inline">
                                        <li class="search-meta-ul__item search-meta-ul__item--desc">
                                            <span class="meta-label"><span class="search-container__meta__icon"><img src="assets/images/icon-success.png" alt=""></span> Database of verified</span>
                                        </li>
                                        <li class="search-meta-ul__item"><a href="">Companies</a></li>
                                        <li class="search-meta-ul__item"><a href="">Individuals</a></li>
                                        <!-- <li class="search-meta-ul__item"><a href="">Internet Identity Numbers</a></li> -->
                                        <li class="search-meta-ul__item"><a href="">Properties</a></li>
                                        <li class="search-meta-ul__item"><a href="">Jobs</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <section class="landing-section landing-section--about">
        <div class="container">
            <div class="wrap">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="landing-section--about__item">
                            <div class="flex">
                                <div class="landing-section--about__icon">
                                        <img src="http://info.test/site-main/assets/images/icon-business.png" alt="">
                                </div>
                                <div>
                                    <h4>Verified Businesses</h4>
                                    <p>Get access to a database of over 25,000,000 businesses registered across Nigeria. Join now to get your business verified and listed.</p>
                                    <div class="buttons">
                                        <a href="" class="button button--default">Verify my business <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="landing-section--about__item">
                            <div class="flex">
                                <div class="landing-section--about__icon">
                                    <img src="http://info.test/site-main/assets/images/icon-user-check.png" alt="">
                                </div>
                                <div>
                                    <h4>Verified individuals</h4>
                                    <p>Get access to a database of over 25,000,000 businesses registered across Nigeria. Join now to get your business verified and listed.</p>
                                    <div class="buttons">
                                        <a href="" class="button button--default">Verify me <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="landing-section--about__item">
                            <div class="flex">
                                <div class="landing-section--about__icon">
                                    <img src="http://info.test/site-main/assets/images/icon-house.png" alt="">
                                </div>
                                <div>
                                    <h4>Verified properties</h4>
                                    <p>Get access to a database of over 25,000,000 businesses registered across Nigeria. Join now to get your business verified and listed.</p>
                                    <div class="buttons">
                                        <a href="" class="button button--default">List my property <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import Header from '../components/Header'
import VueTypeahead from 'vue-typeahead'
import axios from 'axios'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
const API_URL = 'http://calm-plains-58791.herokuapp.com/api/auto-complete-search?query=:query'
export default {
    extends: VueTypeahead,
    components : {
        Header
    },
    name : 'MainPage',
    mounted() {
        // this.$refs.searchbar.addEventListener('click', (event)=>{
        //     console.log("you pressed a keyup")
        // });
        console.log("serach bar is ", this.$refs.searchbar)
    },
    data() {
        return {
            active:false,
            query: '',
            users: []
        }
    },
    watch: {
        // When the query value changes, fetch new results from
        // the API - in practice this action should be debounced
        //http://calm-plains-58791.herokuapp.com/api/auto-complete-search?query=${newQuery}
        query(newQuery) {
            axios.post(`http://calm-plains-58791.herokuapp.com/api/auto-complete-search`,{
                query : newQuery
            })
            .then((res) => {
                this.users = res.data.data
            })
        }
    },

    methods: {
        selectedUser(event){
            console.log(event);
            console.log(event.display);
            this.$router.push({ path: 'search', query: { search_query: event.display } })         
        },
        dd() {
            console.log("hello there");
        }
    },
  
}
</script>

<style>
.main-header__logo img {
    height: 40px;
}
.navbar{
    /* min-height: 7rem !important; */
    background-color: #FFFFFF !important;
}
.form-control{
    background-color: #FFFFFF !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08) !important;
    border-radius: 4px !important;
    border-color: #E3E6E6 !important;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23000000' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>") !important;
    background-repeat: no-repeat !important;
    background-position: right 18px center !important;
    background-size: 16px 16px !important;
    padding-left: 2rem !important;
    font-weight: 600 !important;
    color: #000 !important;
    height: 4.8rem;
}

/* .search-container__search {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
input[type="search"] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.input-custom--search {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23000000' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px 16px;
  padding-left: 2.3em;
  border-radius: 30px;
}
.input-custom--search-elevated {
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-color: #E3E6E6;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23000000' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 16px 16px;
  padding-left: 2rem;
  font-weight: 600;
  color: #000;
}
.input-custom--search-elevated::placeholder {
  color: inherit;
  opacity: .2;
}
.input-custom--search-elevated:focus {
  border-color: #DDD;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
}
.landing-section--search {
  padding-top: 10rem;
  padding-bottom: 10rem;
} */
</style>

