<template>
    <div v-for="item in filteredResults" 
        :key="item.id" 
        class="col-6 col-md-4 col-lg-3">
        <div class="netflix-card h-100">
            <div class="card-poster">
                <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : 'placeholder.jpg'" 
                    :alt="item.title || item.name"
                    class="w-100 h-100">
            </div>
            <div class="card-info">
                <h3>{{ item.title || item.name }}</h3>
                <div class="original-title" v-if="(item.title || item.name) !== (item.original_title || item.original_name)">
                    {{ item.original_title || item.original_name }}
                </div>
                <div class="metadata d-flex gap-3">
                    <span class="rating">
                        <i v-for="n in 5" 
                            :key="n" 
                            :class="n <= store.getVote(item.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star'">
                        </i>
                    </span>
                    <span class="year">
                        {{ store.getYear(item.release_date || item.first_air_date) }}
                    </span>
                    <span class="language">
                        {{ store.getFlag(item.original_language) }}
                    </span>
                </div>
                <div v-if="store.genres[item.id]" class="genres">
                    {{ store.genres[item.id] }}
                </div>
                <p class="overview">{{ item.overview }}</p>
                <div class="btn-wrapper">
                    <button class="btn-more" @click="showDetails(item)" data-bs-toggle="offcanvas" data-bs-target="#searchDetails">
                        <i class="fas fa-info-circle"></i>
                        More
                    </button>
                </div>
            </div>
        </div>
    </div>

    <DetailsOffcanvas />
</template>

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
        filteredResults() {
            return store.getFilteredResults();
        }
    },
    methods: {
        showDetails(item) {
            store.selectedCardDetails = item;
            store.getCast(item.id, item.type);
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../../styles/_colors' as *;
@import '../../styles/cards-common.scss';

.rating {
    .fa-star.fa-solid {
        color: #ffd700 !important;  // stelle piene gialle
    }
    .fa-star.fa-regular {
        color: #666;     // stelle vuote grigie
    }
}

.card-info {
    display: flex;
    flex-direction: column;
    height: 100%;

    .btn-wrapper {
        display: flex;
        justify-content: center;
        margin-top: auto;
    }

    .btn-more {
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.3s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        i {
            font-size: 1.2rem;
        }
    }

    .genres {
        font-size: 0.9rem;
        color: #00b300;
        margin: 0.5rem 0;
        font-weight: 500;
    }

    .overview {
        margin-top: 0.5rem;
    }
}
</style> 