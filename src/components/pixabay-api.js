"use strict";

const API_KEY = '55578841-0743af66a955dc38fb526d14a';

const fetchData = async (query) => {
   try {
       const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`);
       const data = await response.json();

       if (!response.ok) {
           throw new Error(`HTTP Error: ${response.status}`);
       }

       return data;
   } catch (e) {
       console.error(e);
   };
};

export default fetchData;


// fetch(`https://pixabay.com/api/?key=${API_KEY}`, {
//     method: 'GET',
// })
//     .then(
//         response => response.json()
//     )
//     .then(
//         data => {console.log(data);}
//     )
//     .catch(
//         error => console.log(error)
//     );


// import axios from "axios";
//
// const $KEY = '55578841-0743af66a955dc38fb526d14a';
//
// let response = await axios.get( `https://pixabay.com/api/?key=${$KEY}` );
//
// console.log("Photo", response.data);