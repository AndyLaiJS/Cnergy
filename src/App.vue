<template>
  <v-app id="app">
    <Login/>
    
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Login from './views/Login';

export default {
  components: {
    Login,
  }

}
</script>

<style lang="scss">
.v-application--wrap {
  min-height: 0 !important;
}

@import url('https://fonts.googleapis.com/css?family=Poppins:400,600,700,800,900&display=swap');
body {
  margin: 0;
}
#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
}

</style>