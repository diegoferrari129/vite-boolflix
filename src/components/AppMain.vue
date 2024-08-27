<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },
}   
</script>

<template>
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