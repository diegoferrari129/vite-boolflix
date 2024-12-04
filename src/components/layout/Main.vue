<script>
import PopularSeriesSlider from '../partials/PopularSeriesSlider.vue';
import PopularMoviesSlider from '../partials/PopularMoviesSlider.vue';
import SearchCard from '../partials/SearchCard.vue';
import FilterBar from '../partials/FilterBar.vue';

import { store } from '../../store.js';

export default {
    name: 'Main',
    components: {
        PopularSeriesSlider,
        PopularMoviesSlider,
        SearchCard,
        FilterBar
    },
    data() {
        return {
            store
        }
    },
    computed: {
        filteredResults() {
            return store.getFilteredResults();
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
                        </div>
                        <div class="mt-5">
                            <PopularSeriesSlider />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="results" class="results-section" v-if="store.searchExecuted">
            <div class="container">
                <FilterBar />
                <div class="row justify-content-center">
                    <!-- Messaggio nessun risultato -->
                    <div class="col-12 col-md-8 col-lg-6 mb-4" v-if="filteredResults.length === 0">
                        <div class="results-message error text-center p-4 rounded">
                            <i class="fa-solid fa-circle-exclamation fs-1 mb-3"></i>
                            <h2 class="fs-4 mb-2">No results found</h2>
                            <p class="text-muted m-0">Try adjusting your search criteria or filters</p>
                        </div>
                    </div>

                    <!-- Risultati della ricerca -->
                    <div class="col-12 col-md-8 col-lg-6 mb-4" v-else>
                        <div class="results-message success text-center p-4 rounded">
                            <i class="fa-solid fa-circle-check fs-1 mb-3"></i>
                            <h2 class="fs-4 mb-2">{{ filteredResults.length }} Results found</h2>
                            <p class="text-muted m-0">Showing {{ store.activeFilter === 'all' ? 'all content' : 
                                store.activeFilter === 'movie' ? 'movies only' : 
                                'TV series only' }}</p>
                        </div>
                    </div>

                    <!-- Sezione Risultati -->
                    <div class="col-12" v-if="filteredResults.length > 0">
                        <div class="row g-4">
                            <SearchCard />
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
    scroll-margin-top: 80px;

    .results-message {
        background-color: rgba($text-light, 0.05);
        transition: all $transition-speed;

        i {
            display: block;
        }

        &.success i {
            color: #46d369;
        }

        &.error i {
            color: $netflix-red;
        }
    }
}
</style>