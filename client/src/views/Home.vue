<template>
    <div class="home">
        <NavBar/>

        <div class="card-box">
            <p> <span id="dscvr">SEEK.</span> <b>SEARCH YOUR PASSION.</b> <span id="join">JOIN.</span></p> 
            <div class="cards-container">
                <ViewPanel/>
            </div> 

            <!-- <div class="cards">
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
                </div>
            </div> -->

        </div>

        <Footer/>
    </div>
</template>

<script>
import NavBar from "./NavBar"
import Footer from "./Footer"
import ViewPanel from "./View"

import Activity from "../models/Activity";
import ActivityService from "../services/activityService";
import ClubService from "../services/clubService";

export default {
    name: "Home",
    data() {
        return {
            clubs: [
                { name: "Dummy Club Name", description: "WOWWWW" },
                { name: "Dummy Club Name", description: "WOWWWW" },
                { name: "Another Dummy Club Name", description: "How would you like it if you don't join this club?" },
            ],
            activity: [
                { name: "Dummy Activity Name", description: "WOWWWW" },
                { name: "Dummy Activity Name", description: "WOWWWW" },
                { name: "Another Activity Club Name", description: "How would you like it if you don't join this club?" },
            ],
            message: "",
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    components: {
        NavBar,
        Footer,
        ViewPanel
    },
    async mounted() {
        if (!this.isLoggedIn) {
            this.$router.push("/");
            return;
        }
        this.activities = 
            await ActivityService
                .getOngoingActivities();
        this.clubs = 
            await ClubService
                .getClubs();
    }
}
</script>

<style scoped lang="scss">
#dscvr, #join {
    font-size: 25px;
}
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
.card-box {
    margin: 70px 200px;
    background-color: rgb(247, 247, 247);
    border-radius: 10px;
    margin-bottom: 90px;
    p {
        font-size: 40px;
        padding-top: 30px;
    }
    h2 {
        font-size: 35px;
    }
}
.cards-container {
    margin: 10px 100px;
    padding-bottom: 80px;
}
.description {
    margin: 10px;
    padding: 20px;
}

</style>
