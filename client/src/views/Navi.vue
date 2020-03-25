<template>
    <v-app>
        <div id="nav">
            <div class="navLogo">
                <img src="../assets/CUHK.png">
                <b>CUHK</b> MeePo
            </div>
            <div class="navLink">
                <router-link to="/">Clubs</router-link> 
                <router-link to="/">Activities</router-link> <span style="color: rgb(211, 211, 211);">|</span>
                <router-link to="/">Profile</router-link>
            </div>
        </div>
            <router-view/>
    </v-app>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
#nav {
  font-size: 25px;
  line-height: 80px;
  height: 80px;
  background-color: white;
  box-shadow: 0px 4px 4px -2px rgba(0,0,0,0.10);
  top: 0;
  position: sticky;
  position:-webkit-sticky;
  z-index: 9999;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: None;
  }
  a:hover {
    color: black;
  }
}
.navLogo {
  cursor: pointer;
  img {
    height: 30px;
    margin-top: 25px;
  }
  display: grid;
  grid-template-columns: 40px 78px 200px;
  justify-content: center;
  text-align: left;
  height: 60px;
  float: left;
  margin-left: 200px;
  transition: linear 0.1s;
}
.navLogo:active {
  transform: scale(0.97);
  transition: linear 0.1s;
}
.navLink {
  cursor: pointer;
  display: grid;
  text-align: center;
  grid-template-columns: 90px 150px 20px 120px;
  font-size: 18px;
  float: right;
  margin-right: 200px;
  justify-items: center;
}
</style>