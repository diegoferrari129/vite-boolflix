<script>
import { store } from '../../store.js';
import DetailsOffcanvas from './DetailsOffcanvas.vue';

export default {
    name: 'PopularMoviesSlider',
    components: {
        DetailsOffcanvas
    },
    data() {
        return {
            store,
            currentIndex: 0
        }
    },
    methods: {
        //SLIDER
        nextSlide() {
            if (this.store.popularMovies && this.store.popularMovies.length) {
                this.currentIndex = (this.currentIndex === 0 
                    ? this.store.popularMovies.length - 1 
                    : this.currentIndex - 1);
            }
        },
        prevSlide() {
            if (this.store.popularMovies && this.store.popularMovies.length) {
                this.currentIndex = (this.currentIndex + 1) % this.store.popularMovies.length;
            }
        },

        //RECUPERO Il CAST
        showDetails(item) {
            store.selectedCardDetails = item;
            store.getCast(item.id, 'movie');
        }
    },
    mounted() {
        //RECUPERO I FILM POPOLARI
        this.store.getPopular('movies');
    }
}
</script>

<template>
    <div class="slider">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- TITLE -->
                    <h2 class="section-title mb-4">Popular Movies</h2>
                    
                    <!-- SLIDER -->
                    <div v-if="store.popularMovies && store.popularMovies.length > 0" class="slider-content">
                        <!-- PREV BUTTON -->
                        <button class="handle handle-prev d-flex align-items-center justify-content-center" @click="prevSlide">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <div class="slider-container">
                            <div class="current-slide">
                                <div class="backdrop" 
                                    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${store.popularMovies[currentIndex].backdrop_path})` }">
                                </div>
                                <div class="content-wrapper d-flex align-items-center">
                                    <!-- CONTENT -->
                                    <div class="content">
                                        <!-- TITLE -->
                                        <h1 class="mb-2">{{ store.popularMovies[currentIndex].title }}</h1>
                                        <!-- ORIGINAL TITLE -->
                                        <div class="original-title fst-italic mb-3" v-if="store.popularMovies[currentIndex].title !== store.popularMovies[currentIndex].original_title">
                                            {{ store.popularMovies[currentIndex].original_title }}
                                        </div>
                                        
                                        <div class="metadata mb-3">
                                            <span class="rating me-3">
                                                <!-- VOTE -->
                                                <i v-for="n in 5" :key="n" 
                                                    class="fas fa-star" 
                                                    :class="{ 'filled': n <= store.getVote(store.popularMovies[currentIndex].vote_average) }">
                                                </i>
                                            </span>
                                            <!-- YEAR -->
                                            <span class="year me-3">
                                                {{ store.getYear(store.popularMovies[currentIndex].release_date) }}
                                            </span>
                                            <!-- LANGUAGE -->
                                            <span class="language">
                                                {{ store.getFlag(store.popularMovies[currentIndex].original_language) }}
                                            </span>
                                        </div>

                                        <!-- GENRES -->
                                        <div v-if="store.genres[store.popularMovies[currentIndex].id]" class="genres mb-3">
                                            {{ store.genres[store.popularMovies[currentIndex].id] }}
                                        </div>

                                        <!-- OVERVIEW -->
                                        <p class="overview mb-3">{{ store.popularMovies[currentIndex].overview }}</p>
                                        
                                        <!-- BUTTONS -->
                                        <div class="buttons d-flex gap-3">
                                            <!-- PLAY -->
                                            <button class="btn-play d-flex align-items-center">
                                                <i class="fas fa-play me-2"></i>
                                                Play
                                            </button>
                                            <!-- MORE -->
                                            <button class="btn-more d-flex align-items-center" @click="showDetails(store.popularMovies[currentIndex])" data-bs-toggle="offcanvas" data-bs-target="#searchDetails">
                                                <i class="fas fa-info-circle me-2"></i>
                                                More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- NEXT BUTTON -->
                        <button class="handle handle-next d-flex align-items-center justify-content-center" @click="nextSlide">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CAST -->
    <DetailsOffcanvas />
</template>

<style lang="scss" scoped>
@import '../../styles/slider-common.scss';
</style> 