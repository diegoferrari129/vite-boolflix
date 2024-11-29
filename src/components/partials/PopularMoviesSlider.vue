<script>
import { store } from '../../store.js';

export default {
    name: 'PopularMoviesSlider',
    data() {
        return {
            store,
            currentIndex: 0,
            selectedMovie: null
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
        },
        showDetails(movie) {
            this.selectedMovie = movie;
            store.getCast(movie.id, 'movie', true);
            store.getGenres(movie.id, 'movie');
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
                                            <button class="btn-more" @click="showDetails(store.popularMovies[currentIndex])" data-bs-toggle="offcanvas" data-bs-target="#movieDetails">
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

    <!-- Off-canvas -->
    <div class="offcanvas offcanvas-bottom h-50" id="movieDetails" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" v-if="selectedMovie">{{ selectedMovie.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" v-if="selectedMovie">
            <div v-if="store.casts[selectedMovie.id]" class="cast-info">
                <h6>Cast:</h6>
                <div class="cast-grid">
                    <div v-for="actor in store.casts[selectedMovie.id]" :key="actor.name" class="actor-card">
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

.genres {
    color: #e5e5e5;
    font-size: 1rem;
    margin: 1rem 0;
    opacity: 0.8;
}
</style> 