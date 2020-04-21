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
                    <div class="flex-container">
                        <div class="card-container" id="info">
                            <h2>Intro</h2>
                            SID: {{ getSIDFromEmail(this.user.email) }}<br />
                            Major: {{ user.major }}<br />
                            College: {{ user.college }}<br />
                        </div>
                        <div class="card-container" id="desc">
                            <h2>About me</h2>
                            I am the rarest of ponies, the SILVER PONY!
                        </div>
                    </div>
                    <div class="flex-container">
                        <div class="card-container">
                            <div class="card-title">
                                <h2>Clubs</h2>
                            </div>
                        <!-- TODO: Fetch Joined Clubs -->
                        </div>
                        <div class="card-container">
                            <div class="card-title">
                                <h2>Activities</h2>
                            </div>
                            <div
                                class="card"
                                v-for="(activity, index) in userJoinedActivities"
                                v-bind:key="index"
                            >
                                <!-- TODO: Create an additional component to store this -->
                                <!-- Consider using Icon instead of words -->
                                <b>{{ activity.name }}</b><br>
                                Description: {{ activity.description }}<br>
                                <!-- {{ activity.activityDate }} -->
                                Date: {{ getFormattedDate(activity.activityDate) }}<br>
                                Min. Participants: {{ activity.minParticipants }}<br>
                                Max. Participants: {{ activity.maxParticipants }}<br>
                                Type: {{ activity.type }}<br>
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
import utils from  "../../utils/formatter";

export default {
    data() {
        return {
            user: new User(),
            userJoinedClubs: [],
            userJoinedActivities: [],
        };
    },
    components: {
        NavBar,
        Footer,
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        getCurrentUser() {
            return this.$store.state.auth.user.user;
        },
    },
    methods: {
        getFormattedName(firstName, lastName) {
            return utils.getFormattedName(firstName, lastName);
        },
        getSIDFromEmail(email) {
            let sid = email.split("@");
            return sid[0];
        },
        getFormattedDate(tanggal) {
            return utils.getFormattedDate(tanggal);
        },
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
        },
    },
    mounted() {
        if (this.isLoggedIn) {
            this.user = this.getCurrentUser;

            this.$store
                .dispatch("activity/getJoinedActivities", this.user)
                .then(() => {
                    this.userJoinedActivities = this.$store.state.activity.joinedActivities;
                });
        } else {
            this.$router.push("/");
        }
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
    padding: 20px 0;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    position: relative;
    overflow: auto;
    cursor: pointer;
}
.card:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.card:active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;
}
</style>