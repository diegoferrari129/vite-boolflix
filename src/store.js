import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    apiUrlMovie: "https://api.themoviedb.org/3/search/movie",
    apiUrlSeries: "https://api.themoviedb.org/3/search/tv",
    apiUrlPopularSeries: "https://api.themoviedb.org/3/tv/popular",
    apiUrlPopularMovies: "https://api.themoviedb.org/3/movie/popular",
    apiKey: '198b31d198bf714f14e2b9df45bc7311',
    query: "",
    movieResults: [],
    seriesResults: [],
    popularSeries: [],
    popularMovies: [],
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

    // Metodo per ottenere il flag della lingua
    getFlag(languageCode) {
        if (!languageCode) return 'N/A';
        
        const code = languageCode.toLowerCase();
        if (this.languageFlags[code]) {
            return `${this.languageFlags[code]} ${code.toUpperCase()}`;
        }
        
        return code.toUpperCase();
    },

    // Metodo per eseguire la ricerca
    async search(query) {
        if (query.length > 0) {
            this.searchExecuted = true;
            
            try {
                // Ricerca film e serie TV in parallelo
                const [movieResponse, seriesResponse] = await Promise.all([
                    axios.get(this.apiUrlMovie, {
                        params: {
                            api_key: this.apiKey,
                            query: query,
                            language: 'it-IT'
                        }
                    }),
                    // Ricerca serie TV
                    axios.get(this.apiUrlSeries, {
                        params: {
                            api_key: this.apiKey,
                            query: query,
                            language: 'it-IT'
                        }
                    })
                ]);

                // Aggiorna i risultati
                this.movieResults = movieResponse.data.results;
                this.seriesResults = seriesResponse.data.results;
                
            } catch {
                // In caso di errore, resetta i risultati
                this.movieResults = [];
                this.seriesResults = [];
            }
        } else {
            // Resetta i risultati
            this.movieResults = [];
            this.seriesResults = [];
            this.searchExecuted = false;
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

    // Metodo per convertire il voto da 1-10 a 1-5 (arrotondato per eccesso)
    getVote(vote) {
        return Math.ceil(vote / 2);
    }
});