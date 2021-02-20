<template>
  <div class="block-modale" v-if="reveal">
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
      <v-card-actions class="mt-3">
        <v-spacer/>
        <v-btn class="primary">Créer</v-btn>
        <v-btn class="error" @click="toggleModale">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Modale',
  props: ['reveal', 'toggleModale'],
  data: () => {
    return {
      rules: [v => v.length <= 250 || "Maximum 250 caractères"],
      recto: '',
      verso: '',
      title: '',
      selectedTheme: ''
    }
  },
  computed: {
    ...mapGetters(['getThemes']),
    themeNames(){
      let names = [];
      this.getThemes.forEach(t => names.push(t.name))
      return names;
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
