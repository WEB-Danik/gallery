"use strict";
import fetchData from "./pixabay-api.js";

const listPhotos = async () => {

    const galleryList = document.querySelector(".gallery_list");

    const datas = await fetchData("cat");

    console.log('Data', datas)

    const galleryItems = datas.hits
        .map(photo => {
            return `
                <li class="gallery_item">
                <img src="${photo.webformatURL}" alt="photo" width="360" height="200">
                </li>
            `;
        })
        .join("");

    galleryList.innerHTML = galleryItems;
};

listPhotos();