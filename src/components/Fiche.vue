<template>
  <div class="flipper">
    <v-card class="fixedHeight front">
        <v-card-title @click="toggleCard">{{ fiche.name }}</v-card-title>
        <v-card-text @click="toggleCard">{{ flipped ? fiche.verso : fiche.recto }}</v-card-text>
        <v-divider/>
        <v-card-actions><v-btn class="ma-2 primary">Modifier</v-btn><v-btn class="ma-2 error" @click="deleteFiche">Supprimer</v-btn></v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'
const flipTransition = createSimpleTransition('flip-transition')
Vue.component('flip', flipTransition)
export default {
  name: "Fiche",
  props: {
    fiche: Object
  },
  data: () => {
    return {
      flipped: false
    }
  },
  methods: {
    toggleCard(){
      this.flipped = !this.flipped
    },
    deleteFiche(){
      confirm("Supprimer cette fiche ?");
    }
  }
}
</script>

<style scoped>
.fixedHeight{
  height: fit-content;
}

</style>
