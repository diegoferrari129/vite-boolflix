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

    query: "",

    movieResults: [],
    popularMovies: [],

    seriesResults: [],
    popularSeries: [],

    casts: {},
    genres: {},

    searchResults: [],

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
        
        const code = languageCode.toLowerCase();
        if (this.languageFlags[code]) {
            return `${this.languageFlags[code]} ${code.toUpperCase()}`;
        }
        return code.toUpperCase();
    },
    
    getYear(date) {
        return new Date(date).getFullYear();
    },

    // Metodo per eseguire la ricerca
    search(query) {
        if (query.length > 0) {
            Promise.all([
                axios.get(`${this.apiUrlMovie}?api_key=${this.apiKey}&query=${query}&language=it-IT`),
                axios.get(`${this.apiUrlSeries}?api_key=${this.apiKey}&query=${query}&language=it-IT`)
            ]).then(([movieRes, tvRes]) => {
                const movies = movieRes.data.results.map(movie => ({...movie, type: 'movie'}));
                const series = tvRes.data.results.map(series => ({...series, type: 'tv'}));
                this.searchResults = [...movies, ...series];
            });
        } else {
            this.searchResults = [];
        }
    },

    // Metodo per ottenere i film e serie TV più popolari
    getPopular(type) {
        const url = type === 'series' ? this.apiUrlPopularSeries : this.apiUrlPopularMovies;
        const target = type === 'series' ? 'popularSeries' : 'popularMovies';

        return axios.get(`${url}?api_key=${this.apiKey}&language=it-IT`)
            .then(response => {
                this[target] = response.data.results;
            });
    },


    // Metodo per ottenere il cast
    getCast(id, type, isSlider = false) {
        const url = type === 'movie' ? this.apiUrlMovieDetails : this.apiUrlSeriesDetails;

        axios.get(`${url}/${id}/credits?api_key=${this.apiKey}&language=it-IT`)
            .then(response => {
                if (isSlider) {
                    this.casts[id] = response.data.cast
                        .slice(0, 5)
                        .map(actor => ({
                            name: actor.name,
                            profile_path: actor.profile_path
                        }));
                } else {
                    this.casts[id] = response.data.cast
                        .slice(0, 5)
                        .map(actor => actor.name)
                        .join(', ');
                }
            });
    },

    // Metodo per ottenere i generi
    getGenres(id, type) {
        const url = type === 'movie' ? this.apiUrlMovieDetails : this.apiUrlSeriesDetails;

        axios.get(`${url}/${id}?api_key=${this.apiKey}&language=it-IT`)
            .then(response => {
                this.genres[id] = response.data.genres
                    .map(genre => genre.name)
                    .join(', ');
            });
    },

});