<script>
import Cards from './Cards.vue';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    components: {
        Cards,
    },
}   
</script>

<template>
    <main>
        <Cards />
    </main>
</template>

<style lang="scss" scoped>
    main {
        background-color: #434343;
    }
</style>