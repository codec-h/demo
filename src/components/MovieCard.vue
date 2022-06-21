<template>
  <div class="movie-card" @click="route(movieId)" :to="'/movie/' + movieId">
    <img class="movie-header" :src="moviePosterURL" />
    <div class="movie-content">
      <div class="movie-content-header"></div>
      <div class="movie-info">
        <div class="info-section">
          <label>Date Released</label>
          <span>{{ formatDate(new Date(releaseDate)) }}</span>
        </div>
        <div class="info-section">
          <label>Popularity</label>
          <span>{{ popularity }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: [
    "movieName",
    "releaseDate",
    "popularity",
    "movieId",
    "moviePosterURL",
  ],
  methods: {
    formatDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString("default", { day: "2-digit" });
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.toLocaleString("default", { year: "numeric" });
      return day + " " + month + " " + year;
    },
    route(movieId) {
      this.$router.push("/movie/" + movieId);
    },
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
.movie-card {
  background: #fff;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 245px;
  max-height: 800px;
  margin: 2em auto;
  border-radius: 10px;
  display: inline-block;
}
.movie-header {
  padding: 0;
  margin: 0;
  height: 300px;
  width: 100%;
  display: block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.bladeRunner2049 {
  background: url("http://cdn.collider.com/wp-content/uploads/2017/05/blade-runner-2049-poster-ryan-gosling.jpeg");
  background-size: cover;
  background-position: 100% 80%;
}
.header-icon-container {
  position: relative;
}
.header-icon {
  width: 100%;
  height: 367px;
  line-height: 367px;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
  color: #fff;
  font-size: 38px;
  text-shadow: 0px 0px 20px #6abcea, 0px 5px 20px #6abcea;
  opacity: 0.85;
}
.header-icon:hover {
  background: rgba(0, 0, 0, 0.15);
  font-size: 38px;
  text-shadow: 0px 0px 20px #6abcea, 0px 5px 30px #6abcea;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  opacity: 1;
}
.movie-card:hover {
  cursor: pointer;
  transform: scale(1.03);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
}
.movie-content {
  padding: 18px 18px 24px 18px;
  margin: 0;
}
.movie-content-header,
.movie-info {
  display: table;
  width: 100%;
}
.movie-title {
  font-size: 16px;
  margin: 0;
  display: table-cell;
}
.movie-info {
  margin-top: 1em;
}
.info-section {
  display: table-cell;
  text-transform: uppercase;
  text-align: center;
}
.info-section:first-of-type {
  text-align: left;
}
.info-section:last-of-type {
  text-align: right;
}
.info-section label {
  display: block;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5em;
  font-size: 9px;
}
.info-section span {
  font-weight: 700;
  font-size: 11px;
}
@media screen and (max-width: 500px) {
  .movie-card {
    width: 95%;
    max-width: 245px;
    margin: 1rem auto;
    display: block;
  }
  .container {
    padding: 0;
    margin: 0;
  }
}
</style>