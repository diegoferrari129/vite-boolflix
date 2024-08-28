<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        roundedVote(movie) {
            return Math.floor(movie.vote_average);
        },
        roundedVote(show) {
            return Math.floor(show.vote_average);
        }
    }
}   
</script>

<template>
    <ul>
        <!-- CICLO PER MOSTRARE I VALORI FILTRATI DELLA CHIAMATA API -->
         <!-- movies -->
        <li v-for="movie in store.filteredMovies" :key="movie.id">
            <img :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`">
            {{ movie.title }}
            {{ movie.original_title }}
            <img :src="`/public/flags/${movie.original_language}.png` " />
            {{ roundedVote(movie) }}
        </li>
        
        <!-- TV series -->
        <li v-for="show in store.filteredSeries" :key="show.id">
            <img :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`">
            {{ show.name }}
            {{ show.original_name }}
            <img :src="`/public/flags/${show.original_language}.png`" />
            {{ roundedVote(show) }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>