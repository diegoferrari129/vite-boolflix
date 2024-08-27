<script>
import FilterMovies from './FilterMovies.vue';
import { store } from '../store.js';

export default {
    data() {
        return {
            store
        }
    },

    components: {
        FilterMovies,
    },
}
</script>

<template>
    <FilterMovies />
    
</template>

<style lang="scss" scoped>
</style>