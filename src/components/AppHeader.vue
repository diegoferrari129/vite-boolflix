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
    <!-- FILTRO PER LA RICERCA DA PARTE DELL'UTENTE -->
    <FilterMovies />
</template>

<style lang="scss" scoped>
</style>