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
    },
}
</script>

<template>
    
</template>

<style lang="scss" scoped>
</style>