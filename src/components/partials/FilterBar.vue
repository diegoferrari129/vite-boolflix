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

<template>
    <div class="filter-bar d-flex justify-content-center gap-3 my-4">
        <!-- ALL -->
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'all' ? 'active' : ''"
            @click="store.activeFilter = 'all'">
            All
        </button>

        <!-- MOVIES -->
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'movie' ? 'active' : ''"
            @click="store.activeFilter = 'movie'">
            Movies
        </button>

        <!-- TV SERIES -->
        <button 
            class="filter-btn" 
            :class="store.activeFilter === 'tv' ? 'active' : ''"
            @click="store.activeFilter = 'tv'">
            TV Series
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/colors' as *;
@use '../../styles/variables' as *;
@import '../../styles/mixins';

.filter-btn {
    @include netflix-button;
    &:hover {
        background-color: $netflix-red-hover;
    }

    &.active {
        background-color: $netflix-red-hover;
    }
}
</style>
