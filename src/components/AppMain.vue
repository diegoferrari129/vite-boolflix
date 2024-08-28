<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        roundedVoteMovie(movie) {
            return Math.round(movie.vote_average / 2);
        },
        roundedVoteShow(show) {
            return Math.round(show.vote_average / 2);
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
            {{ roundedVoteMovie(movie) }}
        </li>
        
        <!-- TV series -->
        <li v-for="show in store.filteredSeries" :key="show.id">
            <img :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`">
            {{ show.name }}
            {{ show.original_name }}
            <img :src="`/public/flags/${show.original_language}.png`" />
            {{ roundedVoteShow(show) }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>