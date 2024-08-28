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
    <header>
        <div>
            <h2>BOOLFLIX</h2>
        </div>
        <div class="pe-1" >
            <!-- FILTRO PER LA RICERCA DA PARTE DELL'UTENTE -->
            <Filter />
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header {
        background-color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;

        h2 {
            color: red;
        }
    }
</style>