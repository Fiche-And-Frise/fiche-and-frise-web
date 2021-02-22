<template>
  <div class="flipper">

  </div>
</template>

<script>

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
.modale{
  background: #f1f1f1;
  color: #333;
  position: fixed;
  width: 50%;
  top: 10%;
  bottom: 10%;
}
</style>
