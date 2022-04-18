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

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", fetchGallery);

const totalHits = onSearch.hits

function onSearch(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
    imagesApiService.query = event.currentTarget.searchQuery.value;
    imagesApiService.resetPage();
    totalImages = 0;
    fetchGallery();
};

function onFetchError(error) {
    Notify.failure('Oops, error');
    console.log(error);
}

async function fetchGallery() {
    try {
        const newImages = await imagesApiService.fetchImages();
        return renderImages(newImages);
    }
    catch (error) {
        onFetchError(error);
    };
};



function renderImages(images) {
    if (images.hits.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        const markup = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class ="photo-card" href =""${largeImageURL}>
            <img class = "gallery__image" src = "${webformatURL}" alt ="${tags}" loading = "lazy" />
            <div class ="info">
                <p class="info-item">
                    <b>Likes</b><br>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b><br>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b><br>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b><br>${downloads}
                </p>
            </div>
        </div>
        `).join('');

        refs.gallery.insertAdjacentHTML('beforeend', markup);
        refs.loadMoreBtn.classList.remove('is-hidden');

        totalImages += 40;
        if (totalImages === 40) {
            Notify.success(`We found ${images.totalHits} images for you.`)
        };
        if (images.totalHits <= totalImages) {
            Notify.failure("We're sorry, but you've reached the end of search results.")
            refs.loadMoreBtn.classList.add('is-hidden')
        };
    };
    const lightBox = new SimpleLightbox('.gallery div', { captionDelay: 250 });
    if (totalImages > 40) {
        lightBox.refresh();
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight, behavior: "smooth", });
    };
};



