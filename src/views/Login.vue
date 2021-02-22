<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title class="color_secondary">Fiche&Frise</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-card class="mx-auto mt-10 logCard">
        <v-card-title>Connexion</v-card-title>
        <v-card-text>
          <v-text-field label="Identifiant" prepend-icon="mdi-account-circle" v-model="username" @keypress.enter="login"/>
          <v-text-field label="Mot de passe"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        @keypress.enter="login"/>
          <p class="ml-2 isError" v-if="error">{{ error }}</p>
          <v-btn color="primary" class="ml-1 mb-3" :disabled="!canLogin" @click="login">Se connecter</v-btn>
          <p>Pas encore inscrit ? Enregistrez vous <router-link to="/about">ici</router-link></p>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

import {mapGetters} from "vuex";

export default {
  name: 'Login',

  data: () => ({
    showPassword: false,
    username: "",
    password: "",
    error: '',
  }),
  methods:{
    login: function () {
      if(!this.canLogin)
        return;
      this.error = '';
      const { username, password } = this;
      this.$store.dispatch('authRequest', { username, password }).then((response) => {
        console.log(response);
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
        if(!error.response){
          this.error = "Connexion au serveur échouée"
        } else {
          switch (error.response.status){
            case 401:
              this.error = "Mauvais identifiants"
              break;
            default:
              this.error = "Une erreur est survenue"
          }
        }
      })
    }
  },
  computed:{
    ...mapGetters(['authStatus']),
    canLogin(){
      return this.username && this.password && this.authStatus !== 'loading';
    }
  }
};
</script>

<style scoped>
@media (max-width: 799px) {
  .logCard {
    width: 80%;
  }
}

@media (min-width: 800px) {
  .logCard {
    width: 50%;
  }
}
.color_secondary{
  color: #FF9800;
}

.isError{
  color: #ff0033;
}
</style>
