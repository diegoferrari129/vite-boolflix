<script>
import FilterFilms from './FilterFilms.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    data() {
        return {
            store
        }
    },

    components: {
        FilterFilms,
    },

    created() {
        this.getMovies()
    },

    methods: {
        getMovies() {
            axios.get(store.apiMovies).then((result) => {
                store.movies = result.data.results;
            });
        },
        searchMovies(){
            this.store.filteredMovies = this.store.movies.filter(movie => {
                return movie.title.toLowerCase().includes(this.store.searchQuery.toLowerCase())
            })
        }
    },
}
</script>

<template>
    <input type="text" v-model="store.searchQuery" placeholder="Search...">
    <button @click="searchMovies">Filter</button>
    <ul>
        <li v-for="movie in store.filteredMovies" :key="movie.id">
            {{ movie.title }}
            {{ movie.original_title }}
            {{ movie.original_language }}
            {{ movie.vote_average }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>