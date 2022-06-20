<template>
  <div v-if="this.movieDetail != undefined">
    <div
      id="content_hero"
      class="center-content hero-ontop"
      :style="{
        'background-image':
          'url(https://image.tmdb.org/t/p/original/' +
          this.movieDetail.backdrop_path +
          ')',
      }"
    >
      <div class="container">
        <div
          class="row blurb scrollme animateme"
          data-when="exit"
          data-from="0"
          data-to="1"
          data-opacity="0"
          data-translatey="100"
        >
          <div class="col-md-9">
            <span class="title">{{
              this.movieDetail.genres.map((_) => _.name).join()
            }}</span>
            <h1>{{ this.movieDetail.title }}</h1>
            <p>
              {{ this.movieDetail.overview }}
            </p>
            <div class="buttons">
              <span class="certificate">PG</span>
              <button class="btn btn-default">
                <i class="fa fa-heart" aria-hidden="true"></i>
                Add to favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 row-margin">
      <div class="col-sm-12 mt-4">
        <h2 class="heading">Trailer & Clips</h2>
        <div class="row pr-3 pl-3 card-deck">
          <div
            class="col-sm-6 col-md-4 col-lg-3 col-xl-2"
            v-for="trailer in this.movieTrailerDetail"
            :key="trailer.key"
            @click="viewTrailer(trailer.key)"
          >
            <div class="card pr-2 pl-2" style="margin: 10px">
              <img
                class="card-img-top thumbnail"
                :src="
                  'https://img.youtube.com/vi/' +
                  trailer.key +
                  '/maxresdefault.jpg'
                "
                :alt="trailer.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ trailer.name }}</h5>
              </div>
              <div
                class="card-footer button-play"
                @click="viewTrailer(trailer.key)"
              >
                <b-icon-youtube
                  style="color: red"
                  class="mr-2"
                ></b-icon-youtube>
                Watch Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- copy this stuff and down -->
    <div id="video-popup-overlay" v-if="showTrailer"></div>
    <div id="video-popup-container" v-if="showTrailer">
      <div class="d-flex justify-content-end close">
        <span
          @click="
            () => {
              showTrailer = false;
            }
          "
          ><b-btn-close></b-btn-close
        ></span>
      </div>
      <LazyYoutube
        class=""
        max-width="100%"
        style="border-radius: 7px;width=100%"
        :src="'https://www.youtube.com/watch?v=' + this.selectedTrailer"
      />
      <!-- <div id="video-popup-iframe-container"></div> -->
    </div>
  </div>
</template>

<script>
import { LazyYoutube } from "vue-lazytube";
export default {
  name: "Movie",
  components: { LazyYoutube },
  created() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.$route.params.id +
        "?api_key=11004c5dda64d0bae607c7af2636e983&language=en-US"
    )
      .then((_) => _.json())
      .then((_) => {
        this.movieDetail = _;
        this.getMovieTrailerDetail(this.movieDetail.id);
      });
  },
  methods: {
    viewTrailer(trailerKey) {
      this.selectedTrailer = trailerKey;
      this.showTrailer = true;
    },
    closeVideoPopUp() {
      this.showTrailer = false;
    },
    getMovieTrailerDetail(movieId) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?api_key=11004c5dda64d0bae607c7af2636e983&language=en-US"
      )
        .then((_) => _.json())
        .then((_) => {
          this.movieTrailerDetail = _.results;
        });
    },
    formatDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString("default", { day: "2-digit" });
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.toLocaleString("default", { year: "numeric" });
      return day + " " + month + " " + year;
    },
  },
  data() {
    return {
      movieDetail: {},
      isVideoLoaded: false,
      movieTrailerDetail: {},
      selectedTrailer: "",
      showTrailer: false,
    };
  },
};
</script>

<style scoped>
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.button-play {
  cursor: pointer;
}
.close {
  z-index: 1500;
  color: white;
  cursor: pointer;
}
@media (min-width: 1400px) {
  #video-popup-container {
    display: block;
    position: fixed;
    left: 0;
    top: 120px;
    z-index: 996;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 60%; /* Need a specific value to work */
    background-color: rgba(255, 255, 255, 0);
  }
}
@media (max-width: 1399px) {
  #video-popup-container {
    display: block;
    position: fixed;
    left: 0;
    top: 120px;
    z-index: 996;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 80%; /* Need a specific value to work */
    background-color: rgba(255, 255, 255, 0);
  }
}

#video-popup-close {
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -10px;
  z-index: 998;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  text-align: center;
  font-size: 12px;
  background-color: #000;
  line-height: 25px;
  color: #fff;
}

#video-popup-iframe-container {
  position: absolute;
  z-index: 997;
  width: 100%;
  padding-bottom: 56.25%;
  border: 2px solid #000;
  border-radius: 2px;
  background-color: #000;
}

#video-popup-iframe {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #000;
}

#video-popup-overlay {
  display: block;
  position: fixed;
  z-index: 995;
  top: 0;
  background-color: #000;
  opacity: 0.8;
  width: 100%;
  height: 100%;
}

#video-popup-close:hover {
  color: #de0023;
}

@import url("https://fonts.googleapis.com/css?family=Poppins");
@import url("https://fonts.googleapis.com/css?family=Montserrat");
.card-img-top {
  border-radius: 7px;
}
.card-deck {
  padding: 40px;
  justify-content: left;
}
.card-footer {
  background-color: white;
}
.card-deck .card {
  margin: 0 0 1rem;
  padding: 15px;
}
.card-title {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .card-deck .card {
    -ms-flex: 0 0 32%;
    flex: 0 1 32%;
  }
  .thumbnail {
    max-height: 390px;
  }
}

@media (min-width: 768px) and (max-width: 1499px) {
  .card-deck .card {
    -ms-flex: 0 0 24%;
    flex: 0 0 24%;
  }
  .thumbnail {
    max-height: 160px;
  }
}

@media (min-width: 1500px) {
  .card-deck .card {
    -ms-flex: 0 0 16%;
    flex: 0 0 18%;
  }
  .thumbnail {
    max-height: 180px;
  }
}

.heading {
  text-align: start;
  padding: 5px 20px;
}
.clip-title {
  text-align: center;
  margin-left: 10px;
}
.card-wrap {
  flex: 0 0 33.333%;
  display: flex;
  padding: 10px; /* gutter width */
}

.card {
  padding: 20px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  flex: 0 1 100% !important;
}
.row > [class*="col-"] {
  display: flex;
  flex-direction: column;
}
.hero {
  text-align: center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 445px;
}
.hero:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0.7;
}
.mv-single-hero {
  background-repeat: no-repeat;
  height: 598px;
}
.center-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: auto;
}
.hero-ontop {
  z-index: 1;
}
a,
a:active,
a:visited {
  cursor: pointer;
  transition: all 300ms ease-in-out;
  text-decoration: none;
  color: #ec7532;
  outline: none;
  box-shadow: none;
}
.btn {
  font-size: 13px;
  font-weight: normal;
  position: relative;
  overflow: hidden;
  width: auto;
  padding: 12px 24px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff;
  border-width: 2px;
  border-radius: 30px;
}
.btn i,
.btn:hover i {
  position: relative;
  z-index: 1;
  display: inline-flex;
  vertical-align: middle;
  color: #fff;
}
.btn-default {
  border: none;
  background-image: linear-gradient(to right, #fbbd61, #ec7532);
}
.btn-default span,
.btn-default span:hover,
.btn-ghost span:hover {
  position: relative;
  z-index: 1;
  color: #fff;
}
.btn-default:hover:before {
  width: 140%;
}
.btn-default:before,
.btn-ghost:before {
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -15px;
  width: 0;
  height: 100%;
  content: "";
  transition: 0.4s;
  transform: skewX(30deg);
  background: #ec7532;
}
.btn-primary {
  border: none;
  background: #ec7532;
}
.btn-ghost {
  transition: all 300ms ease-in-out;
  color: #ec7532;
  border-color: #ec7532;
  background: transparent;
}
.btn-ghost:hover span {
  color: #fff;
}
.btn-ghost:hover:before {
  z-index: -1;
  width: 140%;
}
.btn-ghost:hover {
  color: #fff;
}
button.btn-default,
button.btn-primary {
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  transition: all 300ms ease-in-out;
}
button.btn-default:before,
button.btn-primary:before {
  display: none;
}
button.btn-default:hover,
button.btn-primary:hover {
  color: #fff;
  background: #fbbd61;
}
a.arrow-button {
  font-size: 12px;
  position: relative;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #ec7532;
}
a.arrow-button:after {
  font-family: "Material Icons";
  font-weight: bold;
  position: absolute;
  top: -1px;
  content: "chevron_right";
  text-transform: none;
}
a.arrow-button:hover {
  color: #101010;
}
.star-rating {
  display: inline-block;
}
.star-rating i {
  font-size: 18px;
  display: inline-block;
  width: 18px;
  color: #fbbd61;
}
i.material-icons {
  display: inline-flex;
  vertical-align: middle;
}
#content_hero .scroll {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 50%;
  margin-left: -45px;
  animation: ScrollDown 1.5s infinite;
}
#content_hero:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  content: "";
  background-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%);
}
#content_hero .container .blurb {
  position: relative;
  width: 100%;
  margin-top: 50px;
  animation: Blurb 0.5s 0.5s forwards;
  text-align: left;
}
#content_hero .container .blurb h1 {
  font-size: 52px;
  font-weight: 300;
  padding: 0;
  animation: Heading 0.5s 0.5s forwards;
  letter-spacing: 3px;
  opacity: 0;
  color: #fff;
  border: none;
}
#content_hero .container .blurb p {
  font-size: 18px;
  color: #fff;
}
#content_hero .container .blurb .certificate {
  font-size: 13px;
  font-weight: bold;
  line-height: 43px;
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  transform: translateY(2px);
  text-align: center;
  color: #fff;
  border: solid 2px #fff;
  border-radius: 50%;
}
#content_hero {
  position: relative;
  transition: all 300ms ease-in-out;
  background-size: cover;
  background-repeat: no-repeat;
}
#content_hero:before {
  top: auto;
  height: 70%;
}
#content_hero .container .blurb {
  margin-top: 200px;
  margin-bottom: 100px;
}
#content_hero .container .blurb h1 {
  animation: none;
  opacity: 1;
}
#content_hero .buttons .btn {
  margin-right: 15px;
}
span.title {
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fbbd61;
}
.row-margin {
  margin: 0px !important;
}
</style>