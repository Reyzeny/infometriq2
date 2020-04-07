<template>
    <div class="page">
        <Header headType="true"/>
        <div class="bg-alt">
            <section class="search-section">
                <div class="container">
                    <div class="wrap">
                        <div class="row">
                            <div class="col-lg-8 col-center">
                                <div class="search-container">
                                    <div class="search-container__search">
                                        <div class="search-container__input">
                                            <input type="search" class="input-custom input-custom--lg input-custom--search-elevated" placeholder="Search here..." :value="search_query">
                                        </div>
                                    </div>
                                    <div class="search-container__meta">
                                        <ul class="list-inline search-categories pull-left">
                                            <li class="search-categories__item active"><a href="">All</a></li>
                                            <li class="search-categories__item"><a href="">Companies</a></li>
                                            <li class="search-categories__item"><a href="">Individuals</a></li>
                                            <li class="search-categories__item"><a href="">Properties</a></li>
                                            <li class="search-categories__item"><a href="">Jobs</a></li>
                                        </ul>
                                        <!-- <ul class="list-inline search-categories pull-right">
                                            <li class="search-categories__item"><a class="cursor--pointer">Settings <i class="icon icon-chevron-down"></i></a></li>
                                        </ul> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="search-results-section">
            <div class="container">
                <div class="wrap">
                    <div class="row">
                        <div class="col-lg-8 col-center">
                            <div v-if="pageStatus=='loading'" class="text-center loading">
                                <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div v-else-if="pageStatus=='noResult'" class="text-center no-result">
                                Sorry, there are no results for your search
                            </div>
                            <div v-else-if="pageStatus=='showResult'" class="search-results">
                                <div v-for="searchResult in searchResultList" :key="searchResult" class="search-result">
                                    <div class="search-result__avatar">
                                        <img v-if="searchResult.profile_image" :src="searchResult.profile_image" alt="">
                                        <img v-else src="../assets/images/user_image_placeholder.svg" alt="">
                                    </div>
                                    <div class="search-result__info">
                                        <div class="search-result__title verified"><span><router-link :to="`/${searchResult.username}`">{{searchResult.firstname}} {{searchResult.lastname}}</router-link></span></div>
                                        <div class="search-result__meta">
                                            <span>
                                                <i class="icon icon-briefcase"></i>
                                                <span class="info">{{searchResult.occupation}}</span>
                                            </span>
                                            <span class="info-sub">
                                                <i class="icon icon-globe"></i>
                                                <span class="info"><a href="" class="text-link">www.infometriq.com/{{searchResult.username}}</a></span>
                                            </span>
                                        </div>
                                        <div class="search-result__meta">
                                            <i class="icon icon-location"></i>
                                            <span class="info">{{searchResult.state}}, {{searchResult.country}}</span>
                                        </div>
                                        <div class="search-result__meta">
                                            <i class="icon icon-star-full1 text-brand"></i>
                                            <i class="icon icon-star-full1 text-brand"></i>
                                            <i class="icon icon-star-full1 text-brand"></i>
                                            <i class="icon icon-star-full1 text-brand"></i>
                                            <i class="icon icon-star-half text-brand"></i>
                                            <p class="profile-reviews-count">83 reviews</p>
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
import axios from './../network'
export default {
    name : 'Search',
    components : {
        Header
    },
    data () {
        return {
            pageStatus: 'noResult',
            search_query: '',
            searchResultList: []
        }
    },
    mounted() {
        this.search_query = this.$route.query.search_query;
        this.performSearch(this.search_query)
    },
    methods: {
        performSearch(query) {
            this.pageStatus='loading';
            axios.post(`/search-list?query=${query}`)
            .then(response => {
                let searchResponse = response.data.data;
                this.searchResultList = searchResponse.results;
                this.pageStatus='showResult';
            }).catch(error => {
                console.log("error response is ", error.response);
                this.pageStatus='noResult';
            })
        }
    }
}
</script>

<style scoped>
@import '../assets/site-main/assets/css/main.css';
@import '../assets/site-main/assets/css/icons.css';

.loading {
    margin: 5%;
}
.no-result {
    margin: 5%;
    font-size: 2rem;
    font-weight: 600;
}
.search-result {
    margin-top: 2%;
}

</style>