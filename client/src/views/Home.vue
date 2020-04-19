<template>
    <div>
        <NavBar/>
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
                >
                    <v-sheet
                        :color="slide.color"
                        height="100%"
                    >
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                        >
                            <div class="display-3">{{ slide.message }}</div>
                        </v-row>
                    </v-sheet>
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
                { message: "First", color: "indigo" },
                { message: "Second", color: "warning" },
                { message: "Third", color: "pink darken-2" },
                { message: "Fourth", color: "red ligten-1" },
                { message: "Fifth", color: "deep-purple accent-4" },
            ],
            message: "",
        };
    },
    components: {
        NavBar,
        Footer,
        PopupModal
    },
    mounted() {
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

<style scoped>
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
    border-radius: 20px;
    margin: 50px 25px;
    padding-bottom: 10px;
    max-height: 525px;
    overflow: auto;
    background-color: white;
    box-shadow: 0 0 3px rgba(0,0,0,0.10);
}
.card-title {
    top: 0;
    position: sticky;
    padding-top: 15px;
    /* z-index: 999; */
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
