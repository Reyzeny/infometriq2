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
                                <div>

                                    <form @submit.prevent="onSubmitSearchResult">
                                        <!-- <vue-bootstrap-typeahead
                                            ref="searchbar"
                                            class="ht"
                                            v-model="query"
                                            :data="myusers"
                                            :serializer="item => item.display"
                                            @hit="selectedUser($event)"
                                            placeholder="Search here ..."
                                        /> -->
                                        <vue-simple-suggest
                                            ref="searchbar"
                                            id="searchbar"
                                            
                                            :filter-by-query="true"
                                            v-model="query"
                                            :destyled=true
                                            :styles="autoCompleteStyle"
                                            display-attribute="display"
                                            value-attribute="display"
                                            :list="getSuggestionList"
                                            :max-suggestions="10"
                                            placeholder="Search here..."
                                            :debounce="400"
                                            @select="onSelectSuggestion"
                                            @input="listenOb({index, $event})"
                                        >
                                        </vue-simple-suggest>
                                    </form>

                                </div>
                                <div class="search-container__meta">
                                    <ul class="search-meta-ul list-inline">
                                        <li class="search-meta-ul__item search-meta-ul__item--desc">
                                            <span class="meta-label"><span class="search-container__meta__icon"><img src="../assets/site-main/assets/images/icon-success.png" alt=""></span> Database of verified</span>
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
                                        <img src="../assets/site-main/assets/images/icon-business.png" alt="">
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
                                    <img src="../assets/site-main/assets/images/icon-user-check.png" alt="">
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
                                    <img src="../assets/site-main/assets/images/icon-house.png" alt="">
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
import VueSimpleSuggest from 'vue-simple-suggest'
import axios from 'axios'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Rx from 'rxjs/Rx';
import { from, interval } from 'rxjs';
import { debounceTime, debounce } from "rxjs/operators";
import { fromEvent } from 'rxjs/observable/fromEvent';
// import {  } from 'rxjs-compat/operator/debounce';
const API_URL = 'http://calm-plains-58791.herokuapp.com/api/auto-complete-search?query=:query'
export default {
    components : {
        Header,
        VueSimpleSuggest
    },
    name : 'MainPage',
    data() {
        return {
            active:false,
            query: '',
            users: [],
            autoCompleteStyle : {
                vueSimpleSuggest: "position-relative",
                inputWrapper: "",
                defaultInput : "form-control",
                suggestions: "position-absolute list-group z-1000 width-10%",
                suggestItem: "list-group-item width-10%"
            }
        }
    },
    mounted() {
        // console.log("search bar oline",this.$refs.searchbar)
        // const observable = fromEvent(this.$refs.searchbar, "input");;)
        let observable = fromEvent(document.getElementById("searchbar"), "input");;
        const result = observable.pipe(debounce(() => interval(2000)));
        // result.subscribe()
        result.subscribe(q=>console.log("q is ", q.target.value))
        
    },
    watch: {
        
        query(newQuery) {
            
        }
    },

    methods: {
        onSubmitSearchResult(eve) {
            let searchQuery = this.$refs.searchbar.text;
            if (searchQuery){
                this.showSearchResult(searchQuery);
            }
        },

        onSelectSuggestion(suggestion){
            console.log("on selected is ",suggestion.display);
            let searchQuery = suggestion.display;
            this.showSearchResult(searchQuery);
            // console.log(event.display);
            // this.$router.push({ path: 'search', query: { search_query: event.display } })         
        },
        showSearchResult(searchQuery) {
            if (searchQuery){
                this.$router.push({ path: 'search', query: { search_query: searchQuery } }) 
            }
        },
        async getSuggestionList(myquery) {
            if(!myquery) return;
            return fetch(`http://calm-plains-58791.herokuapp.com/api/auto-complete-search`, { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify({query: myquery}) })
                .then(response => response.json())
                .then(json =>{
                    console.log("json is ", json)
                    console.log("json data is ", json.data)
                    console.log("json data data is ", json.data.data)
                    return json.data
                });
        },

        listenOb(target) {
            console.log("target is ", this.$refs.searchbar)
            if (!target) return;
            // let observable = from(target);;
            // const result = observable.pipe(debounce(() => interval(2000)));
            // // result.subscribe()
            // result.subscribe(q=>console.log("q is ", q))
        }
        
    },
  
}
</script>

<style scoped>
/* @import '../assets/site-main/assets/css/main.css';
@import '../assets/site-main/assets/css/icons.css'; */
@import 'vue-simple-suggest/dist/styles.css';

.main-header__logo img {
    height: 40px;
}
.navbar{
    /* min-height: 7rem !important; */
    background-color: #FFFFFF !important;
}

.form-control {
    padding-right: 18px !important;
}

.mme{
    width: 100%;
}



/* #searchbar {
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
    width: 100% !important;
} */

/* .default-input {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23000000' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>") !important;
    background-repeat: no-repeat !important;
    background-position: right 18px center !important;
    padding-left: 2rem !important;
    font-weight: 600 !important;
    color: #000 !important;
    height: 4.8rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08) !important;
    border-radius: 4px !important;
    border-color: #E3E6E6 !important;
    padding-left: 2rem !important;
} */
</style>

