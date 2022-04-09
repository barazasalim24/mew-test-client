<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/weather_48px.png"
          transition="scale-transition"
          width="40"
        />
        WeatherMan
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main color="blue">
      <Weather/>
    </v-main>
  </v-app>
</template>

<script>
import Weather from './components/Weather';

export default {
  name: 'App',

  components: {
    Weather,
  },

  data: () => ({
    //
  }),
};
</script>
