import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news:[],
        search: [],
        searchText: '',
    },
    reducers: {
    
        setNews: (state,{payload})=>{
            state.news = payload.news;                                               
        },
        setNewsSearch:(state,{payload})=>{
            state.search = payload.search;                                               
        },
        clearNews:(state)=>{
            state.news = [];
        },
        setSearchText:(state,{payload})=>{
          
            state.searchText = payload.searchText;                                               
        },
    }
});

export const {setNews,clearNews,setNewsSearch,setSearchText} = newsSlice.actions;