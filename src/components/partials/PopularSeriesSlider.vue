<script>
import { store } from '../../store.js';

export default {
    name: 'PopularSeriesSlider',
    data() {
        return {
            store,
            currentIndex: 0,
            selectedSeries: null
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
        showDetails(series) {
            this.selectedSeries = series;
            store.getCast(series.id, 'tv');
            store.getGenres(series.id, 'tv');
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
                                            <button class="btn-more" @click="showDetails(store.popularSeries[currentIndex])" data-bs-toggle="offcanvas" data-bs-target="#seriesDetails">
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

    <!-- Aggiungiamo l'off-canvas -->
    <div class="offcanvas offcanvas-bottom h-50" id="seriesDetails" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" v-if="selectedSeries">{{ selectedSeries.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" v-if="selectedSeries">
            <div v-if="store.casts[selectedSeries.id]" class="cast-info">
                <h6>Cast:</h6>
                <div class="cast-grid">
                    <div v-for="actor in store.casts[selectedSeries.id]" :key="actor.name" class="actor-card">
                        <img 
                            :src="actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'" 
                            :alt="actor.name"
                            class="actor-image"
                        >
                        <p class="actor-name">{{ actor.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/slider-common.scss';

.section-title {
    margin-left: 3%;  // Stesso margine dello slider
    margin-bottom: 2rem;
    color: #e5e5e5;
}

// Aggiungiamo gli stili per l'off-canvas
.offcanvas {
    background: linear-gradient(to bottom, #141414, #242424);
    color: white;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    text-align: center;
    
    &-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        display: flex;
        justify-content: center;
        position: relative;

        .offcanvas-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
        }

        .btn-close {
            filter: invert(1) grayscale(100%) brightness(200%);
            position: absolute;
            right: 1.5rem;
        }
    }

    &-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        h6 {
            font-size: 1.2rem;
            font-weight: bold;
            color: #e5e5e5;
            margin-bottom: 1rem;
        }
    }
}

.cast-grid {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    margin-bottom: 2rem;
    justify-content: center;
    width: 100%;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        
        &:hover {
            background: rgba(255, 255, 255, 0.5);
        }
    }
}

.actor-card {
    flex: 0 0 auto;
    text-align: center;
    width: 120px;

    .actor-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 0.8rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.05);
        }
    }

    .actor-name {
        font-size: 0.9rem;
        margin: 0;
        color: #e5e5e5;
        font-weight: 500;
    }
}
</style> 