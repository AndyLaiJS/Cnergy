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
                id="first-box"
                class="form-control"
                type="text"
                name="first-name"
                placeholder="First name"
                />
              <input 
                id="second-box"
                class="form-control"
                type="text"
                name="first-name"
                placeholder="Last name"
                />
            </div>
            <div class="form-group">
              <input 
                class="form-control"
                type="email"
                name="email"
                placeholder="CULink Email adress"
                />
            </div>
            <div class="compress-form">
              <input 
                id="first-box"
                class="form-control"
                type="text"
                name="major"
                placeholder="Major i.e. Computer Science"
                />
              <select id="second-box">
                  <option v-for="college in colleges" :key="college">
                      {{ college }}
                  </option>
              </select>
            </div>
            <div class="form-group">
              <input 
                class="form-control"
                type="password"
                name="password"
                placeholder="Password"
                />
            </div>
            <div class="form-group">
              <input 
                class="form-control"
                type="password"
                name="confirm-password"
                placeholder="Confirm password"
                />
            </div>

            <router-link to="/"><button class="rg-button">Register</button></router-link>

          </form>
        </div>
      </div>

      <Footer/>
    </div>
</template>

<script>
import Footer from "./Footer";
export default {
  data () {
    return {
      colleges: ["S.H.Ho", "New Asia", "Morningside", "Chung Chi", "United",
                "Lee Woo Sing", "Wu Yee Sun", "C.W Chu", "Shaw"],
    }
  },
  components: {
    Footer,
  },

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
#first-box {
  flex: 1;
}
#second-box {
  flex: 1;
  margin-right: 0;
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