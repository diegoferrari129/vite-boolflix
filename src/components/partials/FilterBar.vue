<template>
    <div class="filter-bar">
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'all' ? 'active' : ''"
            @click="store.activeFilter = 'all'">
            All
        </button>
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'movie' ? 'active' : ''"
            @click="store.activeFilter = 'movie'">
            Movies
        </button>
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'tv' ? 'active' : ''"
            @click="store.activeFilter = 'tv'">
            TV Series
        </button>
    </div>
</template>

<script>
import { store } from '../../store.js';

export default {
    data() {
        return {
            store
        }
    },
    mounted() {
        store.getAllGenres();
    }
}
</script>

<style lang="scss" scoped>
.filter-bar {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;

    .filter-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        &.active {
            background: #e50914;
        }
    }
}
</style>