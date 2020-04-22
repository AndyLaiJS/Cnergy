<template>
    <div class="register-container">
        <div class="register-box">
            <div class="doodle">
                JOIN OTHERS. <br>
                <b>FIND YOUR PASSION.</b> <br>
                NOW.
            </div>
            <div class="reg-content">
                <form class="reg-form">
                    <div class="wording-title">
                        <h1> Create a new account! </h1>
                        <p> It's quick and easy </p>
                    </div>
                    <div class="compress-form">
                        <input 
                            class="form-control"
                            type="text"
                            v-model="user.firstName"
                            placeholder="First name"
                        />
                        <input 
                            class="form-control"
                            type="text"
                            v-model="user.lastName"
                            placeholder="Last name"
                        />
                    </div>
                    <div class="form-group">
                        <input 
                            class="form-control"
                            type="email"
                            v-model="user.email"
                            placeholder="CULink Email adress"
                        />
                    </div>
                    <div class="compress-form">
                        <select 
                            v-model="user.major"
                        >
                            <option 
                                v-for="major in majors" 
                                :key="major"
                            > 
                                {{ major }}
                            </option>
                        </select>
                        <select 
                            v-model="user.college"
                        >
                            <option 
                                v-for="college in colleges" 
                                :key="college"
                            >
                                {{ college }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input 
                            class="form-control"
                            type="password"
                            v-model="user.password"
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-group">
                        <input 
                            class="form-control"
                            type="password"
                            v-model="confirmPassword"
                            placeholder="Confirm password"
                        />
                    </div>
                    <router-link to="/">
                        <button class="rg-button" @click="register">Register</button>
                    </router-link>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Footer from "./Footer";
import User from "../models/User";
import validator from "../utils/validator";
import alerter from "../utils/alerter";
import { cuhk } from "../utils/constants";

export default {
    data () {
        return {
            user: new User(),
            confirmPassword: "",
            colleges: cuhk.COLLEGES,
            majors: cuhk.MAJOR_CODES,
        }
    },
    components: {
        Footer,
    },
    methods: {
        register() {
            let err = validator.signUpFieldChecker(this.user, this.confirmPassword);
            if (err.length != 0) {
                this.$fire(alerter.errorAlert(
                    "Sign Up Error", err,
                ));
                return;
            }
            this.$store
                .dispatch("auth/register", this.user)
                .then(
                    response => {
                        this.$fire(alerter.successAlert(
                            "Sign Up Succeed",
                            "You have successfully signed up. Please login",
                        ));
                    },
                    error => {
                        this.$fire(alerter.errorAlert(
                            "Sign Up Failed", 
                            error.response.data.message,
                        ));
                    }
                )
        }
    },
    mounted() {

    }
}
</script>

<style scope lang="scss">
.register-container{
    position: relative;
}
.doodle {
    flex: 1;
    padding: 13% 0;
    margin-left: 100px;
    font-size: 50px;
    text-align: left; 
}
.register-box {
    display: flex;
    margin: 70px 200px;
    background-color: rgb(247, 247, 247);
    border-radius: 10px;
    margin-bottom: 90px;
}
.wording-title {
    margin-bottom: 30px;
}
.reg-content {
    flex: 1;
}
.reg-form {
    padding: 45px;
    padding-right: 80px;
    text-align: left;
}
.compress-form {
    width: 100%;
    display: flex;
}
input {
    background-color: white !important;
    padding: 10px;
    margin: 20px;
    margin-left: 0;
    margin-top: 0;
    width: 100%;
    border-radius: 10px !important;
    outline: none;
}
.compress-form {
    input {
        width: 200px;
    }
}
.rg-button{
    margin-top: 20px;
    padding: 5px 30px;
    border-radius: 50px;
    outline: none;
    border: 2px solid #4285F4;
    box-shadow:  0px 3px silver;
    color: #4285F4;
    cursor: pointer;
    transition: .1s;
}
.rg-button:hover {
    background-color: #4285F4;
    color: #fff;
}
.rg-button:active {
    box-shadow: 0 1px silver;
    transform: translateY(3px);
}
@media screen and (max-width: 1400px) {
    .doodle {
        font-size: 40px;
    }
}
</style>