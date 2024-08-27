<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    created() {
        this.getMovies()
        this.getSeries()
    },

    methods: {
        // CHIAMATA API
        // movies
        getMovies() {
            axios.get(store.apiMovies).then((result) => {
                store.movies = result.data.results;
            });
        },
        // TV series
        getSeries() {
            axios.get(store.apiSeries).then((result) => {
                store.series = result.data.results;
            });
        },

        // FILTRAGGIO DELLA CHIAMATA API
        // filter movies
        searchMovies(){
            this.store.filteredMovies = this.store.movies.filter(movie => {
                return movie.title.toLowerCase().includes(this.store.searchQuery.toLowerCase())
            });
        },
        // filter TV series
        searchSeries(){
            this.store.filteredSeries = this.store.series.filter(show => {
                return show.name.toLowerCase().includes(this.store.searchQuery.toLowerCase())
            });
        },
        // filter for both movies and TV series
        filterResults() {
            this.searchMovies();
            this.searchSeries();
        },
    },
}
</script>

<template>
    <!-- INPUT UTENTE PER FILTRARE LE CHIAMATE API TRAMITE L'EVENTO CLICK DI UN BOTTONE-->
    <input type="text" v-model="store.searchQuery" placeholder="Search...">
    <button @click="filterResults">Filter</button>
</template>

<style lang="scss" scoped>
</style>