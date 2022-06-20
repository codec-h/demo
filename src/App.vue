<template>
  <div id="app">
    <NavbarHeader class="mb-4" />
    <div id="body">
      <router-view></router-view>
    </div>
    <loading
      :active="this.loading"
      :is-full-page="true"
      :loader="spinnerType"
      :opacity="0.9"
      color="#fc7b54"
      :height="150"
      :width="150"
    />
  </div>
</template>

<script>
import NavbarHeader from "./header/NavbarHeader.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { eventBus } from "./main";

export default {
  name: "App",
  components: {
    NavbarHeader,
    Loading,
  },
  data() {
    return {
      spinnerType: "dots",
      loading: false,
    };
  },
  created() {
    this.$store.commit(
      "setFromDate",
      new Date(
        new Date().getFullYear() - 1,
        new Date().getMonth(),
        new Date().getDate()
      )
    );
    this.$store.commit("setToDate", new Date());
    eventBus.$on("showLoader", () => {
      this.loading = true;
    });
    eventBus.$on("hideLoader", () => {
      setTimeout(() => {
        this.loading = false;
      }, 200);
    });
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
.btn-color {
  background-color: #fc7b54 !important;
  color: white !important;
  margin: 5px !important;
  padding: 10px 10px 6px 15px !important;
}
/* @media(max-width:500px) {
  #body{
    padding-top: 60px;
  }
  
} */
</style>
