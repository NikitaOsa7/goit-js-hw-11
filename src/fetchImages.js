import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '26637244-c7b5796a7998e630f0b738ee3';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchImages() {
         const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&pre_page=40&page=${this.page}`
        const response = await axios.get(url);
        this.page += 1;
        return response.data;
    }

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}