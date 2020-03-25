<template>
<!-- TODO: Create the animation and UI -->
    <div class="login-page">
        <div class="login-form" @submit.prevent="onLogin">
            <form>
                <h2 class="title">Log In</h2>

                <div class="email">
                    <input type="text" placeholder="Email" v-model="email"/>
                </div>
                <div class="password">
                    <input type="password" placeholder="Password" v-model="password"/>
                </div>

                <button>Login</button>
                <router-link to="/register"><button>Register Here</button></router-link>
            </form>
            <div class="error" v-if="error">{{ error.message }}</div>
        </div>
    </div>
</template>

<script>
import { handleSignIn } from "../handler";

export default {
    data() {
        return {
            email: "",
            password: "",
            error: "",
            authenticated: false,
        }
    },
    methods: {
        async onLogin() {
            try {
                const user = await handleSignIn(this.email, this.password)
                this.$router.push("/home");
            } catch(e) {
                this.error = e;
            }
        }
    },
    // mounted() {
    //     const inputs = document.querySelectorAll(".input");
    //     function addcl(){
    //         let parent = this.parentNode.parentNode;
    //         parent.classList.add("focus");
    //     }

    //     function remcl(){
    //         let parent = this.parentNode.parentNode;
    //         if(this.value == ""){
    //             parent.classList.remove("focus");
    //         }
    //     }


    //     inputs.forEach(input => {
    //         input.addEventListener("focus", addcl);
    //         input.addEventListener("blur", remcl);
    //     });
    // }
}
</script>

<style scoped lang="scss">
@import '../css/Page.css';
.registration {
    a {
        display: inline-block;
    }
}
</style>