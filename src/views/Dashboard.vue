<template>
  <div class="container">
    <div class="d-flex">
      <transition-group name="company" tag="ul" class="content__list">
        <MovieCard
          v-for="movie in this.movies"
          class="hover-blank-color"
          :key="movie.id"
          :movieId="movie.id"
          :movieName="movie.title"
          :releaseDate="movie.release_date"
          :popularity="movie.popularity"
          :moviePosterURL="
            'https://image.tmdb.org/t/p/w500/' + movie.poster_path
          "
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
export default {
  name: "Dashboard",
  components: { MovieCard },
  data() {
    return {
      modal: false,
      dropdown: { height: 0 },
      movies: [],
    };
  },
  created() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=11004c5dda64d0bae607c7af2636e983&language=en-US&page=1"
    )
      .then((_) => _.json())
      .then((data) => (this.movies = data.results));
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}
.hover-blank-color:hover {
  text-decoration: none;
  color: gray;
}
.dropdown {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height 3s;
}
.dropdown::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0));
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
.dropdown-leave,
.dropdown-enter-to {
  opacity: 1;
}
.dropdown-enter-active,
.dropdown-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 3s ease-in-out;
}
.dropdown-enter-active {
  transition-delay: 3s;
}
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 350ms;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-leave,
.modal-enter-to {
  opacity: 1;
}
.modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 500px;
  min-height: 250px;
  padding: 1.5rem 1rem;
  background-color: white;
  border: 1px solid #c5d0d1;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0.5rem 1.75rem -0.25rem rgba(61, 83, 88, 0.4);
}
.modal__title {
  font-weight: 400;
  font-size: 1.5rem;
}
.modal__link {
  margin-top: 1.5rem;
  position: relative;
  font-size: 1.2rem;
  font-weight: 300;
  z-index: 0;
}
.modal__link::after {
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  z-index: -1;
  transition: background-color 225ms ease-out;
}
.modal__link:hover::after {
  background-color: #46d2c4;
}
.modal__close {
  position: absolute;
  top: 0.25rem;
  right: 1rem;
  font-size: 1.75rem;
  font-weight: 400;
  opacity: 0.5;
  transition: opacity 150ms ease-out;
}
.modal__close:hover {
  opacity: 1;
}
ul {
  margin: 0 !important;
  padding: 0 !important;
}
</style>