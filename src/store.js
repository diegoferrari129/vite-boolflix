import { reactive } from "vue";
export const store = reactive({
    apiMovies: 'https://api.themoviedb.org/3/search/movie?query=harry+potter&api_key=198b31d198bf714f14e2b9df45bc7311',
    movies: [],
    searchQuery: '',
    filteredMovies: [],

    apiSeries: 'https://api.themoviedb.org/3/search/tv?query=expanse&api_key=198b31d198bf714f14e2b9df45bc7311',
    series: [],
    filteredSeries: [],
});