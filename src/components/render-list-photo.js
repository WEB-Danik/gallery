"use strict";
import fetchData from "./pixabay-api.js";

const form = document.getElementById('search_form_container');
const galleryList = document.querySelector(".gallery_list");

const listPhotos = async (query = "") => {

    const getData = await fetchData(query);

    console.log('Data', getData)

    const renderGalleryItems = getData.hits
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

    galleryList.innerHTML = renderGalleryItems;
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query  = e.target.elements.name_photo.value.trim();

    if (!query) {
        await listPhotos("");
        return;
    }

    await listPhotos(query);
});

listPhotos("");