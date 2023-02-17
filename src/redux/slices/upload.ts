import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

//
import { dispatch } from '../store';

import { UploadFileState } from 'src/@types/uploadfile';

const initialState : UploadFileState = {
    isLoading: false,
    error: null,
    brand: [],
    model: [],
    generation: [],
    engine: [],
    power: '',
    torque: '',
    fuel: [],
    ecu: [],
    year: [],
}

const slice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
      },
      getBrand(state, action) {
        state.brand = action.payload;
      },
      getModel(state, action) {
        state.model = action.payload;
      },
      getVersion(state, action) {
        state.generation = action.payload;
      },
      getModelYear(state, action) {
        state.year = action.payload;
      },
      getEngineModel(state, action) {
        state.engine = action.payload;
      },
      getFuel(state, action) {
        state.fuel = action.payload;
      },
      getEcu(state, action) {
        state.ecu = action.payload;
      },
      
      hasError (state, action){
        state.isLoading = false;
        state.error = action.payload;
      }
    },
  });
  
  // Reducer
  export default slice.reducer;

  export function getBrand() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getAccount');
        const response = await axios.get(`/admin/vehicle/getBrand`);
        console.log('getBrand result', response.data);
        dispatch(slice.actions.getBrand(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getModel(brandName : string) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getModel');
        const response = await axios.post(`/admin/vehicle/getModel`,{brandName});
        console.log('getModel result', response.data);
        dispatch(slice.actions.getModel(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getVersion(brandName : string, modelName: string) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getVersion');
        const response = await axios.post(`/admin/vehicle/getVersion`,{brandName, modelName });
        console.log('getVersion result', response.data);
        dispatch(slice.actions.getVersion(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getModelYear(brandName : string, modelName: string, versionName: string ) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getModel');
        const response = await axios.post(`/admin/vehicle/getModelYear`,{brandName, modelName, versionName});
        console.log('getModel result', response.data);
        dispatch(slice.actions.getModelYear(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getEngineModel(brandName : string, modelName: string, versionName: string, modelYear: string) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getEngineModel');
        const response = await axios.post(`/admin/vehicle/getEngineModel`,{brandName, modelName, versionName, modelYear});
        console.log('getEngineModel result', response.data);
        dispatch(slice.actions.getEngineModel(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getFuel(brandName : string, modelName: string, versionName: string, modelYear: string, enginModel : string) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getFuel');
        const response = await axios.post(`/admin/vehicle/getFuel`,{brandName, modelName, versionName, modelYear, enginModel});
        console.log('getFuel result', response.data);
        dispatch(slice.actions.getFuel(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  export function getEcu(brandName : string, modelName: string, versionName: string, modelYear: string, enginModel : string, fuel : string) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        console.log('slice account getEcu');
        const response = await axios.post(`/admin/vehicle/getEcu`,{brandName, modelName, versionName, modelYear, enginModel, fuel});
        console.log('getEcu result', response.data);
        dispatch(slice.actions.getEcu(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }
  
  

