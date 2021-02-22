<template>
  <div class="block-modale" v-if="revealNew">
    <div class="overlay"/>
    <v-card class="modale">
      <v-card-title>Création d'une fiche</v-card-title>
      <v-card-text>
        <v-text-field label="Nom de la fiche" v-model="title"/>
        <v-select label="Theme" :items="themeNames" v-model="selectedTheme"/>
        <v-textarea rows="3" filled counter label="Recto" :rules="rules" v-model="recto"/>
        <v-textarea rows="3" filled counter label="Verso" :rules="rules" v-model="verso"/>
      </v-card-text>
      <v-divider/>
      <v-card-actions class="mt-2">
        <v-spacer/>
        <v-btn class="primary" :loading="creating" :disabled="!canSubmit" @click="createFiche">Créer</v-btn>
        <v-btn class="error" @click="toggleNew">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {createNewFiche} from "@/utils/fiches";
export default {
  name: 'NewFicheModale',
  props: ['revealNew', 'toggleNew', 'updateView'],
  data: () => {
    return {
      rules: [v => v.length <= 250 || "Maximum 250 caractères"],
      recto: '',
      verso: '',
      title: '',
      selectedTheme: '',
      creating: false,
      allThemes: [],
      themeNames: []
    }
  },
  computed: {
    canSubmit(){
      return this.title && this.selectedTheme
    }
  },
  methods:{
    createFiche(){
      this.creating = true;
      const theme = this.allThemes.find(t => t.name === this.selectedTheme);
      console.log(theme);
      const payload = {
        name: this.title,
        recto: this.recto,
        verso: this.verso,
        theme: theme
      }
      createNewFiche(payload)
          .then(response => {
            this.creating = false;
            console.log("La création s'est bien passée");
            console.log(response)
            this.updateView();
            this.toggleNew();
          }).catch(error => {
            console.log(error)
            this.creating = false;
          })
    }
  },
  mounted() {
    console.log("Dans le mount maintenant : ")
    this.$store.dispatch("getAllThemes")
      .then(response => {
        this.allThemes = response.data;
        this.allThemes.forEach(t => {
          if(t.name) {
            this.themeNames.push(t.name);
          }
      })
        console.log(this.themeNames);
      })
      .catch(error => console.log(error))
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
  width: 50%;
  top: 10%;
  bottom: 10%;
}
@media (max-width: 1000px) {
  .modale{
    width: 70%;
  }
}
@media (max-width: 600px) {
  .modale{
    width: 90%;
  }
}


.btn-modale{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
