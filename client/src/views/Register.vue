<template>
    <div class="container">

      <div class="login-content">
          <!-- <form class="regForm" action="index.html" method="POST"> -->
          <form class="regForm">

              <h1 class="title">Registration</h1>

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

                    <div class="input-div major">
                        <div class="i">
                        </div>
                        <div class="div">
                          <h5>Major </h5>
                          <input type="text" class="input" name="regMajor">
                        </div>
                    </div>

                    <!-- <div class="input-div select-div college">
                        <div class="select">
                          <select class="selector" name="collegeSelector">
                            <option value="college">College</option>
                            <option value="chungchi">Chung Chi College</option>
                            <option value="newasia">New Asia College</option>
                            <option value="united">United College</option>
                            <option value="shaw">Shaw College</option>
                            <option value="morningside">Morningside College</option>
                            <option value="shho">S.H.Ho College</option>
                            <option value="cwchu">CW.Chu College</option>
                            <option value="wuyeesun">Wu Yee Sun College</option>
                            <option value="leewoosing">Lee Woo Sing College</option>
                          </select>
                        </div>
                    </div> -->
                    <v-col class="d-flex" cols="22" sm="20">
                      <v-select
                        :items="colleges"
                        label="Colleges"
                        
                      ></v-select>
                    </v-col>

              </div>

              <!-- <button type="submit" class="btn">Register</button> -->
              <router-link to="/home"><button class="btn">Register</button></router-link>

          </form>
      </div>

    </div>
</template>

<script>
export default {
  data: () => ({
    colleges: ['S.H.Ho College', 'New Asia College', 'Shaw College', 'Morningside College', 'Chung Chi College',
              'United College', 'CW.Chu College', 'Wu Yee Sun College', 'Lee Woo Sing College'],
  }),

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

.v-select__selections {
  height: 90px !important;
  background-color: black;
}
.v-text-field {
  padding-top: 45px;
}

.login-content {
  margin-top: 0;
  display: flex;
}
</style>