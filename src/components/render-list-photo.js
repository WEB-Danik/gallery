"use strict";
import fetchData from "./pixabay-api.js";
import {refs} from "./refs.js";


let currentPage = 1;
let currentQuery = "";
const PER_PAGE = 15;

const createGalleryList = (photos) => {
  return photos
      .map(photo => {
          return `
                <li class="gallery_item">
                 <button type="button" class="btn_photo_modal">
                  <img src="${photo.webformatURL}" alt="photo" width="360" height="200">
                   <div class="characteristic_container">
                    <div class="likes">
                     <p>Likes<br>${photo.likes}</p>
                    </div>
                    <div class="views">
                     <p>Views<br>${photo.views}</p>
                    </div>
                    <div class="comments">
                     <p>Comments<br>${photo.comments}</p>
                    </div>
                    <div class="downloads">
                     <p>Downloads<br>${photo.downloads}</p>
                    </div>
                   </div>
                 </button>
                </li>
            `;
      })
      .join("");
}

const updateLoadMoreBtn = (totalHits) => {
    const totalPages = Math.ceil(totalHits / PER_PAGE);
    console.log('totalPages', totalPages);
    if (currentPage >= totalPages) {
        refs.loadMore.hidden = true;

        return;
    };
    refs.loadMore.hidden = false;
};

const listPhotos = async (query = "", page = 1) => {
    const getData = await fetchData(query, page);

    console.log("Data", getData);

    const renderGalleryItems = createGalleryList(getData.hits);

    if (page === 1) {
        refs.galleryList.innerHTML = renderGalleryItems;
    } else {
        refs.galleryList.insertAdjacentHTML("beforeend", renderGalleryItems);
    }

    updateLoadMoreBtn(getData.totalHits);
};


refs.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = e.target.elements.name_photo.value.trim();

    if (!query) {
        await listPhotos(currentQuery, currentPage);
        return ;
    };

    await listPhotos(query, currentPage);
});

refs.loadMore.addEventListener('click',  async e => {
    currentPage += 1;
    await listPhotos(currentQuery, currentPage);
});

listPhotos("", currentPage);