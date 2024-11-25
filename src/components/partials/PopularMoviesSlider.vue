<script>
import { store } from '../../store.js';

export default {
    name: 'PopularMoviesSlider',
    data() {
        return {
            store,
            currentIndex: 0
        }
    },
    methods: {
        nextSlide() {
            if (this.store.popularMovies && this.store.popularMovies.length) {
                this.currentIndex = (this.currentIndex + 1) % this.store.popularMovies.length;
            }
        },
        prevSlide() {
            if (this.store.popularMovies && this.store.popularMovies.length) {
                this.currentIndex = this.currentIndex === 0 
                    ? this.store.popularMovies.length - 1 
                    : this.currentIndex - 1;
            }
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
                    <!-- TITLE -->
                    <h2 class="section-title">Popular Movies</h2>
                    
                    <div v-if="store.popularMovies && store.popularMovies.length > 0" class="slider-content">
                        <!-- PREV BUTTON -->
                        <button class="handle handle-prev" @click="prevSlide">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <!-- CURRENT SLIDE -->
                        <div class="slider-container">
                            <div class="current-slide">
                                <div class="backdrop" 
                                    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${store.popularMovies[currentIndex].backdrop_path})` }">
                                </div>
                                <div class="content-wrapper">
                                    <div class="content">
                                        <!-- TITLE -->
                                        <h1>{{ store.popularMovies[currentIndex].title }}</h1>
                                        <div class="original-title" v-if="store.popularMovies[currentIndex].title !== store.popularMovies[currentIndex].original_title">
                                            {{ store.popularMovies[currentIndex].original_title }}
                                        </div>
                                        <!-- RATING -->
                                        <div class="metadata">
                                            <span class="rating">
                                                <i v-for="n in 5" :key="n" 
                                                    class="fas fa-star" 
                                                    :class="{ 'filled': n <= store.getVote(store.popularMovies[currentIndex].vote_average) }">
                                                </i>
                                            </span>
                                            <!-- YEAR -->
                                            <span class="year">
                                                {{ new Date(store.popularMovies[currentIndex].release_date).getFullYear() }}
                                            </span>
                                            <!-- LANGUAGE -->
                                            <span class="language">
                                                {{ store.getFlag(store.popularMovies[currentIndex].original_language) }}
                                            </span>
                                        </div>
                                        <p class="overview">{{ store.popularMovies[currentIndex].overview }}</p>
                                        <!-- BUTTONS -->
                                        <div class="buttons">
                                            <button class="btn-play">
                                                <i class="fas fa-play"></i>
                                                Play
                                            </button>
                                            <button class="btn-more">
                                                <i class="fas fa-info-circle"></i>
                                                More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- NEXT BUTTON -->
                        <button class="handle handle-next" @click="nextSlide">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/slider-common.scss';
</style> 