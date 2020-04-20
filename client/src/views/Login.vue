<template>
    <v-app class="main">
        <div class="login-container">
            <div id="nav">
                <router-link to="/">
                    <div class="navLogo">
                        <img src="../assets/CUHK.png">
                        <b>CUHK</b> MeePo
                    </div>
                </router-link>
                
                <form class="navLink" name="form" @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            v-model="user.email"
                            type="email"
                            class="form-control"
                            name="username"
                            placeholder="sid@link.cuhk.edu.hk"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            v-model="user.password"
                            type="password"
                            class="form-control"
                            name="password"
                        />
                    </div>
                    <div class="form-btn">
                        <span></span>
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Register/>
    </v-app>
</template>

<script>
import User from "../models/User";
import Register from "./Register";

import utils from "../utils/validator";

export default {
    name: "Login",
    components: {
        Register,
    },
    data() {
        return {
            user: new User("", "", "", "", "", ""),
            loading: false,
            err: "",
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/home");
        }
    },
    methods: {
        handleLogin() {
            this.loading = true;
            
            this.err = utils.loginFieldChecker(this.user.email, this.user.password);
            if (this.err.length != 0) {
                this.loading = false;
                this.$fire({
                    title: "Login Field Error",
                    text: this.err,
                    type: "error",
                    timer: 3000
                })
                return;                
            }

            this.$store.dispatch("auth/login", this.user)
                .then(
                    () => {
                        this.$router.push("/home");
                    },
                    error => {
                        this.loading = false;
                        this.message = error.response.data;
                        this.$fire({
                            title: this.message.message,
                            text: "Wrong email or password",
                            type: "error",
                            timer: 3000,
                        })
                    }
                );
        }
    },
}
</script>

<style scoped lang="scss">
.main {
    background-color: rgb(247, 247, 247);
    background-image: url("../assets/simple_webpage_design.png");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    height: 100vh !important;
    margin: 0;
}
.navLink {
    cursor:auto;
    line-height: 50px;
    justify-content: end;
    grid-template-columns: 150px 150px 70px 70px;
}
.form-group {
    display: grid;
    grid-template-rows: 40px 20px 20px;
    text-align: left;
}
label {
    font-size: 12px;
    font-weight: bold;
}
input {
    font-size: 11px;
    width: 120px;
    background-color: white; 
    outline: none;
}
.alert {
    line-height: 20px;
    margin: 0;
    padding: 0;
    font-size: 10px;
}

.form-btn {
    display: grid;
    grid-template-rows: 40px 20px 20px;
    font-size: 12px;
    line-height: 80px;
    button {
        width: 60px;
        outline: none;
        border-radius: 20px;
        border: 2px solid #4285F4;
        box-shadow: 0 3px silver;
        color: #4285F4;
        line-height: 10px;
        cursor: pointer;
        transition: .1s;
    }
    button:hover {
        background-color: #4285F4;
        color: #fff;
    }
    button:active {
        box-shadow: 0 1px silver;
        transform: translateY(3px);
    }
}
</style>