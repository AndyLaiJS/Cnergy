<template>
    <v-app>
        <NavBar/>
        <div class="home">
            <div class="profile-container">
                <div class="overlay">
                    <div class="pic">
                        <img style="height: 145px; width: 145px;" :src="require('../../assets/'+ this.img)">
                        <div class="name">
                            <h3>{{ getFormattedName(user.firstName, user.lastName) }}</h3>
                        </div>
                    </div>
                </div>
                <div class="nav-bar-setting">
                    <router-link to="/profile"><i class="el-icon-user"></i></router-link>
                    <router-link to="/manager"><i class="el-icon-folder"></i></router-link>
                    <router-link to="/profile-edit"><i class="el-icon-edit"></i></router-link>
                    <router-link to="/profile-settings"><i class="el-icon-setting" id="actif"></i></router-link>
                    <a id="log-out" @click="logout()">
                        <v-icon size="20px"> mdi-logout </v-icon>
                    </a>
                </div>
                <div class="content-container">
                    <div class="flex-container">
                        <div class="card-container" id="edit">
                            <h2> Password Setting</h2>
                            <div class="content-lists">
                                <label for="fname"> Password </label>
                                <input 
                                    v-model="password"
                                    type="password"
                                    name="fname" 
                                    class="input-box" 
                                    placeholder="New password"
                                >
                            </div>
                            <div class="content-lists">
                                <label for="fname"> Confirm Password </label>
                                <input
                                    v-model="confirmPassword" 
                                    type="password" 
                                    name="fname" 
                                    class="input-box" 
                                    placeholder="Confirm new password"
                                >
                            </div>
                            <button
                                id="change-button"
                                @click="changePassword"
                            >
                                Change
                            </button>
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
import validator from "../../utils/validator";
import formatter from "../../utils/formatter";
import alerter from "../../utils/alerter";

export default {
    data() {
        return {
            user: new User(),
            password: "",
            confirmPassword: "",
            img: '',
        }
    },
    components: {
        NavBar,
        Footer,
    },
    computed: {
        getCurrentUser() {
            return this.$store.state.auth.status.loggedIn &&
                   this.$store.state.auth.user.user; 
        }
    },
    methods: {
        getFormattedName: (firstName, lastName) => formatter.getFormattedName(firstName, lastName),
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
        },
        changePassword() {
            let err = validator.changePasswordChecker(
                this.password, this.confirmPassword,
            );
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Password Error", err,
                ));
                return;
            }

            this.$store
                .dispatch(
                    "user/updatePassword", 
                    [this.user.id, this.password],
                )
                .then(
                    response => response.data.status == 200
                        ?   this.$fire(alerter.successAlert(
                                "Update Password Success"
                            ))
                        :   this.$fire(alerter.errorAlert(
                                "Update Password Failed"
                            )),
                );
        }
    },
    mounted() {
        this.user = this.getCurrentUser;
        if (!this.user) {
            this.$router.push("/");
            return;
        }

        switch(this.user.gender) {
            case "Female":
                this.img = "femaleAvatar.png";
                break;
            default:
                this.img = "maleAvatar.png";
                break;
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
#change-button {
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