import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayAPIServise from "./js/PixabayAPIServise";
import LoadMoreSection from "./js/LoadMoreSection";


(function() {

  function getResultMarkup({ hits }) {
    return hits
      .map(hit => {
          return `
          <a href=${hit.largeImageURL} class="photo-card">
              <img class ="photo" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <span class="info-item__label">Likes:&nbsp;</span>
                ${hit.likes}
              </p>
              <p class="info-item">
                <span class="info-item__label">Views:&nbsp;</span>
                ${hit.views}
              </p>
              <p class="info-item">
                <span class="info-item__label">Comments:&nbsp;</span>
                ${hit.comments}
              </p>
              <p class="info-item">
                <span class="info-item__label">Downloads:&nbsp;</span>
                ${hit.downloads}
              </p>
            </div>
          </a>
        `;
      })
      .join("");
  }

  function onFormSubmit(event) {
    event.preventDefault();
    clear();
    loadMoreSection.hide();

    const query = event.currentTarget.elements.searchQuery.value.trim();
    if (!query) {
      return Notify.info("Enter a search term");
    }

    pixabayApiService
      .getImages(query)
      .then((data) => {
        render(data, galleryElement);
      });
  }

  function onLoadMore() {
    loadMoreSection.busy();
    pixabayApiService
      .getNextImages()
      .then(data => {
        render(data, galleryElement);
      });
  }

  function render(data) {
    if (data.total === 0) {
      loadMoreSection.hide();
      Notify.failure(
        "Sorry, there are no images matching your search query. Please try again.",
      );
      return;
    }

    galleryElement.insertAdjacentHTML("beforeend", getResultMarkup(data));
    lightbox.refresh();

    if (galleryElement.children.length === data.totalHits) {
      loadMoreSection.hide();
      Notify.info(
        `We"re sorry, but you"ve reached the end of search results.`,
      );
      return;
    }

    loadMoreSection.show();
    loadMoreSection.ready();
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

  }

  function clear() {
    galleryElement.innerHTML = "";
  }

  const searchFormElement = document.querySelector("#search-form");
  const galleryElement = document.querySelector(".gallery");

  if (!searchFormElement || !galleryElement) {
    return;
  }

  const pixabayApiService = new PixabayAPIServise();
  const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });

  const loadMoreSection = new LoadMoreSection();
  loadMoreSection.setListener(onLoadMore);

  searchFormElement.addEventListener("submit", onFormSubmit);
})();


