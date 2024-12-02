<template>
    <div class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="searchDetails">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" v-if="store.selectedCardDetails">
                {{ store.selectedCardDetails.title || store.selectedCardDetails.name }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" v-if="store.selectedCardDetails">
            <div class="cast-info">
                <h6>Cast:</h6>
                <div v-if="store.casts[store.selectedCardDetails.id] && store.casts[store.selectedCardDetails.id].length > 0" 
                    class="cast-grid">
                    <div v-for="actor in store.casts[store.selectedCardDetails.id]" :key="actor.name" class="actor-card">
                        <img 
                            :src="actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'" 
                            :alt="actor.name"
                            class="actor-image"
                        >
                        <p class="actor-name">{{ actor.name }}</p>
                    </div>
                </div>
                <p v-else class="no-cast">Cast information not available</p>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store.js';

export default {
    data() {
        return {
            store
        }
    }
}
</script>

<style lang="scss" scoped>
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

.no-cast {
    color: #666;
    font-style: italic;
    text-align: center;
    margin-top: 2rem;
}
</style>