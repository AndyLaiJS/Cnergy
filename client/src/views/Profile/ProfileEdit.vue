<template>
    <v-app>
        <Nav/>
        <div class="home">

            <div class="profContainer">

                <div class="overlay">
                    <div class="pic">
                        <img style="height: 145px; width: 145px;" src="../../assets/avatar.png">
                        <div class="name">
                            <button id="whiteBtn">Edit</button> <!-- for the picture -->
                            <h3>Silver Pony</h3>
                        </div>
                    </div>
                </div>

                <div class="navSetting">
                    <router-link to="/profile"><i class="el-icon-files"></i></router-link><!-- clubs n activities -->
                    <router-link to="/profile-edit" id="actif"><i class="el-icon-edit"></i></router-link> <!-- edit profile -->
                    <router-link to="/profile-settings"><i class="el-icon-setting"></i></router-link><!-- self-explanatory-->
                </div>
                
                <div class="contentContainer">
                    <div class="flexContainer">
                        <div class="CardContainer" id="desc">
                            <h2> About me </h2>
                            <div class="content-lists">
                                <input type="text" class="input-box-desc" placeholder="I am the rarest of ponies, the SILVER PONY!">
                            </div>
                        </div>
                        <div class="CardContainer" id="edit">
                            <h2> Basic Info </h2>
                                <div class="content-lists">
                                    <label for="fname">Major </label>
                                    <input type="text" name="fname" class="input-box" placeholder="Computer Science">
                                </div>
                                <div class="content-lists">
                                    <label for="fname">College </label>
                                    <input type="text" name="fname" class="input-box" placeholder="New Asia College">
                                </div>
                            <button id="one"> Edit </button>
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
import Nav from "../Navi"
import thefooter from "../Footer"

export default {
    components: {
        Nav,
        thefooter,
    },
}
</script>

<style scoped lang="scss">
#whiteBtn {
    border: 2px solid white;
    color: white;
}
#edit {
    text-align: left;
    padding: 20px;
    padding-left: 30px;
}
#one {
    margin-top: 10px;
    width: 100px;
}
.CardContainer {
    text-align: left;
}
.input-box-desc {
    width: 100%;
    outline: none;
}
.content-lists {
    display: flex;
    margin: 10px;
}
label {
    font-size: 17px;
    font-weight: bold;
    flex: 2;
}
input {
    flex: 5;
    outline: none;
}
button {
    display: inline-block;
    width: 70px;
    border-radius: 15px;
    outline: none;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    margin: 0 auto 0 auto;
    cursor: pointer;
    transition: .5s;
}
button:hover {
    color: white;
    background-color: var(--accent-color);
}
</style>