<template>
    <div>
        <NavBar/>
        <div class="create-box">

            <div class="cards">
                <div class="card-title">
                    <h1>Clubs</h1>
                </div>
                <div
                    class="card"
                    v-for="(club, index) in clubs"
                    v-bind:key="index"
                >
                    <b>{{ club.name }}</b>
                    {{ club.description }}
                    <PopupModal/>
                    <!-- <v-btn
                        id="info-button"
                        color="primary"
                        depressed
                        small
                    > More Info</v-btn> -->
                </div>
            </div>
            <div class="cards">
                <div class="card-title">
                    <h1>Activities</h1>
                </div>
                <div
                    class="card"
                    v-for="(activity, index) in activities"
                    v-bind:key="index"
                >
                    <b>{{ activity.name }}</b>
                    {{ activity.description }}
                    <PopupModal/>
                    <!-- <v-btn
                        id="info-button"
                        color="primary"
                        depressed
                        small
                    > More Info</v-btn> -->
                </div>
            </div>
            
        </div>

        <div class="home">
            <v-carousel
                cycle
                height="300"
                hide-delimiter-background
                hide-delimiters
                show-arrows-on-hover
            >
                <v-carousel-item
                    v-for="(slide, index) in slides"
                    v-bind:key="index"
                    :src="slide.src"
                >
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                        >
                            <div class="display-3">{{ slide.message }}</div>
                        </v-row>
                    
                </v-carousel-item>
            </v-carousel>

            <div class="cards">
                <div class="card-title">
                    <h1>Clubs</h1>
                </div>
                <div 
                    class="card"
                    v-for="(club, index) in clubs"
                    v-bind:key="index"
                >
                    {{ club.name }}
                </div>
            </div>
            
        </div>
        <Footer/>
    </div>
</template>

<script>
import NavBar from "./NavBar"
import Footer from "./Footer"
import PopupModal from "../components/PopupModal";

import Activity from "../models/Activity";
import ActivityService from "../services/activityService";

export default {
    name: "Home",
    data() {
        return {
            activities: [],
            clubs: [
                { name: "Dummy Club Name" },
                { name: "Another Dummy Club Name" },
            ],
            slides: [
                { message: "CNERGY", color: "indigo", src: require('../assets/Slide 1.png') },
                { message: "Second", color: "warning", src: require('../assets/Slide 2.png')},
                { message: "Third", color: "pink darken-2", src: require('../assets/Slide 3.png') },
                { message: "Fourth", color: "red ligten-1", src: require('../assets/Slide 2.png') },
                { message: "Fifth", color: "deep-purple accent-4", src: require('../assets/Slide 2.png') },
            ],
            message: "",
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        getCurrentUser() {
            return this.$store.state.auth.user.user;
        },
    },
    components: {
        NavBar,
        Footer,
        PopupModal
    },
    mounted() {
        if (!this.isLoggedIn) {
            this.$router.push("/");
            return;
        }
        ActivityService
            .getOngoingActivities()
            .then(
                response => {
                    this.activities = response.data.activities;
                },
                error => {
                    this.message =
                        (error.response && error.response.data) ||
                         error.message ||
                         error.toString()
                }
            );
    }
}
</script>

<style scoped lang="scss">
.doodle {
    flex: 1;
}
.info-content {
    flex: 1.3;
}
.about-us {
    font-size: 40px;
    padding: 45px;
    padding-right: 80px;
    text-align: left;
}
/* The CSS for the create-box and everything is on CreateActivity.. */
h1, h2, h3 {
    color: black;
    font-weight: 600;
    margin: 0;
}

#title {
    margin: 10px;
    margin-bottom: 15px;
    width: 100%;
    font-weight: 600;
    color: black;
    font-size: 40px;
}
.home {
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0 10px 0;
    background-image: url("../assets/bolt.png");
    background-repeat: no-repeat;
}
.cards {
    flex: 5;
    border-radius: 10px;
    margin: 50px 25px;
    padding-bottom: 10px;
    max-height: 525px;
    overflow: auto;
    background-color: white;
}
.card-title {
    top: 0;
    position: sticky;
    padding-top: 15px;
    width: 100%;
    background-color: white;
}
.card {
    background-color: white;
    min-width: 50px;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 5px; 
    width: 500px;
    padding: 55px 0;
    box-shadow: 0 0 3px rgba(0,0,0,0.10);
    transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
    position: relative;
    overflow: hidden;
    display: flex;
}
.card:hover {
    box-shadow: 0 5px 5px rgba(0,0,0,0.10);
    transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
}
</style>
