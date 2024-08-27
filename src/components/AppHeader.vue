<script>
import Filter from './Filter.vue';
import { store } from '../store.js';

export default {
    data() {
        return {
            store
        }
    },

    components: {
        Filter,
    },
}
</script>

<template>
    <!-- FILTRO PER LA RICERCA DA PARTE DELL'UTENTE -->
    <Filter />
</template>

<style lang="scss" scoped>
</style>