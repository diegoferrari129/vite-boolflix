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

        <section id="results" class="results-section" v-if="store.searchExecuted">
            <div class="container">
                <FilterBar />
                <div class="row gy-2">
                    <!-- Messaggio nessun risultato -->
                    <div class="col-12" v-if="store.searchResults.length === 0">
                        <div class="results-message error">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <h2>No results found</h2>
                            <p>Try adjusting your search criteria</p>
                        </div>
                    </div>

                    <!-- Risultati della ricerca -->
                    <div class="col-12" v-else>
                        <div class="results-message success">
                            <i class="fa-solid fa-circle-check"></i>
                            <h2>{{ store.searchResults.length }} Results found</h2>
                            <p>Showing all matches for your search</p>
                        </div>
                    </div>

                    <!-- Sezione Risultati -->
                    <div class="col-12" v-if="store.searchResults.length > 0">
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

    h2, h3 {
        margin-bottom: $spacing-lg;
    }
}
</style>