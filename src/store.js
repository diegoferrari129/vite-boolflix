import { reactive } from "vue";
import axios from "axios";

export const store = reactive({

    apiKey: '198b31d198bf714f14e2b9df45bc7311',

    // API per la ricerca dei film
    apiUrlMovie: "https://api.themoviedb.org/3/search/movie",
    // API per i film più popolari
    apiUrlPopularMovies: "https://api.themoviedb.org/3/movie/popular",
    // API per il cast e i generi dei film
    apiUrlMovieDetails: "https://api.themoviedb.org/3/movie",

    // API per la ricerca delle serie TV        
    apiUrlSeries: "https://api.themoviedb.org/3/search/tv",
    // API per le serie TV più popolari
    apiUrlPopularSeries: "https://api.themoviedb.org/3/tv/popular",
    // API per il cast e i generi delle serie TV
    apiUrlSeriesDetails: "https://api.themoviedb.org/3/tv",

    // Array per i film più popolari
    popularMovies: [],
    // Array per le serie TV più popolari
    popularSeries: [],

    // Array per il cast dei film
    casts: {},
    // Array per i generi dei film
    genres: {},

    // Variabile per la query di ricerca
    query: "",
    // Array per i risultati della ricerca
    searchResults: [],
    // Filtro
    activeFilter: 'all',
    // Traccia se la ricerca è stata eseguita
    searchExecuted: false,

    // Flags delle lingue
    languageFlags: {
        'it': '🇮🇹',
        'en': '🇬🇧',
        'es': '🇪🇸',
        'fr': '🇫🇷',
        'de': '🇩🇪',
        'ja': '🇯🇵',
        'ko': '🇰🇷',
        'zh': '🇨🇳',
        'hi': '🇮🇳',
        'ru': '🇷🇺',
        'pt': '🇵🇹',
        'nl': '🇳🇱',
    },
    
    // Metodo per convertire il voto da 1-10 a 1-5 (arrotondato per eccesso)
    getVote(vote) {
        return Math.ceil(vote / 2);
    },

    // Metodo per ottenere il flag della lingua
    getFlag(languageCode) {
        if (!languageCode) return 'N/A';
        // Ritorna il flag della lingua se presente, altrimenti ritorna la lingua in maiuscolo
        return this.languageFlags[languageCode.toLowerCase()] || languageCode.toUpperCase();
    },
    
    // Metodo per ottenere l'anno di uscita del film
    getYear(date) {
        return new Date(date).getFullYear();
    },

    // Metodo per eseguire la ricerca
    search(query) {
        if (query.length > 0) {
            Promise.all([
                axios.get(`${this.apiUrlMovie}?api_key=${this.apiKey}&query=${query}`),
                axios.get(`${this.apiUrlSeries}?api_key=${this.apiKey}&query=${query}`)
            ]).then(([movieRes, tvRes]) => {
                this.searchResults = [...movieRes.data.results, ...tvRes.data.results];
                this.searchExecuted = true;
            });
        } else {
            this.searchResults = [];
            this.searchExecuted = false;
        }
    },

    // Metodo per ottenere i film e serie TV più popolari
    getPopular(type) {
        const url = type === 'series' ? this.apiUrlPopularSeries : this.apiUrlPopularMovies;
        const target = type === 'series' ? 'popularSeries' : 'popularMovies';
        
        return axios.get(`${url}?api_key=${this.apiKey}`).then(response => {
            this[target] = response.data.results;
        });
    },

    // Metodo per ottenere il cast
    getCast(id, type) {
        const url = type === 'movie' ? this.apiUrlMovieDetails : this.apiUrlSeriesDetails;

        return axios.get(`${url}/${id}/credits?api_key=${this.apiKey}`).then(response => {
            // Aggiunge i primi 5 attori al cast
            this.casts[id] = response.data.cast.slice(0, 5).map(actor => ({
                name: actor.name,
                profile_path: actor.profile_path,
            }));
        });
    },

    // Metodo per ottenere i generi
    getGenres(id, type) {
        const url = type === 'movie' ? this.apiUrlMovieDetails : this.apiUrlSeriesDetails;

        return axios.get(`${url}/${id}?api_key=${this.apiKey}`).then(response => {
            // Aggiunge i generi del film in formato stringa
            this.genres[id] = response.data.genres.map(genre => genre.name).join(', ');
        });
    },

    getFilteredResults() {
        if (this.activeFilter === 'all') return this.searchResults;
        return this.searchResults.filter(item => {
            if (this.activeFilter === 'movie') {
                return item.first_air_date === undefined;
            } else {
                return item.first_air_date !== undefined;
            }
        });
    }

});