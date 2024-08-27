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
    },

    methods: {
        // CHIAMATA API
        getMovies() {
            axios.get(store.apiMovies).then((result) => {
                store.movies = result.data.results;
            });
        },
        // FILTRAGGIO DELLA CHIAMATA API
        searchMovies(){
            this.store.filteredMovies = this.store.movies.filter(movie => {
                return movie.title.toLowerCase().includes(this.store.searchQuery.toLowerCase())
            })
        }
    },
}
</script>

<template>
    <!-- INPUT UTENTE PER FILTRARE LA CHIAMATA API TRAMITE L'EVENTO CLICK DI UN BOTTONE-->
    <input type="text" v-model="store.searchQuery" placeholder="Search...">
    <button @click="searchMovies">Filter</button>
</template>

<style lang="scss" scoped>
</style>