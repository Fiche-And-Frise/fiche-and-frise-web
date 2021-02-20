<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer temporary app v-model="sideNav">
        <v-list v-for="item in menuItems" :key="item.icon">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content><v-btn text :to="item.link">{{ item.title }}</v-btn></v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content><v-btn text @click="logout"></v-btn></v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon color="orange" class="hidden-sm-and-up"
                            @click="sideNav =! sideNav"></v-app-bar-nav-icon>
        <v-toolbar-title style="cursor: pointer"
                         @click="$router.push('/')"
                         class="color_secondary mr-5">
          Fiche&Frise
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems" :key="item.title">
          <v-btn text style="color: #FF9800" class="ml-1" :to="item.link">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text style="color: #FF9800" class="ml-1" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <main>
        <router-view/>
      </main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data: () => ({
    sideNav: false,
    menuItems: [
      {icon: 'mdi-text-box', title: 'Fiches', link: '/fiches'},
      {icon: 'mdi-align-horizontal-left', title: 'Frises', link: '/frises'},
      {icon: 'T', title: 'Themes', link: '/themes'},
      //{icon: 'mdi-logout', title: "Se déconnecter", link: '/logout'}
    ]
  }),
  methods: {
    logout(){
      this.$store.dispatch('authLogout').then(() => {
        this.$router.push('/login')
      })
    }
  },
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("authLogout");
          this.$router.push('/login');
        }
        throw err;
      });
    });
  }
};
</script>

<style>
.color_secondary{
  color: #FF9800;
}

main{
  padding-top: 90px;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
