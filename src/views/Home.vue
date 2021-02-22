<template>
  <div>
    <h1 class="mt-5">Bienvenue sur Fiche&Frise {{ this.$store.state.user }} !</h1>
    <h2>Prêt à réviser ?</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {

    }
  },
  methods: {

  },
  mounted() {
    //let url = process.env.VUE_APP_API_URL;
    this.$store.dispatch("getAllThemes")
        .then(response => {
          if(response && response.data){
            this.$store.dispatch("setThemes", response.data)
          }
        }).catch(error => {
          console.log(error)
    })
  }
}
</script>

<style scoped>
h1, h2{
  text-align: center;
}
</style>
