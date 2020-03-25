<template>
    <section class="container">
        <div class="row">
            <div class="col-md-11">
                <div class="card">
                    <div class="edit-icon-container"><img v-if="isMyProfile" class="edit-icon" src="../../assets/images/edit_icon.png"/></div>
                    <p class="about">{{profiledata.about}}</p>
                    <p id="about-complete-content" class="about collapse">Hello i'm here</p>
                    <br>
                    <br>
                    <p class="more" data-toggle="collapse" data-target="#about-complete-content">Read more <img src="../../assets/images/double_arrow.png"/></p>
                </div>
                <div class="card">
                    <div v-for="profileObject in profiledata.profile_headings" :key="profileObject" class="profile">
                        <div class="profile-title"><h3>{{profileObject.heading}}</h3><img v-if="isMyProfile" class="edit-icon" src="../../assets/images/edit_icon.png"/></div>
                        <div class="profile-content">{{profileObject.content}}</div>
                    </div>
                </div>
                <div class="card">
                    <div class="review-title"><h3>Reviews</h3></div>
                    <div class="profile-review" v-for="reviewInfo in reviews" :key="reviewInfo">
                        <p><span class="reviewer-name">{{reviewInfo.name}}</span><span class="circle-dot"></span><span class="review-date">{{reviewInfo.date}}</span></p>
                        <p class="review-detail">Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm Abiodun is a greate national diplomat with greate enthusiasm</p>
                        <p><img class="rating-star" v-for="n in rating_number" :key="n" src="../../assets/images/star-blue.png"/><img class="rating-star" v-for="n in (5-rating_number)" :key="n" src="../../assets/images/star-blue.png"/></p>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </section>
</template>
<script>
export default {
    name: "ProfileBody",
    props: ['profiledata'],
    computed: {
        isMyProfile: function() {
            let userData = localStorage.getItem("user");
            return userData && userData.username==this.profiledata.username;
        }
    },
    data() {
        return {
            reviews: [
                {
                    name: "John Adelagba",
                    date: "25th Jan 2018",
                    review: "This a review",
                    rating: 5
                }
            ],
            rating_number: 2,
        }
    }
}
</script>

<style scoped>
.card {
    padding: 1% 1% 2% 3%;
}
.card .profile {
    margin-top: 4%;
}
.edit-icon-container {
    display: flex;
    flex-direction: row-reverse;
}
.edit-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}
.more {
    color: #6D8AC7;
    font-weight: 500;
}
.more img {
    width: 2rem;
    height: 2rem;
}
.profile-title {
    display: flex;
    justify-content: space-between;
}
.profile-title h3, .review-title h3 {
    font-size: 2rem;
    color: #6D8AC7;
    font-weight: 500 !important;
}
.profile-title h3::after, .review-title h3::after {
    content:"";
    display: block;
    width: 50%;
    border-bottom-color: darkgrey;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    padding-top: 3%;
}
.profile .profile-content {
    margin-top: 0.5%;
    font-size: 1.4rem;
}
.review-title {
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
}
.circle-dot {
    height: 0.7rem;
    width: 0.7rem;
    background-color: #bbb;
    border-radius: 100%;
    display: inline-block;
    vertical-align: baseline;
    margin: 0 1%;
}
.profile-review {
    margin-top: 2%;
}
.reviewer-name {
    font-weight: 600;
    font-size: 1.8rem;
    color: black;
}
.review-date {
    font-weight: 500;
    color: darkgray;
}
.review-detail {
    font-weight: 500;
}
.rating-star{
    width: 2rem;
    height: 2rem;
}
</style>


