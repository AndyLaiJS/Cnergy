<template>
    <v-app>
        <div class="container">

            <div class="login-content">
                <!-- <form class="loginForm" action="index.html" method="POST"> -->
                <form class="loginForm">

                    <h2 class="title">Log In</h2>

                    <div class="input-div one">
                        <div class="i">
                            <i class="fas fa-at"></i>
                        </div>
                        <div class="div">
                            <h5>Email</h5>
                            <input type="email" class="input" name="loginEmail">
                        </div>
                    </div>

                    <div class="input-div pass">
                        <div class="i">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="div">
                            <h5>Password</h5>
                            <input type="password" class="input" name="loginPassword">
                        </div>
                    </div>

                    <a href="#">Forgot Password?</a>
                    <!-- <button type="submit" class="btn">Login</button> -->
                    <router-link to="/home"> <button class="btn">Login</button> </router-link>

                </form>

            </div>

            <div class="registration">
                <span>Do not have account yet?</span>
                <a style="display: inline" href="Reg.html">Register Here</a>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    mounted() {
        const inputs = document.querySelectorAll(".input");


        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value == ""){
                parent.classList.remove("focus");
            }
        }


        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    }
    
}
</script>

<style scoped lang="scss">
@import '../css/Page.css';
</style>