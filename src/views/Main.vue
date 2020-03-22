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
                                    <div class="search-container__input">
                                        <!-- <input   type="search" class="input-custom input-custom--lg input-custom--search-elevated" placeholder="Search here ..."> -->
                                        <!-- <vue-bootstrap-typeahead > -->
                                            <vue-bootstrap-typeahead
                                                class="ht "
                                                v-model="query"
                                                :data="users"
                                                :serializer="item => item.display"
                                                @hit="selectedUser($event)"
                                                placeholder="Search here ..."
                                            />
                                    </div>
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
        }
    },
  
}
</script>

<style >
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
</style>