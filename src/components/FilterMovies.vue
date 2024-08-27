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
</template>

<style lang="scss" scoped>
</style>