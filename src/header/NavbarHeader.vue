<template>
  <div class="navigation-wrap bg-light start-header start-style">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-md navbar-light">
            <router-link to="/" class="navbar-brand"
              ><b-icon-film scale="1.7" style="color: #fc7b54"></b-icon-film
              ><span class="ml-3" style="color: #fc7b54">Critics</span>
            </router-link>

            <button
              class="navbar-toggler"
              type="button"
              @click="toggleResponsiveMenu"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto py-4 py-md-0">
                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                  <router-link
                    to="/"
                    active-class="active-menu"
                    class="nav-link"
                    >Home</router-link
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarHeader",
  methods: {
    toggleResponsiveMenu() {
      let responsiveMenuDocument = document.getElementById(
        "navbarSupportedContent"
      );
      if (responsiveMenuDocument != undefined) {
        if (responsiveMenuDocument.classList.contains("show"))
          responsiveMenuDocument.classList.remove("show");
        else responsiveMenuDocument.classList.add("show");
      }
    },
  },
};
</script>

<style scoped>
.start-header {
  opacity: 1;
  transform: translateY(0);
  padding: 20px 0;
  box-shadow: 0 10px 30px 0 rgba(138, 155, 165, 0.15);
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.start-header.scroll-on {
  box-shadow: 0 5px 10px 0 rgba(138, 155, 165, 0.15);
  padding: 10px 0;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.start-header.scroll-on .navbar-brand img {
  height: 24px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.navigation-wrap {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.navigation-wrap .container {
  margin-top: -10px;
}
.navbar {
  padding: 0;
}
.navbar-brand img {
  height: 28px;
  width: auto;
  display: block;
  filter: brightness(10%);
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.navbar-toggler {
  float: right;
  border: none;
  padding-right: 0;
}
.active-menu {
  color: white !important;
  background-color: #fc7b54;
  border-radius: 10px;
  padding: 7px 10px !important;
}
.navbar-toggler:active,
.navbar-toggler:focus {
  outline: none;
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:after {
  transform: rotate(45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:before {
  transform: translateY(8px) rotate(-45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
  border-color: transparent;
}
.nav-link {
  font-weight: 500;
  transition: all 200ms linear;
}
.nav-link {
  position: relative;
  display: inline-block;
}

.nav-item {
  position: relative;
  transition: all 200ms linear;
}

/* #Primary style
================================================== */

.bg-light {
  background-color: #fff !important;
  transition: all 200ms linear;
}
.section {
  position: relative;
  width: 100%;
  display: block;
}
.full-height {
  height: 100vh;
}
.over-hide {
  overflow: hidden;
}
.row {
  margin: 0 !important;
}
</style>