<template>
  <div class="block-modale" v-if="revealFiche">
    <div class="overlay" @click="toggleFiche"/>
    <div class="modale">
      <h2>{{ fiche.name }}</h2>
      <div @click="toggleCard" class="ficheContent">
        <transition name="slide-fade" mode="out-in">
          <p v-if="flipped" key="recto">{{ fiche.verso }}</p>
          <p v-else key="verso">{{ fiche.recto }}</p>
        </transition>
      </div>
      <div class="actions">
        <v-btn v-bind="size" class="ma-2 primary"><v-icon v-if="size.small">mdi-pencil</v-icon>{{ size.small ? '' : 'Modifier' }}</v-btn>
        <v-btn v-bind="size" class="ma-2 error" @click="deleteFiche"><v-icon v-if="size.small">mdi-delete</v-icon>{{ size.small ? '' : 'Supprimer' }}</v-btn></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {deleteFiche} from "@/utils/fiches";

export default {
  name: 'FicheModale',
  props: ['revealFiche', 'toggleFiche', 'fiche', 'updateView'],
  data: () => {
    return {
      rules: [v => v.length <= 250 || "Maximum 250 caractères"],
      recto: '',
      verso: '',
      title: '',
      selectedTheme: '',
      flipped: false,
    }
  },
  computed: {
    ...mapGetters(['getThemes']),
    themeNames(){
      let names = [];
      this.getThemes.forEach(t => names.push(t.name))
      return names;
    },
    canSubmit(){
      return this.title && this.selectedTheme
    },
    size () {
      const size = {xs:'small',sm:'medium', md:'medium', lg:'large',xl:'large'}[this.$vuetify.breakpoint.name];
      console.log(size ? { [size]: true } : {});
      return size ? { [size]: true } : {}
    }
  },
  methods: {
    toggleCard(){
      this.flipped = !this.flipped
    },
    deleteFiche(){
      if(confirm("Supprimer cette fiche ?")){
        deleteFiche(this.fiche.id)
        .then(response => {
          console.log("Suppression")
          console.log(response);
          this.updateView();
          this.toggleFiche();
        })
        .catch(error => console.log(error));
      }
    }
  }
}
</script>

<style scoped>
.block-modale{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay{
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modale{
  background: #f1f1f1;
  color: #333;
  position: fixed;
  width: 40%;
  top: 20%;
  bottom: 20%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
}
@media (max-width: 1000px) {
  .modale{
    width: 60%;
  }
}
@media (max-width: 600px) {
  .modale{
    width: 80%;
  }
}

.ficheContent{
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
}

h2{
  text-align: center;
}

p{
  margin-top: 2rem;
  text-align: center;
}
.actions{

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
