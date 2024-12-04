<template>
    <div class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="searchDetails">
        <div class="offcanvas-header justify-content-center">
            <h5 class="offcanvas-title text-center" v-if="store.selectedCardDetails">
                {{ store.selectedCardDetails.title || store.selectedCardDetails.name }}
            </h5>
            <button type="button" class="btn-close position-absolute end-0 me-3" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" v-if="store.selectedCardDetails">
            <div class="cast-info container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">

                        <h6 class="text-center mb-4">Cast:</h6>

                        <!-- CAST -->
                        <div v-if="store.casts[store.selectedCardDetails.id]?.length > 0" 
                            class="cast-grid mx-auto">

                            <div v-for="actor in store.casts[store.selectedCardDetails.id]" 
                                :key="actor.name" 
                                class="actor-card text-center">

                                <!-- IMAGE -->
                                <div class="img-wrapper mb-2">
                                    <img v-if="actor.profile_path" 
                                        :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`" 
                                        :alt="actor.name"
                                        class="actor-image rounded"
                                    >
                                    <div v-else class="no-image rounded d-flex align-items-center justify-content-center">
                                        <i class="fas fa-user"></i>
                                    </div>
                                </div>

                                <!-- NAME -->
                                <p class="actor-name m-0">{{ actor.name }}</p>
                            </div>
                        </div>
                        
                        <p v-else class="no-cast text-center fst-italic text-muted mt-4">Cast information not available</p>
                    </div>
                </div>
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
@use '../../styles/colors' as *;

.cast-info {
    .cast-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .actor-card {
        .img-wrapper {
            aspect-ratio: 2/3;
            width: 100%;
            
            .actor-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .no-image {
                width: 100%;
                height: 100%;
                background-color: rgba($text-light, 0.1);
                color: rgba($text-light, 0.5);
                
                i {
                    font-size: 2rem;
                }
            }
        }

        .actor-name {
            font-size: 0.9rem;
        }
    }
}

.offcanvas {
    background-color: $bg-dark;
    color: $text-light;

    .btn-close {
        filter: invert(1);
    }

    .offcanvas-title {
        width: 100%;
        padding: 0 2rem;
    }
}
</style>