<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        getStars(vote) {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push(i < Math.round(vote / 2) ? 'filled' : 'empty');
            }
            return stars;
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

            <span v-for="star, index in getStars(movie.vote_average)" :key="index">
                <i v-if="star === 'filled'" class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i v-if="star === 'empty'" class="fa-solid fa-star" style="color: #c0c0c0;"></i>
            </span>
        </li>
        
        <!-- TV series -->
        <li v-for="show in store.filteredSeries" :key="show.id">
            <img :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`">

            {{ show.name }}

            {{ show.original_name }}

            <img :src="`/public/flags/${show.original_language}.png`" />

            <span v-for="star, index in getStars(show.vote_average)" :key="index">
                <i v-if="star === 'filled'" class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i v-if="star === 'empty'" class="fa-solid fa-star" style="color: #c0c0c0;"></i>
            </span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
</style>