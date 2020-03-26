<template>
    <section class="container">
        <div class="row">
            <div class="col-md-10 ">
                <div class="menu">
                    <span>[ <a href="#"><img src="../../assets/images/briefcase.png"/> Jobs</a> ]</span>
                    <span>[ <a href="#"><img src="../../assets/images/mail.png"/> Contact</a> ]</span>
                    <span>[ <a href="#"><img src="../../assets/images/gallery.png"/> Gallery</a> ]</span>
                </div>
                <div>
                <input type="text" class="profile-url" :value="url" readonly/>
                </div>
                <div class="audio-section">
                    <p>Listen to this article</p>
                    <audio/>
                    <p class="audio-description">This audio file was created from a revision of the 'Sowemimo Abiodun Alex' article and does not reflect
                        subsequent edits to the article.
                    </p>
                    <p class="source">From infometriQ data survey & internal evaluation</p>
                </div>
                <div style="display:flex;">
                    <rating class="rating" number=4 description="Excellent"/>
                    <rating class="rating" number=3 description="Good"/>
                    <rating class="rating" number=2 description="Average"/>
                    <rating class="rating" number=1 description="Poor"/>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </section>
</template>
<script>
import rating from '../../components/Rating.vue';
export default {
    name: "ProfileSubHeader",
    components: {
        rating,
    },
    props: ['profiledata'],
    computed: {
        url() {
            let username = this.profiledata.username ? this.profiledata.username : '';
            return `www.infometriq.com/${username}`;
        }
    },
    data() {
        return{
            
        }
    }
}
</script>

<style scoped>
.menu span {
    margin-right: 1%;
    font-size: 1.4rem;
}
.menu img {
    height: 1.4rem;
    width: 1.4rem;
}

.profile-url {
    margin-top: 1%;
    padding: 1%;
    border: 2px solid #84A2FA;
    border-radius: 1rem;
    width: 50%;
    display: block;
}

.audio-description {
    width: 40%;
    font-weight: 400 !important; 
}
.audio-section {
    margin-top: 1%;
    font-size: 1.4rem;
}
.audio-section p{
    font-weight: 600;
}
.source {
    font-weight: 400 !important;
    font-style: italic;

}
div .rating {
    margin: 1%;
    cursor: pointer;
}
@media screen and (max-width: 768px) {

    .profile-url {
        margin-top: 5%;
        margin-bottom: 5%;
        width: 100%;
    }
    .audio-description {
        width: 100%;
    }
}

</style>


