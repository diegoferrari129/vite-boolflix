<script>
import { store } from '../../store.js';
import DetailsOffcanvas from './DetailsOffcanvas.vue';

export default {
    components: {
        DetailsOffcanvas
    },
    data() {
        return {
            store
        }
    },
    computed: {
        //FILTRO 
        filteredResults() {
            return store.getFilteredResults();
        }
    },
    methods: {
        //RECUPERO IL CAST
        showDetails(item) {
            store.selectedCardDetails = item;
            const mediaType = item.first_air_date ? 'tv' : 'movie';
            store.getCast(item.id, mediaType);
        }
    },
    mounted() {
        //RECUPERO I GENERI
        this.filteredResults.forEach(item => {
            const mediaType = item.first_air_date ? 'tv' : 'movie';
            store.getGenres(item.id, mediaType);
        });
    }
}
</script>

<template>
    <div v-for="item in filteredResults" 
        :key="item.id" 
        class="col-6 col-md-4 col-lg-3">

        <!-- Card -->
        <div class="boolflix-card h-100">

            <!-- Poster -->
            <div class="card-poster">
                <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : 'placeholder.jpg'" 
                    :alt="item.title || item.name"
                    class="w-100 h-100">
            </div>

            <!-- Info -->
            <div class="card-info d-flex flex-column h-100">

                <!-- Title -->
                <h3>{{ item.title || item.name }}</h3>

                <!-- Original title -->
                <div class="original-title fst-italic text-muted mb-2" v-if="(item.title || item.name) !== (item.original_title || item.original_name)">
                    {{ item.original_title || item.original_name }}
                </div>

                <div class="metadata d-flex gap-3 mb-2">
                    <!-- Rating -->
                    <span class="rating">
                        <i v-for="n in 5" 
                            :key="n" 
                            :class="n <= store.getVote(item.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star'">
                        </i>
                    </span>

                    <!-- Year -->
                    <span class="year">
                        {{ store.getYear(item.release_date || item.first_air_date) }}
                    </span>
                
                    <!-- Language -->
                    <span class="language">
                        {{ store.getFlag(item.original_language) }}
                    </span>
                </div>

                <!-- Genres -->
                <div v-if="store.genres[item.id]" class="genres fw-500 my-2">
                    {{ store.genres[item.id] }}
                </div>

                <!-- Overview -->
                <p class="overview mt-2">{{ item.overview }}</p>

                <!-- More button -->
                <div class="btn-wrapper d-flex justify-content-center mt-auto">
                    <button class="btn-more d-flex align-items-center gap-2" @click="showDetails(item)" data-bs-toggle="offcanvas" data-bs-target="#searchDetails">
                        <i class="fas fa-info-circle"></i>
                        More
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cast  -->
    <DetailsOffcanvas />
</template>

<style lang="scss" scoped>
@import '../../styles/cards-common.scss';
</style> 