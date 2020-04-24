<template>
<div class="page page--alt">  
    <Header/>  
    <main id="container">
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
                                            <!-- <input type="search" class="input-custom input-custom--lg input-custom--search-elevated" placeholder="Search here ..."> -->
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
                                    </div>
                                    <div class="search-container__meta">
                                        <ul class="search-meta-ul list-inline">
                                            <li class="search-meta-ul__item search-meta-ul__item--desc">
                                                <span class="meta-label"><span class="search-container__meta__icon"><img src="@/assets/images/icon-success.png" alt=""></span> Database of verified</span>
                                            </li>
                                            <li class="search-meta-ul__item"><a href="">Companies</a></li>
                                            <li class="search-meta-ul__item"><a href="">Individuals</a></li>
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
                    <div class="row m-b-lg">
                        <div class="col-lg-4">
                            <div class="landing-section--about__item">
                                <div class="">
                                    <div class="landing-section--about__icon">
                                        <img src="@/assets/images/icon-business.png" alt="">
                                    </div>
                                    <div>
                                        <h4>Verified Businesses</h4>
                                        <p>Get access to a database of over 25 Million businesses across the globe. Join now to get your business verified and listed.</p>
                                        <div class="buttons">
                                            <a href="" class="btn btn-default btn-lg">Verify my Business <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="landing-section--about__item">
                                <div class="">
                                    <div class="landing-section--about__icon">
                                        <img src="@/assets/images/icon-user-check.png" alt="">
                                    </div>
                                    <div>
                                        <h4>Verified individuals</h4>
                                        <p>Get access to a database of over 25 Million individuals across the globe. Join now to get yourself verified and listed.</p>
                                        <div class="buttons">
                                            <a href="" class="btn btn-default btn-lg">Verify me <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="landing-section--about__item">
                                <div class="">
                                    <div class="landing-section--about__icon">
                                        <img src="@/assets/images/icon-property.png" alt="">
                                    </div>
                                    <div>
                                        <h4>Verified properties</h4>
                                        <p>Get access to a database of over 25,000,000 verified properties across Nigeria. Join now to get your property verified and listed.</p>
                                        <div class="buttons">
                                            <a href="" class="btn btn-lg btn-default">Search Properties <i class="icon icon-chevron-right button__icon button__icon--right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="landing-get-started">
                        <div class="left">
                            <h3>Create a profile for yourself.</h3>
                            <p class="m-t-sm text-light">Get started in just 2 minutes.</p>
                        </div>
                        <div class="right">
                            <a href="" class="btn btn-lg btn-success landing-get-started__button">Sign Up &raquo;</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <companyfooter/>
</div>
</template>

<script>
import Header from '../components/Header'
import companyfooter from '../components/Footer'
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
        companyfooter,
        VueSimpleSuggest,
        VueBootstrapTypeahead
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
                defaultInput : "input-custom input-custom--lg input-custom--search-elevated",
                suggestions: "position-absolute list-group z-1000 width-10%",
                suggestItem: "list-group-item width-10%"
            }
        }
    },
    mounted() {
        // console.log("search bar oline",this.$refs.searchbar)
        // const observable = fromEvent(this.$refs.searchbar, "input");;)
        // let observable = fromEvent(document.getElementById("searchbar"), "input");;
        // const result = observable.pipe(debounce(() => interval(2000)));
        // result.subscribe()
        // result.subscribe(q=>console.log("q is ", q.target.value))
        
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


