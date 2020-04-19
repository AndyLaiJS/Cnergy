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
                    <router-link to="/profile"><i class="el-icon-user" id="actif"></i></router-link> <!-- clubs n activities -->
                    <router-link to="/manager"><i class="el-icon-folder"></i></router-link> <!-- manage cna -->
                    <router-link to="/profile-edit"><i class="el-icon-edit"></i></router-link> <!-- edit profile -->
                    <router-link to="/profile-settings"><i class="el-icon-setting"></i></router-link> <!-- self-explanatory-->
                </div>
                
                <div class="contentContainer">
                    <div class="flexContainer">
                        <div class="CardContainer" id="info">
                            <h2> Intro </h2>
                            SID:  {{sid}}<br>
                            Major:  {{major}}<br>
                            Year:   {{year}}<br>
                            College: {{college}}<br>
                        </div>
                        <div class="CardContainer" id="desc">
                            <h2> About me </h2>
                            I am the rarest of ponies, the SILVER PONY!
                        </div>
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
    color: #4285F4 !important;
}
.home {
    background-image: url("../../assets/bolt.png");
    background-size: 1600px;
    background-repeat: no-repeat;
}
.name {
    text-align: center;
    color: white;
}
.cont{
    margin: 0;
    height: 100vh;
    display: block;
    padding: 0;
}
.profContainer {
    margin: auto;
    width: 1000px;
    margin-top: 30px;
    border-radius: 10px;
    min-height: 500px;
    background-color: rgb(247, 247, 247);
    /* box-shadow: 0 0 5px rgba(0,0,0,0.10); */
    padding-bottom: 5px;
    margin-bottom: 30px;
}
.contentContainer {
    margin: 50px;
    margin-top: 10px;
}
.overlay {
    border-radius: 10px 10px 0 0;
    background-color: #4285F4;
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
    box-shadow: 0 0 15px rgba(0,0,0,0.15);
}
.navSetting {
    position: relative;
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
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
i {
    cursor: pointer;
}

i:hover {
    color:#4285F4;
}

.flexContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.CardContainer {
    border-radius: 10px;
    margin: 10px;
    padding-bottom: 10px;
    width: 1000px;
    max-height: 300px;
    overflow: auto;
    background-color: white;
}
.cna {
    top: 0;
    position: sticky;
    padding-top: 15px;
    z-index: 999;
    width: 100%;
    background-color: white;
}
.Card {
    background-color: white;
    min-width: 50px;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 5px; 
    padding: 20px 0;
    box-shadow: 0 0 3px rgba(0,0,0,0.10);
    transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
    position: relative;
    overflow: auto;
    cursor: pointer;
}
.Card:hover {
    box-shadow: 0 5px 5px rgba(0,0,0,0.10);
    transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
}
.Card:active {
    box-shadow: 0 0 3px rgba(0,0,0,0.10);
    transition: box-shadow .1s ease-in-out, transform .1s ease-in-out;
}
</style>