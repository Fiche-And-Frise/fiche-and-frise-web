<template>
  <div>
    <v-btn color="secondary" class="mb-5" @click="toggleModal">Ajouter une fiche</v-btn>
    <v-row>
      <v-col :class="nbCols" v-for="(fiche, index) in allFiches" :key="index"><Fiche :fiche="fiche"/></v-col>
    </v-row>
    <Modale :reveal="reveal" :toggle-modale="toggleModal"/>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true
//import chunk from "chunk"
import Fiche from "@/components/Fiche";
import Modale from "@/components/Modale";

export default {
  name: "Fiches",
  components: {
    Fiche,
    Modale
  },
  data: () => {
    return {
      allFiches: [],
      screenWidth: screen.width,
      reveal: false
    }
  },
  computed: {
    totalFiches(){
      return this.allFiches.length
    },
    nbCols(){
      if(this.screenWidth > 1200 )
        return 'col-3';
      if(this.screenWidth > 900)
        return 'col-4'
      if(this.screenWidth > 600)
        return 'col-6'
      return 'col-12'
    },
    /*chunkFiches(){
      return chunk(this.allFiches, this.nbCols)
    }*/
  },
  methods: {
    toggleModal(){
      this.reveal = !this.reveal;
    }
  },
  mounted() {
    window.addEventListener("resize", ()=> {
      this.screenWidth = window.innerWidth;
      })
    axios.get("http://localhost:8081/fiches")
        .then(response => {
          if(response.data){
            this.allFiches = response.data
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
