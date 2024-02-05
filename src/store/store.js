import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./aside";
import { newsSlice } from "./aside/newsSlice";
import { sessionSlice } from "./global/sessionSlice";


export const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        news: newsSlice.reducer,
        session: sessionSlice.reducer,
    },
})
