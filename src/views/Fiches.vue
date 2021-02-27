<template>
  <div>
    <v-btn color="secondary" class="mb-5" @click="toggleNew">Ajouter une fiche</v-btn>
    <v-row>
      <v-col :class="nbCols" v-for="(fiche, index) in allFiches" :key="index">
        <v-btn block @click="toggleFiche(fiche)">{{ fiche.name }}</v-btn>
      </v-col>
    </v-row>
    <transition name="fade">
      <NewFicheModale :update-view="updateView" :revealNew="revealNew" :toggle-new="toggleNew" :allThemes="allThemes"/>
    </transition>
    <transition name="fade">
      <FicheModale :fiche="selectedFiche"
                   :revealFiche="revealFiche"
                   :toggle-fiche="toggleFiche"
                   :update-view="updateView"/>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true
//import chunk from "chunk"
import NewFicheModale from "@/components/NewFicheModale";
import FicheModale from "@/components/FicheModale";
import {mapGetters} from 'vuex'
export default {
  name: "Fiches",
  components: {
    NewFicheModale,
    FicheModale
  },
  data: () => {
    return {
      allFiches: [],
      screenWidth: screen.width,
      revealNew: false,
      revealFiche: false,
      selectedFiche: null,
      allThemes: []
    }
  },
  computed: {
    ...mapGetters(["getThemes"]),
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
  },
  methods: {
    toggleNew(){
      this.revealNew = !this.revealNew;
    },
    toggleFiche(fiche){
      this.selectedFiche = fiche;
      this.revealFiche = !this.revealFiche;
    },
    updateView(){
      axios.get(process.env.VUE_APP_API_URL + "/fiches")
          .then(response => {
            if(response.data){
              this.allFiches = response.data
            }
            console.log(response)
          }).catch(error => {
        console.log("Error : " + error);
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("getAllThemes")
        .then(response => {
          if(response && response.data){
            console.log("Récupération des thèmes")
            console.log(response)
            this.allThemes = response.data;
            console.log(this.allThemes);
          }
        }).catch(error => {
      console.log(error)
    })
  },
  mounted() {
    this.$store.dispatch("getAllThemes").then(response => this.allThemes = response.data)
    window.addEventListener("resize", ()=> {
      this.screenWidth = window.innerWidth;
      });
    axios.get(process.env.VUE_APP_API_URL + "/fiches")
        .then(response => {
          if(response.data){
            this.allFiches = response.data
          }
          console.log(response)
        }).catch(error => {
          console.log("Error : " + error);
    });
  },
  watch:{
    revealNew: function (){
      if(this.revealNew){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    },
    revealFiche: function (){
      if(this.revealFiche){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
