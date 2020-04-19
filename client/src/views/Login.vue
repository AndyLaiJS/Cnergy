<template>
    <div class="col-md-12">
        <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    v-model="user.email"
                    v-validate="'required'"
                    type="email"
                    class="form-control"
                    name="username"
                />
                <div
                    v-if="errors.has('email')"
                    class="alert alert-danger"
                    role="alert"
                >Email is required!</div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    v-model="user.password"
                    v-validate="'required'"
                    type="password"
                    class="form-control"
                    name="password"
                />
                <div
                    v-if="errors.has('password')"
                    class="alert alert-danger"
                    role="alert"
                >Password is required!</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Login</span>
                </button>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
        </form>
    </div>
</template>

<script>
import User from "../models/User";

export default {
    name: "Login",
    data() {
        return {
            user: new User("", "", "", "", ""),
            loading: false,
            message: "",
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
            this.$validator.validateAll().then(
                isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.user.email && this.user.password) {
                        this.$store.dispatch("auth/login", this.user)
                            .then(
                                () => {
                                    this.$router.push("/home");
                                },
                                error => {
                                    this.loading = false;
                                    this.message =
                                        (error.response && error.response.data) ||
                                         error.message ||
                                         error.toString();
                                }
                            );
                    }
                }
            );
        }
    },
}
</script>

<style>

</style>