import { createSlice } from "@reduxjs/toolkit";
import { NewsState } from "src/@types/news";

import axios from '../../utils/axios';

//
import { dispatch } from '../store';

const initialState: NewsState = {
  error: null,
  isLoading: false,
  news: [],
  totalPages:0,
  currentPage:0,
  count: 0,
  sortBy:''
}

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getNewsSuccess(state, action) {
      state.news = action.payload.news;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.count = action.payload.count;
      state.isLoading = false;
    },
  }
});

export default slice.reducer;

export function getNewsList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/news');
      dispatch(slice.actions.getNewsSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}