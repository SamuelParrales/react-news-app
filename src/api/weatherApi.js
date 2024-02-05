import axios from "axios";

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
  });

  

//   if (navigator.geolocation) { //check if geolocation is available
//     navigator.geolocation.getCurrentPosition(function(position){
//       console.log(position);
//     });   
// }