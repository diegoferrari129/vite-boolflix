<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },

    methods: {
        // CHIAMATA API
        // movies
        getMovies() {
            axios.get(store.apiMovies+store.searchQuery).then((result) => {
                store.movies = result.data.results;
                console.log(store.movies)
            });

        },
        // TV series
        getSeries() {
            axios.get(store.apiSeries+store.searchQuery).then((result) => {
                store.series = result.data.results;
                console.log(store.series)
            });
        },

        // filter for both movies and TV series
        getShows() {
            this.getMovies();
            this.getSeries();
        },
    },
}
</script>

<template>
    <!-- INPUT UTENTE PER FILTRARE LE CHIAMATE API TRAMITE L'EVENTO CLICK DI UN BOTTONE-->
    <div class="row">
        <div class="col-auto">
            <input type="text" class="form-control" v-model="store.searchQuery" placeholder="Inserisci un titolo...">
        </div>
       <div class="col-auto ps-0 pe-3">
           <button class="btn btn-danger" @click="getShows">Cerca</button>
       </div>
    </div>
</template>

<style lang="scss" scoped>

</style>