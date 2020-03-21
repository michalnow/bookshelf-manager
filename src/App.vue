<template>
  <v-app>
    <div id="app">
      <Navbar/>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

