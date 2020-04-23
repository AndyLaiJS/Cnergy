<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
  components: {

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
  color: black;
}
* {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
*::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
</style>