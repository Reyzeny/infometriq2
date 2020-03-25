<template>
    <section class="section">
        <div class="rating-body">
            <p class="text-center rating-number">{{number}}</p>
            <p class="text-center rating-description">{{description}}</p>
        </div>
    </section>
</template>
<script>
export default {
    name: "rating",
    props:{
        number: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true,
            default: "no rating"
        }
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.rating-body {
    background-color: #F2F1F1;
    height: auto;
    width: 6rem;
    border-radius: 0.2rem;
}
.rating-number{
    color: red;
    position: relative;
    /* padding-top: 1%; */
    padding: 0.6rem;
}
.rating-description {
    background-color: #84A2FA;
    color: white;
    border-radius: 0.2rem;
    padding: 1%;
    font-size: 1.1rem;
    font-weight: 600;
} 

</style>


