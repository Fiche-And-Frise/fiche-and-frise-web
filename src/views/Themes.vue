<template>
  <div>
    <h1>Themes page</h1>
    <v-row v-for="(theme, index) in allThemes" :key="index">
      {{ theme.name }}
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Themes",
  data: () => {
    return {
      allThemes: []
    }
  },
  methods: {

  },
  mounted() {
    window.addEventListener("resize", ()=> {
      this.screenWidth = window.innerWidth;
    })
    axios.get(process.env.VUE_APP_API_URL + "/themes")
        .then(response => {
          if(response.data){
            this.allThemes = response.data
          }
          console.log(response)
        }).catch(error => {
      console.log("Error : " + error);
    })
  }
}
</script>

<style scoped>

</style>
