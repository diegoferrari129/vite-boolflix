<template>
    <div v-for="item in store.searchResults" 
        :key="item.id" 
        class="col-6 col-md-4 col-lg-3">
        <div class="netflix-card h-100">
            <div class="card-poster">
                <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'" 
                    :alt="item.type === 'movie' ? item.title : item.name"
                    :class="{ 'placeholder': !item.poster_path }"
                    class="w-100 h-100">
            </div>
            <div class="card-info">
                <h3>{{ item.type === 'movie' ? item.title : item.name }}</h3>
                <div class="original-title" v-if="(item.type === 'movie' && item.title !== item.original_title) || (item.type === 'tv' && item.name !== item.original_name)">
                    {{ item.type === 'movie' ? item.original_title : item.original_name }}
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
                        {{ store.getYear(item.type === 'movie' ? item.release_date : item.first_air_date) }}
                    </span>
                    <span class="language">
                        {{ store.getFlag(item.original_language) }}
                    </span>
                </div>
                <p class="overview">{{ item.overview }}</p>
                <div v-if="store.genres[item.id]" class="info-row">
                    {{ store.genres[item.id] }}
                </div>
                <div v-if="store.casts[item.id]" class="info-row">
                    Cast: {{ store.casts[item.id] }}
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
            store
        }
    },
    mounted() {
        store.searchResults.forEach(item => {
            store.getCast(item.id, item.type);
            store.getGenres(item.id, item.type);
        });
    },
    methods: {
        getCast(id, type) {
            store.getCast(id, type);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/cards-common.scss';
</style> 