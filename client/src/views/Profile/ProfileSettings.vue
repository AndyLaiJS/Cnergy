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
                    <router-link to="/profile"><i class="el-icon-user"></i></router-link><!-- clubs n activities -->
                    <router-link to="/manager"><i class="el-icon-folder"></i></router-link> <!-- manage cna -->
                    <router-link to="/profile-edit"><i class="el-icon-edit"></i></router-link> <!-- edit profile -->
                    <router-link to="/profile-settings"><i class="el-icon-setting" id="actif"></i></router-link><!-- self-explanatory-->
                    <a id="log-out" @click="logOut()">
                        <v-icon size="20px"> mdi-logout </v-icon>
                    </a>
                    <!-- log out via vuetify icons -->
                </div>
                
                <div class="content-container">
                    <div class="flex-container">
                        <div class="card-container" id="edit">
                            <h2> Password Setting</h2>
                            <div class="content-lists">
                                <label for="fname">Password </label>
                                <input 
                                    v-model="password"
                                    type="password"
                                    name="fname" 
                                    class="input-box" 
                                    placeholder="New password"
                                >
                            </div>
                            <div class="content-lists">
                                <label for="fname">Confirm Password </label>
                                <input
                                    v-model="confirmPassword" 
                                    type="password" 
                                    name="fname" 
                                    class="input-box" 
                                    placeholder="Confirm new password"
                                >
                            </div>
                            <button id="one" @click="changePassword">Change</button>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
        <Footer/>
    </v-app>
</template>

<script>
import NavBar from "../NavBar"
import Footer from "../Footer"

import User from "../../models/User";
import utils from "../../utils/validator";
import formatter from "../../utils/formatter";

export default {
    data() {
        return {
            user: new User(),
            password: "",
            confirmPassword: "",
        }
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
            return formatter.getFormattedName(firstName, lastName);
        },
        logOut() {
            localStorage.removeItem("user");
            this.$router.push("/");
        },
        changePassword() {
            let err = utils.changePasswordChecker(this.password, this.confirmPassword);
            if (err.length != 0) {
                this.$fire({
                    title: "Password Error",
                    text: err,
                    type: "error",
                    timer: 3000
                })

                return;
            }

            this.$store.dispatch("user/updatePassword", [this.user.id, this.password])
                .then(
                    response => {
                        if (response.data.status == 200) {
                            this.$fire({
                                title: "Update Password Succeed",
                                type: "success",
                                timer: 3000
                            })                    
                        } else {
                            this.$fire({
                                title: "Update Password Failed",
                                type: "error",
                                timer: 3000
                            })                    
                        }
                    },
                );
        }
    },
    mounted() {
        if (this.isLoggedIn) {
            this.user = this.getCurrentUser;
        } else {
            this.$router.push("/");
        }
    }
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
.card-container {
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
    box-shadow:  0px 3px silver;
    color: var(--accent-color);
    margin: 0 auto 0 auto;
    cursor: pointer;
    transition: .1s;
}
button:hover {
    color: black;
    background-color: var(--accent-color);
}
button:active {
  box-shadow: 0 1px silver;
  transform: translateY(3px);
}
</style>