<template>
    <v-app>
        <NavBar/>
        <div class="home">

            <div class="profile-container">

                <div class="overlay">
                    <div class="pic">
                        <img style="height: 145px; width: 145px;" src="../../assets/avatar.png">
                        <div class="name">
                            <h3>{{ getFormattedName(user.firstName, user.lastName) }}</h3>
                        </div>
                    </div>
                </div>
                <div class="nav-bar-setting">
                    <router-link to="/profile"><i class="el-icon-user"></i></router-link> <!-- clubs n activities -->
                    <router-link to="/manager" id="actif"><i class="el-icon-folder"></i></router-link> <!-- manage cna -->
                    <router-link to="/profile-edit"><i class="el-icon-edit"></i></router-link> <!-- edit profile -->
                    <router-link to="/profile-settings"><i class="el-icon-setting"></i></router-link> <!-- self-explanatory-->
                    <a id="log-out" @click="logout()">
                        <v-icon size="20px"> mdi-logout </v-icon>
                    </a>
                </div>
                <div class="content-container">
                    <h1> Manage Your Creation </h1>
                    <div class="card-title">
                        <h2>Clubs</h2>
                    </div>
                    <div class="main-container">
                        <div class="cna-view">
                            <div
                                class="card"
                                id="smaller-card"
                                v-for="(club, index) in this.createdClubs"
                                v-bind:key = "index"
                            >   
                                <div class="card-content">
                                    <b>{{ club.name }}</b>
                                    <!-- {{ club.description }} -->
                                    <br><br>
                                    <COPopupModal />
                                </div>
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
                                v-for="(activity, index) in this.createdActivities" 
                                v-bind:key = "index"
                            >
                                <div class="card-content">
                                    <b>{{ activity.name }}</b><br>
                                    Event Date: {{ getFormattedDate(activity.activityDate) }}<br><br>
                                    <!-- {{ activity.description }} -->
                                    <AOPopupModal
                                        v-bind:activityId="activity.id"
                                        v-bind:activityName="activity.name"
                                        v-bind:activityDescription="activity.description"
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
import COPopupModal from "../../components/COPopupModal";   // club manage
import AOPopupModal from "../../components/AOPopupModal";   //activity manage
import ActivityService from '../../services/activityService';
import ClubService from '../../services/clubService';
import formatter from "../../utils/formatter";

export default {
    data() {
        return {
            user: new User(),
            createdClubs: [],
            createdActivities: [],
        }
    },
    components: {
        NavBar,
        Footer,
        AOPopupModal,
        COPopupModal,
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
        this.createdActivities = 
            await ActivityService.getOngoingActivities(this.user.id);
        this.createdClubs =
            await ClubService.getClubs(this.user.id);
    }
}
</script>

<style scoped lang="scss">
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
</style>