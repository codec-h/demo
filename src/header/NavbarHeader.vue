<template>
  <header class="header" id="header">
    <nav class="navbar container">
      <div class="brand">
        <b-icon-film scale="1.5"></b-icon-film><span class="pl-3">Critics</span>
      </div>
      <div class="menu" id="menu">
        <ul class="menu-list">
          <li class="menu-item">
            <router-link to="/" class="row menu-link is-active">
              <div class="row d-flex margin-top-5">
                <b-icon-house scale="1.5" class="pr-3"></b-icon-house>
                <span class="menu-name pl-2">Home</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
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
.container {
  max-width: 75rem;
  height: auto;
  margin: 0 auto;
  padding: 0 1.25rem;
}
.brand {
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.15;
  color: #fc7b54;
  text-transform: uppercase;
}
.header {
  position: fixed;
  padding: 10px;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 80px !important;
  z-index: 100;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  -webkit-box-shadow: 0px 7px 12px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 7px 12px -11px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 7px 12px -11px rgba(0, 0, 0, 0.75);
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
}
.menu {
  position: fixed;
  left: 0;
  bottom: 0;
  display: grid;
  align-content: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background: white;
  -webkit-box-shadow: 0px -7px 12px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -7px 12px -11px rgba(0, 0, 0, 0.75);
  box-shadow: 0px -7px 12px -11px rgba(0, 0, 0, 0.75);
}
.menu-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7px 25px;
  margin-top: 10px;
  color: white !important;
  background-color: #fc7b54;
  border-radius: 12px;
  justify-content: center;
  border: none;
  outline: none;
}
.menu-link.is-active {
  position: relative;
  color: teal;
  transition: all 0.35s ease;
}
.menu-icon {
  font-size: 1.35rem;
  line-height: 1;
  color: inherit;
}
.menu-name {
  display: none;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  visibility: hidden;
  text-transform: capitalize;
}
@media only screen and (min-width: 360px) {
  .menu-name {
    display: block;
    visibility: visible;
  }
}
@media only screen and (min-width: 576px) {
  .menu-list {
    justify-content: center;
    column-gap: 3rem;
  }
}
@media only screen and (min-width: 768px) {
  .header {
    background: white;
    height: 90px;
    transition: all 0.35s ease-in-out;
  }
  .margin-top-5 {
    margin-top: 5px;
  }
  .menu {
    position: relative;
    top: 0;
    right: 0;
    align-self: end;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;
  }
  .menu-link:hover {
    color: teal;
    transition: all 0.35s ease;
  }
  .menu-icon {
    display: none;
    visibility: hidden;
  }
  .menu-name {
    list-style: none;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 0.2rem;
  }
}
</style>