<template>
  <div class="container pt-2">
    <div class="heading-container row">
      <div class="col-sm-6">
        <h4 style="text-align: left" class="text-muted">
          <strong>Top Rated movies</strong>
        </h4>
      </div>
      <div class="col-sm-6 d-flex" style="justify-content: end">
        <button v-b-modal.modal-xl class="btn btn-color ml-auto">
          <b-icon-filter scale="2"></b-icon-filter
          ><span class="pl-3">Filter</span>
        </button>
      </div>
    </div>
    <div class="pb-4 pt-2 pagination-div">
      <ul id="pagination">
        <li><a class="" @click="NavigateToFirstPage">«</a></li>
        <li v-for="pageNumber in pageNumbers" :key="pageNumber">
          <a :id="pageNumber" @click="NavigateToSelectedPage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li><a @click="NavigateToLastPage">»</a></li>
      </ul>
    </div>
    <div
      v-if="this.movies !== undefined && this.movies.length !== 0"
      class="row pr-3 pl-3 w-100"
    >
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 hover-blank-color"
        v-for="movie in this.movies"
        :key="movie.id"
      >
        <MovieCard
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
      </div>
    </div>
    <div v-else class="col-sm-12 col-lg-12 col-md-12 col-xl-12">
      <img src="../assets/notfound.png" class="responsive" />
      <h5 class="text-muted">
        Oops! Looks like that is an extraordinary filter date combination. Let's
        try some other date! :)
      </h5>
    </div>
    <b-modal
      id="modal-xl"
      size="xl"
      title="Filter on Date Released"
      :no-close-on-backdrop="true"
    >
      <div class="row">
        <div class="col-sm-6">
          <label for="fromdatepicker">Select from date</label
          ><b-form-datepicker
            id="fromdatepicker"
            v-model="fromDate"
            :max="new Date()"
            class="mb-2 datePicker"
          ></b-form-datepicker>
        </div>
        <div class="col-sm-6">
          <label for="todatepicker">Select to date</label
          ><b-form-datepicker
            id="todatepicker"
            v-model="toDate"
            :min="fromDate"
            :max="new Date()"
            class="mb-2 datePicker"
          ></b-form-datepicker>
        </div>
      </div>
      <template #modal-footer="{ ok, cancel }">
        <b-button
          size="sm"
          variant="success"
          @click="
            () => {
              NavigateToFirstPage();
              ok();
            }
          "
        >
          Filter
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import { eventBus } from "../main";
export default {
  name: "Dashboard",
  components: { MovieCard },
  data() {
    return {
      modal: false,
      dropdown: { height: 0 },
      movies: [],
      selectedPage: 1,
      pageNumbers: [],
      paginationTopLimit: 500,
      paginationBottomLimit: 1,
      toDate: this.$toDate,
      fromDate: this.$fromDate,
    };
  },
  watch: {
    fromDate() {
      this.toDate = new Date();
    },
  },
  methods: {
    async NavigateToFirstPage() {
      this.$fromDate = this.fromDate;
      this.$toDate = this.toDate;
      this.$store.commit("setFromDate", this.fromDate);
      this.$store.commit("setToDate", this.toDate);
      await this.NavigateToSelectedPage(this.paginationBottomLimit);
    },
    async NavigateToLastPage() {
      await this.NavigateToSelectedPage(this.paginationTopLimit);
    },
    async NavigateToSelectedPage(page) {
      eventBus.$emit("showLoader");
      await this.FetchMovies(page);
      let selectedOldPageNumber = document.getElementById(this.selectedPage);
      if (selectedOldPageNumber != undefined)
        selectedOldPageNumber.classList.remove("active");

      let selectedPageNumber = document.getElementById(page);
      if (selectedPageNumber != undefined)
        selectedPageNumber.classList.add("active");
      this.selectedPage = page;
      eventBus.$emit("hideLoader");
    },
    async FetchMovies(page) {
      await fetch(
        this.$apiBaseUrl +
          "top_rated?api_key=" +
          this.$apiToken +
          "&language=en-US&page=" +
          page +
          "&primary_release_date.gte=" +
          this.FormatDate(this.fromDate) +
          "&primary_release_date.lte=" +
          this.FormatDate(this.toDate)
      )
        .then((_) => _.json())
        .then((data) => {
          this.movies = data.results;
          this.paginationTopLimit = data.total_pages;
          if (this.paginationTopLimit === 0) this.paginationTopLimit = 1;
          this.FillPageNumbers(page - 3, page + 3);
        });
    },
    FormatDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString("default", { day: "2-digit" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const year = date.toLocaleString("default", { year: "numeric" });
      return year + "-" + month + "-" + day;
    },
    FillPageNumbers(start, end) {
      this.pageNumbers = [];
      if (start < this.paginationBottomLimit) {
        start = this.paginationBottomLimit;
        end = this.paginationBottomLimit + 6;
      }
      if (end > this.paginationTopLimit) {
        end = this.paginationTopLimit;
        if (end <= 7) start = this.paginationBottomLimit;
        else start = end - 6;
      }
      for (let iterator = start; iterator <= end; iterator++)
        this.pageNumbers.push(iterator);
    },
  },
  async mounted() {
    this.fromDate = this.$store.state.fromDate;
    this.toDate = this.$store.state.toDate;
    this.FillPageNumbers(
      this.paginationBottomLimit,
      this.paginationBottomLimit + 6
    );
    await this.NavigateToFirstPage();
  },
};
</script>

<style scoped>
.responsive {
  max-width: 50%;
  height: auto;
}
.datePicker {
  height: 40px;
}
.pagination-div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.page-header {
  text-align: center;
  font-size: 1.5em;
  font-weight: normal;
  border-bottom: 1px solid #ddd;
  margin: 30px 0;
}
#pagination {
  margin: 0;
  padding: 0;
  text-align: center;
}
#pagination li {
  display: inline;
}
#pagination li a {
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
}

#pagination li a {
  border-radius: 5px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
#pagination li a.active {
  background-color: #fc7b54;
  color: #fff;
}
#pagination li a:hover:not(.active) {
  background-color: #ddd;
}

.heading-container {
  width: 100%;
  padding: 10px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}
/* .hover-blank-color {
  max-width: 250px !important;
} */
.hover-blank-color:hover {
  text-decoration: none;
  color: gray;
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