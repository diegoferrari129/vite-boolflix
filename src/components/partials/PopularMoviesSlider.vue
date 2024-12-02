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
        showDetails(item) {
            store.selectedCardDetails = item;
            store.getCast(item.id, 'movie');
        }
    },
    mounted() {
        this.store.getPopular('movies');
    }
}
</script>

<template>
    <div class="slider">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h2 class="section-title">Popular Movies</h2>
                    
                    <div v-if="store.popularMovies && store.popularMovies.length > 0" class="slider-content">
                        <button class="handle handle-prev" @click="prevSlide">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <div class="slider-container">
                            <div class="current-slide">
                                <div class="backdrop" 
                                    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${store.popularMovies[currentIndex].backdrop_path})` }">
                                </div>
                                <div class="content-wrapper">
                                    <div class="content">
                                        <h1>{{ store.popularMovies[currentIndex].title }}</h1>
                                        <div class="original-title" v-if="store.popularMovies[currentIndex].title !== store.popularMovies[currentIndex].original_title">
                                            {{ store.popularMovies[currentIndex].original_title }}
                                        </div>
                                        
                                        <div class="metadata">
                                            <span class="rating">
                                                <i v-for="n in 5" :key="n" 
                                                    class="fas fa-star" 
                                                    :class="{ 'filled': n <= store.getVote(store.popularMovies[currentIndex].vote_average) }">
                                                </i>
                                            </span>
                                            <span class="year">
                                                {{ store.getYear(store.popularMovies[currentIndex].release_date) }}
                                            </span>
                                            <span class="language">
                                                {{ store.getFlag(store.popularMovies[currentIndex].original_language) }}
                                            </span>
                                        </div>
                                        <div v-if="store.genres[store.popularMovies[currentIndex].id]" class="genres">
                                            {{ store.genres[store.popularMovies[currentIndex].id] }}
                                        </div>
                                        <p class="overview">{{ store.popularMovies[currentIndex].overview }}</p>
                                        
                                        <div class="buttons">
                                            <button class="btn-play">
                                                <i class="fas fa-play"></i>
                                                Play
                                            </button>
                                            <button class="btn-more" @click="showDetails(store.popularMovies[currentIndex])" data-bs-toggle="offcanvas" data-bs-target="#searchDetails">
                                                <i class="fas fa-info-circle"></i>
                                                More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="handle handle-next" @click="nextSlide">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <DetailsOffcanvas />
</template>

<style lang="scss" scoped>
@import '../../styles/slider-common.scss';
</style> 