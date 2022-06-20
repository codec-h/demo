<template>
  <div id="app">
    <NavbarHeader class="mb-4" />
    <div id="body">
      <router-view></router-view>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
  </div>
</template>

<script>
import NavbarHeader from "./header/NavbarHeader.vue";

export default {
  name: "App",
  components: {
    NavbarHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* @media(max-width:500px) {
  #body{
    padding-top: 60px;
  }
  
} */
</style>
