import { reactive } from "vue";
export const store = reactive({
    apiMovies: 'https://api.themoviedb.org/3/search/movie?api_key=198b31d198bf714f14e2b9df45bc7311&query=',
    movies: [],

    apiSeries: 'https://api.themoviedb.org/3/search/tv?api_key=198b31d198bf714f14e2b9df45bc7311&query=',
    series: [],

    searchQuery: '',

});