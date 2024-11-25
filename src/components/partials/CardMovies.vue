<script>
import { store } from '../../store.js';

export default {
    data() {
        return {
            store,
        };
    }
}
</script>

<template>
    <div v-for="movie in store.movieResults" 
        :key="movie.id" 
        class="col-6 col-md-3">
        <div class="netflix-card h-100">
            <div class="card-poster">
                <!-- POSTER -->
                <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'" 
                    :alt="movie.title"
                    :class="{ 'placeholder': !movie.poster_path }"
                    class="w-100 h-100">
            </div>
            <div class="card-info">
                <!-- TITLE -->
                <h3>{{ movie.title }}</h3>
                <div class="original-title" v-if="movie.title !== movie.original_title">
                    {{ movie.original_title }}
                </div>
                <div class="metadata d-flex gap-3">
                    <!-- RATING -->
                    <span class="rating">
                        <i v-for="n in 5" 
                            :key="n" 
                            class="fas fa-star" 
                            :class="{ 'filled': n <= store.getVote(movie.vote_average) }">
                        </i>
                    </span>
                    <!-- YEAR -->
                    <span class="year">
                        {{ new Date(movie.release_date).getFullYear() }}
                    </span>
                    <!-- LANGUAGE -->
                    <span class="language">
                        {{ store.getFlag(movie.original_language) }}
                    </span>
                </div>
                <!-- OVERVIEW -->
                <p class="overview">{{ movie.overview }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/cards-common.scss';
</style>