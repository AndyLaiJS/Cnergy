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
              <input 
                id="second-box"
                class="form-control"
                type="text"
                name="college"
                placeholder="College"
                />
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
.register-container > .footerBody {
  width: 100% !important;
  position: absolute;
  bottom: 0 !important;
}
.v-select__selections {
  height: 90px !important;
}
.v-text-field {
  padding-top: 45px;
}
.doodle {
  flex: 1;
  padding: 13% 0;
  margin-left: 100px;
  font-size: 55px;
  text-align: left; 
}
.register-box {
  display: flex;
  margin: 70px 200px;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
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
</style>