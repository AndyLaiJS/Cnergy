<template>
    <div class="register-container">

      <div class="register-box">
        <div class="doodle">
          REGISTER @ CUHK
        </div>
        <div class="reg-content">
          <form class="reg-form">

            <router-link to="/home"><button class="lgn">Register</button></router-link>

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

.v-select__selections {
  height: 90px !important;
  background-color: black;
}
.v-text-field {
  padding-top: 45px;
}
.register-box {
  display: flex;
  margin: 50px 100px;
  background-color: rgb(247, 247, 247);
}
.doodle {
  flex: 1;
}
.reg-content {
  flex: 1;
}
</style>