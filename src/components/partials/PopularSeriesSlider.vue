<script>
import { store } from '../../store.js';
import DetailsOffcanvas from './DetailsOffcanvas.vue';

export default {
    name: 'PopularSeriesSlider',
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
            if (this.store.popularSeries && this.store.popularSeries.length) {
                this.currentIndex = (this.currentIndex === 0 
                    ? this.store.popularSeries.length - 1 
                    : this.currentIndex - 1);
            }
        },
        prevSlide() {
            if (this.store.popularSeries && this.store.popularSeries.length) {
                this.currentIndex = (this.currentIndex + 1) % this.store.popularSeries.length;
            }
        },
        showDetails(item) {
            store.selectedCardDetails = item;
            store.getCast(item.id, 'tv');
        }
    },
    mounted() {
        this.store.getPopular('series');
    }
}
</script>

<template>
    <div class="slider">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- TITLE -->
                    <h2 class="section-title">Popular TV Series</h2>
                    
                    <div v-if="store.popularSeries && store.popularSeries.length > 0" class="slider-content">
                        <!-- PREV BUTTON -->
                        <button class="handle handle-prev" @click="prevSlide">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <div class="slider-container">
                            <!-- CURRENT SLIDE -->
                            <div class="current-slide">
                                <div class="backdrop" 
                                    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${store.popularSeries[currentIndex].backdrop_path})` }">
                                </div>
                                <div class="content-wrapper">
                                    <div class="content">
                                        <h1>{{ store.popularSeries[currentIndex].name }}</h1>
                                        <div class="original-title" v-if="store.popularSeries[currentIndex].name !== store.popularSeries[currentIndex].original_name">
                                            {{ store.popularSeries[currentIndex].original_name }}
                                        </div>
                                        <!-- RATING -->
                                        <div class="metadata">
                                            <span class="rating">
                                                <i v-for="n in 5" :key="n" 
                                                    class="fas fa-star" 
                                                    :class="{ 'filled': n <= store.getVote(store.popularSeries[currentIndex].vote_average) }">
                                                </i>
                                            </span>
                                            <!-- YEAR -->
                                            <span class="year">
                                                {{ new Date(store.popularSeries[currentIndex].first_air_date).getFullYear() }}
                                            </span>
                                            <!-- LANGUAGE -->
                                            <span class="language">
                                                {{ store.getFlag(store.popularSeries[currentIndex].original_language) }}
                                            </span>
                                        </div>
                                        <!-- OVERVIEW -->
                                        <p class="overview">{{ store.popularSeries[currentIndex].overview }}</p>
                                        <!-- BUTTONS -->
                                        <div class="buttons">
                                            <button class="btn-play">
                                                <i class="fas fa-play"></i>
                                                Play
                                            </button>
                                            <button class="btn-more" @click="showDetails(store.popularSeries[currentIndex])" data-bs-toggle="offcanvas" data-bs-target="#searchDetails">
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

    <DetailsOffcanvas />
</template>

<style lang="scss" scoped>
@import '../../styles/slider-common.scss';
</style> 