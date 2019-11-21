<template>
  <v-app>
    <!-- <v-toolbar color="primary" dark style="height:10%">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>

        <router-link to="/">
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="variante1">Variante 1</v-btn>
        <v-btn text to="variante2">Variante 2</v-btn>
      </v-toolbar-items>
    </v-toolbar> -->

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch('fetchProductions');
  },
};
</script>
