import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import ImagesApiService from './fetchImages';

const refs = {
    searchForm: document.querySelector(".search-form"),
    loadMoreBtn: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
};

const imagesApiService = new ImagesApiService();
let totalImages = 0;

function onSearch(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden')
};

