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
        <!-- CICLO PER MOSTRARE I VALORI FILTRATI DELLA CHIAMATA API -->
         <!-- movies -->
        <li v-for="movie in store.filteredMovies" :key="movie.id">
            {{ movie.title }}
            {{ movie.original_title }}
            <img :src="`/assets/flags/${movie.original_language}.png`" />
            {{ movie.vote_average }}
        </li>
        
        <!-- TV series -->
        <li v-for="show in store.filteredSeries" :key="show.id">
            {{ show.name }}
            {{ show.original_name }}
            <img :src="`/assets/flags/${show.original_language}.png`" />
            {{ show.vote_average }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>