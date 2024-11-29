<script>
import { store } from '../../store.js';

export default {
    data() {
        return {
            store,
        };
    },
    mounted() {
        // Ciclo per ottenere il cast e i generi per ogni serie
        store.seriesResults.forEach(series => {
            store.getCast(series.id, 'tv');
            store.getGenres(series.id, 'tv');
        });
    },
    methods: {
        getCast(id) {
            store.getCast(id, 'tv');
        }
    }
}
</script>

<template>
    <div v-for="series in store.seriesResults" 
        :key="series.id" 
        class="col-6 col-md-4 col-lg-3">
        <div class="netflix-card h-100">
            <div class="card-poster">
                <!-- POSTER -->
                <img :src="series.poster_path ? `https://image.tmdb.org/t/p/w342${series.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'" 
                    :alt="series.name"
                    :class="{ 'placeholder': !series.poster_path }"
                    class="w-100 h-100">
            </div>
            <div class="card-info">
                <!-- TITLE -->
                <h3>{{ series.name }}</h3>
                <div class="original-title" v-if="series.name !== series.original_name">
                    {{ series.original_name }}
                </div>
                <div class="metadata d-flex gap-3">
                    <!-- RATING -->
                    <span class="rating">
                        <i v-for="n in 5" 
                            :key="n" 
                            class="fas fa-star" 
                            :class="{ 'filled': n <= store.getVote(series.vote_average) }">
                        </i>
                    </span>
                    <!-- YEAR -->
                    <span class="year">
                        {{ store.getYear(series.first_air_date) }}
                    </span>
                    <!-- LANGUAGE -->
                    <span class="language">
                        {{ store.getFlag(series.original_language) }}
                    </span>
                </div>
                <!-- OVERVIEW -->
                <p class="overview">{{ series.overview }}</p>
                <div v-if="store.genres[series.id]" class="info-row">
                    {{ store.genres[series.id] }}
                </div>
                <div v-if="store.casts[series.id]" class="info-row">
                    Cast: {{ store.casts[series.id] }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/cards-common.scss';
</style>