<template>
  <div>
    <v-app-bar app color="primary">
      <v-toolbar-title class="color_secondary">Fiche&Frise</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-card class="mx-auto mt-10 logCard">
        <v-card-title>Inscription</v-card-title>
        <v-card-text>
          <v-text-field label="Identifiant" prepend-icon="mdi-account-circle" v-model="username" @keypress.enter="register"/>
          <v-text-field label="Mot de passe"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        @keypress.enter="register"/>
          <v-text-field label="Confirmation"
                        v-model="validatePass"
                        :type="showPasswordBis ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPasswordBis ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPasswordBis = !showPasswordBis"
                        @keypress.enter="register"/>
          <p class="ml-2 isError" v-if="error">{{ error }}</p>
          <v-btn color="primary" class="ml-1 mb-3" :disabled="!canRegister" @click="register">S'inscrire</v-btn>
          <p>Déjà inscrit ? Connectez-vous <router-link to="/login">ici</router-link></p>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Register",
  data: () => ({
    showPassword: false,
    showPasswordBis: false,
    username: '',
    password: '',
    validatePass: '',
    error: '',
  }),
  methods:{
    register: function () {
      if(!this.canRegister)
        return;
      if(this.password !== this.validatePass){
        this.error = 'Les deux mots de passes sont différents';
        return;
      }
      this.error = '';
      const { username, password } = this;
      this.$store.dispatch('registerRequest', { username, password }).then((response) => {
        console.log(response);
        this.$router.push('/login')
      }).catch(error => {
        console.log(error)
        if(!error.response){
          this.error = "Connexion au serveur échouée"
        } else {
          switch (error.response.status){
            case 400:
              this.error = "Cet identifiant est déjà pris"
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
    canRegister(){
      return this.username && this.password && this.validatePass;
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
