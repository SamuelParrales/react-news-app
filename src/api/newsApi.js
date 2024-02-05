import axios from "axios";

export const newsApi = axios.create({
    baseURL: 'https://newsdata.io/api/1/',
  });


// ?apikey=pub_32428585eebda76633560d0cc08cc78348ac0&language=es&country=ec