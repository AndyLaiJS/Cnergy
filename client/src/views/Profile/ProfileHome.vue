<template>
    <v-app>
        <NavBar />
        <div class="home">
            <div class="profile-container">
                <div class="overlay">
                    <div class="pic">
                        <img
                            style="height: 145px; width: 145px;"
                            src="../../assets/avatar.png"
                        />
                        <div class="name">
                            <h3>
                                {{ getFormattedName(user.firstName, user.lastName) }}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="nav-bar-setting">
                    <router-link to="/profile">
                        <i class="el-icon-user" id="actif"></i>
                    </router-link>
                    <!-- clubs n activities -->
                    <router-link to="/manager">
                        <i class="el-icon-folder"></i>
                    </router-link> 
                    <!-- manage cna -->
                    <router-link to="/profile-edit">
                        <i class="el-icon-edit"></i>
                    </router-link>
                    <!-- edit profile -->
                    <router-link to="/profile-settings">
                        <i class="el-icon-setting"></i>
                    </router-link>
                    <!-- self-explanatory-->
                    <a id="log-out" @click="logout()">
                        <v-icon size="20px"> mdi-logout </v-icon>
                    </a>
                    <!-- log out via vuetify icons -->
                </div>
                <div class="content-container">
                    <h1> Profile </h1>
                    <div class="flex-container">
                        <div class="card-container" id="info">
                            <h2>Intro</h2>
                            SID: {{ getSIDFromEmail(this.user.email) }}<br />
                            Major: {{ user.major }}<br />
                            College: {{ user.college }}<br />
                        </div>
                        <div class="card-container" id="desc">
                            <h2>About me</h2>
                            {{ this.user.about }}
                        </div>
                    </div>
                    <!-- <div class="flex-container"> -->
                    <div class="card-title">
                        <h2>Clubs</h2>
                    </div>
                    <div class="main-container">
                        <div class="cna-view">
                            <div
                                class="card"
                                id="smaller-card"
                                v-for="(club, index) in joinedClubs"
                                v-bind:key="index"
                            >
                                <!-- TODO: Create an additional component to store this -->
                                <!-- Consider using Icon instead of words -->
                                <div class="card-content">
                                    <b> {{ club.name }} </b>
                                    <!-- Description: {{ club.description }}<br> -->
                                    
                                </div>
                                <!-- TODO: Create a club popup modal -->
                                <!-- <div class="Title">
                                    <InfoPopupModal/>
                                </div> -->
                            </div>

                        </div>
                    </div>

                    <div class="card-title">
                        <h2>Activities</h2>
                    </div>
                    <div class="main-container">
                        <div class="cna-view">
                            <div
                                class="card"
                                id="smaller-card"
                                v-for="(activity, index) in joinedActivities"
                                v-bind:key="index"
                            >
                                <!-- TODO: Create an additional component to store this -->
                                <!-- Consider using Icon instead of words -->
                                <div class="card-content">
                                    <b> {{ activity.name }} </b><br>
                                    <!-- Description: {{ activity.description }}<br>
                                    {{ activity.activityDate }}
                                    Min. Participants: {{ activity.minParticipants }}<br>
                                    Max. Participants: {{ activity.maxParticipants }}<br> -->
                                    Type: {{ activity.type }}<br> 
                                    
                                </div>
                                <div class="Title">
                                    <ActivityModal
                                        v-bind:name="activity.name"
                                        v-bind:description="activity.description"
                                        v-bind:minParticipants="activity.minParticipants"
                                        v-bind:maxParticipants="activity.maxParticipants"
                                        v-bind:type="activity.type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <Footer/>  
    </v-app>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../Footer";
import User from "../../models/User";
import ActivityModal from "../../components/ActivityModal"
import ActivityService from "../../services/activityService";
import ClubService from "../../services/clubService";
import formatter from  "../../utils/formatter";

export default {
    data() {
        return {
            user: new User(),
            joinedClubs: [],
            joinedActivities: [],
        };
    },
    components: {
        NavBar,
        Footer,
        ActivityModal,
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        getFormattedName: (firstName, lastName) => formatter.getFormattedName(firstName, lastName),
        getFormattedDate: (date) => formatter.getFormattedDate(date),
        getSIDFromEmail: (email) => email.split("@")[0],
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
        },
    },
    async mounted() {
        this.user = this.getCurrentUser;
        if (!this.user) {
            this.$router.push("/");
            return;
        }

        this.joinedActivities =
            await ActivityService
                .getJoinedActivities(this.user.id);
        this.joinedClubs =
            await ClubService
                .getJoinedClubs(this.user.id);
    },
};
</script>

<style lang="scss">
.v-application a {
    color: black !important;
}
#info {
    flex: 3;
    text-align: left;
    padding: 20px;
    padding-left: 30px;
}
#desc {
    flex: 5;
    text-align: left;
    padding: 20px;
    padding-left: 30px;
}
#actif {
    color: #4285f4 !important;
}
#logout {
    margin: 0;
    padding: 0;
}
#smaller-card {
    width: 400px;
    height: 200px;
    .card-content {
        height:155px;
    }
}
.home {
    background-color: rgb(247, 247, 247);
    background-image: url("../../assets/simple_webpage_design(1).png");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
}
.name {
    text-align: center;
    color: white;
}
.cont {
    margin: 0;
    height: 100vh;
    display: block;
    padding: 0;
}
.profile-container {
    margin: auto;
    width: 1000px;
    margin: 50px auto;
    border-radius: 10px;
    min-height: 500px;
    background-color: rgb(247, 247, 247);
    /* box-shadow: 0 0 5px rgba(0,0,0,0.10); */
    padding-bottom: 5px;
}
.content-container {
    margin: 50px;
    margin-top: 10px;
}
.overlay {
    border-radius: 10px 10px 0 0;
    background-color: #4285f4;
    height: 40%;
    top: 0;
    bottom: 0;
    position: relative;
}
.pic {
    padding: 30px 0 20px 0;
}
.pic img {
    position: relative;
    padding: 5px;
    background-color: white;
    justify-content: center;
    justify-items: center;
    border-radius: 100px;
    /* margin-top: 35px; */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}
.nav-bar-setting {
    position: relative;
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px 60px;
    justify-content: end;
    a {
    font-size: 20px;
    margin-top: 10px;
    padding-right: 20px;
    }
    h4 {
        cursor: pointer;
    }
}

i, v-icon{
    cursor: pointer;
}

i:hover, v-icon:hover {
    color: #4285f4 !important;
}

.v-icon {
    text-decoration: none;
    color: black !important;
    margin-bottom: 3px !important;
}
.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card-container {
    border-radius: 10px;
    margin: 10px;
    padding-bottom: 10px;
    width: 1000px;
    max-height: 300px;
    overflow: auto;
    background-color: white;
}
.card-title {
    width: 100%;
    background-color: white;
    margin-top: 10px;
    padding-top: 25px;
    padding-bottom: 25px;
}
.main-container {
    min-height: 0;
}
.card-title {
    border-radius: 10px 10px 0 0;
}
.card-content {
    b {
        font-size: 20px;
    }
}
.Title {
    overflow: hidden;
    font-size: 14px;
    padding: 0 10px 0 10px;
    height: 45px;
    width: 100%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    position: absolute;
}
</style>