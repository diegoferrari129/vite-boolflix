<script>
import CardMovies from '../partials/CardMovies.vue';
import CardSeries from '../partials/CardSeries.vue';
import PopularSeriesSlider from '../partials/PopularSeriesSlider.vue';
import PopularMoviesSlider from '../partials/PopularMoviesSlider.vue';
import { store } from '../../store.js';

export default {
    name: 'Main',
    components: {
        CardMovies,
        CardSeries,
        PopularSeriesSlider,
        PopularMoviesSlider
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <main>
        <section class="sliders-section">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="mt-4">
                            <PopularMoviesSlider />
                            <PopularSeriesSlider />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="results" class="results-section" v-if="store.movieResults.length > 0 || store.seriesResults.length > 0">
            <div class="container">
                <div class="row gy-2">
                    <!-- Risultati della ricerca -->
                    <div class="col-12" v-if="store.searchExecuted">
                        
                        <h2 class="text-center bg-success p-2 rounded-2 mt-5">
                            {{ store.movieResults.length }} Movies and {{ store.seriesResults.length }} TV Series matched your search
                        </h2>
                    
                    </div>

                    <!-- Sezione Film -->
                    <div class="col-12" v-if="store.movieResults.length > 0">
                        <div class="mt-2">
                            <h3 class="fw-bold">Movies</h3>
                        </div>
                        <div class="row g-4">
                            <CardMovies />
                        </div>
                    </div>

                    <!-- Sezione Serie TV -->
                    <div class="col-12" v-if="store.seriesResults.length > 0">
                        <div class="mt-4">
                            <h3 class="fw-bold">TV Series</h3>
                        </div>
                        <div class="row g-4">
                            <CardSeries />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;
@use '../../styles/_colors' as *;

main {
    background-color: $bg-dark;
    min-height: 100vh;
}

.sliders-section {
    margin-top: 3.75rem;
    padding: $spacing-lg 0;
}

.results-section {
    padding: $spacing-lg 0;
    color: $text-light;

    h2, h3 {
        margin-bottom: $spacing-lg;
    }
}
</style>