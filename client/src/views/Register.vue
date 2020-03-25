<template>
    <div class="container">

      <div class="login-content">
          <!-- <form class="regForm" action="index.html" method="POST"> -->
          <form class="regForm">

              <h2 class="title">Registration</h2>

              <div class="inputs">

                    <div class="input-div fName">
                        <div class="i">
                          <i class="fas fa-user"></i>
                        </div>
                        <div class="div">
                          <h5>First Name</h5>
                          <input type="text" class="input" name="regFirstName">
                        </div>
                    </div>
                    <div class="input-div lName">
                        <div class="i">
                          <i class="fas fa-user"></i>
                        </div>
                        <div class="div">
                          <h5>Last Name</h5>
                          <input type="text" class="input" name="regLastName">
                        </div>
                    </div>

                    <div class="input-div email">
                        <div class="i">
                          <i class="fas fa-at"></i>
                        </div>
                        <div class="div">
                          <h5>Email</h5>
                          <input type="email" class="input" name="loginEmail">
                        </div>
                    </div>

                    <div class="input-div pass password">
                        <div class="i">
                          <i class="fas fa-lock"></i>
                        </div>
                        <div class="div">
                          <h5>Password</h5>
                          <input type="password" class="input" name="regPassword">
                        </div>
                    </div>
                    <div class="input-div pass confirm-password">
                        <div class="i">
                          <i class="fas fa-lock"></i>
                        </div>
                        <div class="div">
                          <h5>Confirm Password</h5>
                          <input type="password" class="input" name="regConfirmPassword">
                        </div>
                    </div>

              </div>

              <!-- <button type="submit" class="btn">Register</button> -->
              <router-link to="/home"><button class="btn">Register</button></router-link>

          </form>
      </div>

    </div>
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