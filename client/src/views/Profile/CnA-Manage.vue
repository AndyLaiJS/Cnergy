<template>
    <v-app>
        <Nav/>
        <div class="home">

            <div class="profContainer">

                <div class="overlay">
                    <div class="pic">
                        <img style="height: 145px; width: 145px;" src="../../assets/avatar.png">
                        <div class="name">
                            <h3>Silver Pony</h3>
                        </div>
                    </div>
                </div>

                <div class="navSetting">
                    <router-link to="/profile"><i class="el-icon-user"></i></router-link> <!-- clubs n activities -->
                    <router-link to="/manager" id="actif"><i class="el-icon-folder"></i></router-link> <!-- manage cna -->
                    <router-link to="/profile-edit"><i class="el-icon-edit"></i></router-link> <!-- edit profile -->
                    <router-link to="/profile-settings"><i class="el-icon-setting"></i></router-link> <!-- self-explanatory-->
                </div>

                <div class="flexContainer">
                    <div class="CardContainer">
                        <div class="cna">
                            <h2>Clubs</h2>
                        </div>
                        <div class="Card" v-for="(value, index) in testvalues" v-bind:key = "index">
                            {{ value }}
                        </div>
                    </div>

                    <div class="CardContainer">
                        <div class="cna">
                            <h2>Activities</h2>
                        </div>
                        <div class="Card" v-for="(value, index) in testvalues2" v-bind:key = "index">
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
            sid: "1155116329",
            major: "Computer Science",
            year: "2",
            college: "SHHo",
            testvalues: ["Photography", "Football", "Badminton", 
                        "Cooking", "Painting", "Squash", 
                        "Swimming", "Research", "Meme Community Supreme"],
            testvalues2: ["Eat New Food", "Dai Pai Dong or something", "HIKE LIKE NEVER B4!!", 
                        "Instant GPA 4.0", "Instant GPA 0.0", "Tag", 
                        "A game of... PONG", "Civ 6 Community", "Meme Klub Edisi 2"],
        }
    },
    components: {
        Nav,
        thefooter,
    },
}
</script>

<style scoped lang="scss">

</style>