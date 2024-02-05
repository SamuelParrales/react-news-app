import { createSlice } from '@reduxjs/toolkit';

const country = localStorage.getItem('lang') || 'us';
export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        lang: localStorage.getItem('lang')|| window.navigator.language.slice(0,2),
        country:country,
        lat: '',
        lon: '',
    },
    reducers: {
    
        setSession: (state,{payload})=>{
            state.news = payload.lang;                                               
            state.country = payload.country;                                               
            state.lat = payload.lat;                                               
            state.lon = payload.lon;                                               
        },
        setLat: (state,{payload})=>{
            localStorage.setItem('lat',payload)
            state.lat = payload;
        },
        setLon: (state,{payload})=>{
            localStorage.setItem('lon',payload)
            state.lon = payload;
        },
        setLang: (state,{payload})=>{
            localStorage.setItem('lang',payload)
            document.documentElement.lang =payload;
            state.lang = payload;
        },
        setCountry: (state,{payload})=>{
            localStorage.setItem('country',payload)
            
            state.country = payload;
        },
        clearSession:(state)=>{
            state.lang = '';
            state.country = '';
        }
    }
});

export const {setSession,clearSession,setCountry,setLang,setLat,setLon} = sessionSlice.actions;