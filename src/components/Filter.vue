<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        // CHIAMATA API
        // movies
        getMovies() {
            axios.get(store.apiMovies+store.searchQuery).then((result) => {
                store.movies = result.data.results;
                console.log(store.movies)
            });

        },
        // TV series
        getSeries() {
            axios.get(store.apiSeries+store.searchQuery).then((result) => {
                store.series = result.data.results;
                console.log(store.series)
            });
        },

        // filter for both movies and TV series
        getShows() {
            this.getMovies();
            this.getSeries();
        },
    },
}
</script>

<template>
    <!-- INPUT UTENTE PER FILTRARE LE CHIAMATE API TRAMITE L'EVENTO CLICK DI UN BOTTONE-->
    <input type="text" v-model="store.searchQuery" placeholder="Search...">
    <button @click="getShows">Filter</button>
</template>

<style lang="scss" scoped>
</style>