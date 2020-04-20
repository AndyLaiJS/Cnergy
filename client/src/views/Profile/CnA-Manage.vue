<template>
    <v-app>
        <Nav/>
        <div class="home">

            <div class="profile-container">

                <div class="overlay">
                    <div class="pic">
                        <img style="height: 145px; width: 145px;" src="../../assets/avatar.png">
                        <div class="name">
                            <h3>Silver Pony</h3>
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
                    <!-- log out via vuetify icons -->
                </div>
                <div class="content-container">
                    <div class="flex-container">
                        <div class="card-container">
                            <div class="cna">
                                <h2>Clubs</h2>
                            </div>
                            <div class="card" v-for="(value, index) in testvalues" v-bind:key = "index">
                                {{ value }}
                            </div>
                        </div>

                        <div class="card-container">
                            <div class="cna">
                                <h2>Activities</h2>
                            </div>
                            <div class="card" v-for="(value, index) in testvalues2" v-bind:key = "index">
                                {{ value }} 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
        <thefooter/>
    </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Nav from "../NavBar"
import thefooter from "../Footer"

export default {
    data() {
        return {
            testvalues: ["Photography", "Badminton", "Meme Community Supreme"],
            testvalues2: ["Eat New Food"],
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
        },
    },
    components: {
        Nav,
        thefooter,
    },
}
</script>

<style scoped lang="scss">

</style>