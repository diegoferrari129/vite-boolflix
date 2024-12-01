<template>
    <!-- Mostra questo se non ci sono risultati ma la ricerca è stata fatta -->
    <div v-if="store.searchExecuted && store.searchResults.length === 0" class="no-results">
        <h3>Nessun risultato trovato</h3>
    </div>

    <!-- Resto del template con i risultati -->
    <div v-for="item in store.searchResults" 
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
                            class="fas fa-star" 
                            :class="{ 'filled': n <= store.getVote(item.vote_average) }">
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

    <!-- Off-canvas -->
    <div class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="searchDetails">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" v-if="selectedItem">
                {{ selectedItem.title || selectedItem.name }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" v-if="selectedItem">
            <div v-if="store.casts[selectedItem.id]" class="cast-info">
                <h6>Cast:</h6>
                <div class="cast-grid">
                    <div v-for="actor in store.casts[selectedItem.id]" :key="actor.name" class="actor-card">
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

<script>
import { store } from '../../store.js';

export default {
    name: 'SearchCard',
    data() {
        return {
            store,
            selectedItem: null
        }
    },
    mounted() {
        store.searchResults.forEach(item => {
            store.getGenres(item.id, item.type);
        });
    },
    methods: {
        showDetails(item) {
            this.selectedItem = item;
            store.getCast(item.id, item.type);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/cards-common.scss';

.cast-info {
    .cast-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    .actor-card {
        text-align: center;

        .actor-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }

        .actor-name {
            font-size: 0.9rem;
            margin: 0;
        }
    }
}

.offcanvas {
    background-color: #141414;
    color: white;

    .btn-close {
        filter: invert(1);
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
        color: #00b300;  // verde per i generi
        margin: 0.5rem 0;
        font-weight: 500;
    }

    .overview {
        margin-top: 0.5rem;  // spazio dopo i generi
        // ... resto degli stili dell'overview ...
    }
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: white;
}
</style> 