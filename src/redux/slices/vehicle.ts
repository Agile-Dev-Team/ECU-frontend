import { createSlice } from "@reduxjs/toolkit";
import { VehicleListState } from "src/@types/vehicle";

import axios from '../../utils/axios';

//
import { dispatch } from '../store';

const initialState: VehicleListState = {
  isLoading: false,
  error: null,
  vehicles: [],
  page: 0,
  limit: 10,
  search: '',
  totalCount: 0
}

const slice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getVehicles(state, action) {
      state.vehicles = action.payload.vehicles;
      state.totalCount = action.payload.totalPages;
      state.isLoading = false;
    }
  }
});

export default slice.reducer;

export function getVehicles(page: number, limit: number, search: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.post('/api/vehicle/getData', {
        page: page,
        limit: limit,
        search: search
      });
      dispatch(slice.actions.getVehicles(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}