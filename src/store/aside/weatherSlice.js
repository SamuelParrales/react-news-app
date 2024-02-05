import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weathers:[],
        weathersDay:[],
        isRequesting:false,
        city:{},
        
    },
    reducers: {
        requestData:(state)=>{
            state.isRequesting = true;
        },
        setData: (state,{payload})=>{
            state.weathers = payload.weathers;
            state.city = payload.city;
            state.weathersDay = [];
            state.weathersDay.push(state.weathers[0])
                                                                    //8am
                                                                    //First hour isn't utf
            let init = 24-(new Date(state.weathers[0].dt*1000)).getHours() +8;
            
            init=  parseInt(init/3); 
        
            for (let i=init;i<state.weathers.length;i+=8)
            {
                state.weathersDay.push(state.weathers[i]);
            }
        },
        requestedData: (state)=>{
            state.isRequesting = false;
        },
        clearData:(state)=>{
            state.weathers = [];
        }
    }
});

export const {setData,requestData,requestedData,clearData} = weatherSlice.actions;