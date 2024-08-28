<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            store
        }
    },

    methods: {
        getStars(vote) {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push(i < Math.round(vote / 2) ? 'filled' : 'empty');
            }
            return stars;
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row"> 
            <div class="col-4" v-for="movie in store.movies" :key="movie.id">
                <div class="card bg-dark text-white my-3">
                    <img :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" class="card-img">
                    <div class="card-img-overlay">
                        <h5 class="card-title">
                            <span class="fw-bolder">
                                Title:
                            </span>
                            {{ movie.title }}
                        </h5>
                        <h6 class="card-title">
                            <span class="fw-bolder">
                                Original Title:
                            </span>
                            {{ movie.original_title }}
                        </h6>
                        <div class="card-text">
                            <span class="fw-bolder">Lang:</span>
                            <img :src="`/public/flags/${movie.original_language}.png`" class="ps-2" />
                        </div>
                        <div class="card-text mt-1">
                            <span class="fw-bolder">
                                Rating:
                            </span>
                            <span v-for="star, index in getStars(movie.vote_average)" :key="index">
                                <i v-if="star === 'filled'" class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i v-if="star === 'empty'" class="fa-solid fa-star" style="color: #c0c0c0;"></i>
                            </span>
                        </div>
                        <div class="card-text mt-2">
                            <span class="fw-bolder">
                                Overview:
                            </span>
                            {{ movie.overview }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row"> 
            <div class="col-4" v-for="show in store.series" :key="show.id">
                <div class="card bg-dark text-white my-3">
                    <img :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`" class="card-img">
                    <div class="card-img-overlay">
                        <h5 class="card-title">
                            <span class="fw-bolder">
                                Title:
                            </span>
                            {{ show.name }}
                        </h5>
                        <h6 class="card-title">
                            <span class="fw-bolder">
                                Original Title:
                            </span>
                            {{ show.original_name }}
                        </h6>
                        <div class="card-text">
                            <span class="fw-bolder">
                                Lang:
                            </span>
                            <img :src="`/public/flags/${show.original_language}.png`" class="ps-2" />
                        </div>
                        <div class="card-text mt-1">
                            <span class="fw-bolder">
                                Rating:
                            </span>
                            <span v-for="star, index in getStars(show.vote_average)" :key="index">
                                <i v-if="star === 'filled'" class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i v-if="star === 'empty'" class="fa-solid fa-star" style="color: #c0c0c0;"></i>
                            </span>
                        </div>
                        <div class="card-text mt-2">
                            <span class="fw-bolder">
                                Overview:
                            </span>
                            {{ show.overview }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>

    .card-img-overlay {
        opacity: 0;
        transition: opacity 0.5s;
    }
    .card {

        &:hover {
            
            .card-img-overlay {
                opacity: 1;
            }
            .card-img {
                display: none;
            }
        }
    }

</style>