<template>
  <v-app>
    <div class="home">
      <div class="homeContainer">
        <h1 id="title"> BASED ON YOUR INTERESTS</h1>

        <v-carousel
          cycle
          height="600"
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <div class="CardContainer">
          <div class="cna">
            <h1>Clubs</h1>
          </div>
          <div class="Card" v-for="(value, index) in testvalues" v-bind:key = "index">
            {{ value }}
          </div>
        </div>

        <div class="CardContainer">
          <div class="cna">
            <h1>Activities</h1>
          </div>
          <div class="Card" v-for="(value, index) in testvalues" v-bind:key = "index">
            {{ index }}
          </div>
        </div>

      </div>
      <thefooter/>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import thefooter from "./Footer"
export default {
  data() {
    return {
      testvalues: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  components: {
    thefooter,
  }
}
</script>

<style scoped>
h1, h2, h3 {
  color: black;
  font-weight: 600;
  margin: 0;
}
#title {
  margin: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-weight: 600;
  color: black;
  font-size: 40px;
}
.homeContainer {
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 0 100px 0;
  background-image: url("../assets/bolt.png");
  background-repeat: no-repeat;
}
.CardContainer {
  min-height: 300px;
  max-height: 510px;
  overflow: auto;
}
.cna {
  top: 0;
  position: sticky;
  z-index: 999;
  background-color: white;
}
.Card {
  background-color: white;
  min-width: 50px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px; 
  width: 500px;
  padding: 55px 0;
  box-shadow: 0 0 3px rgba(0,0,0,0.10);
  transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
  position: relative;
  overflow: hidden;
}
.Card:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.10);
  transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
}
</style>
