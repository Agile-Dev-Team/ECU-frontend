import { createSlice } from "@reduxjs/toolkit";

import axios from '../../../utils/axios';

import { News, NewsState } from '../../../@types/news';

import { dispatch } from "../../store";

const initialState: NewsState = {
  error: null,
  isLoading: false,
  news: [],
  sortBy:''
}

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  GET USER LIST
    getNewsSuccess(state, action) {
      const news = action.payload;
      state.news = news;
      state.isLoading = false;
    },

    addNewsSuccess(state, action) {
      state.news.push(action.payload);
    },

    // REMOVE USER BY ID
    removeNewsSuccess(state, action) {
      const news = state.news.filter((news) => action.payload.indexOf(news._id) === -1);

      return {
        ...state,
        news : [...news]
      }
    }
  }
});

export default slice.reducer;

export function getNewsList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/admin/news/');
      dispatch(slice.actions.getNewsSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function addNews(news : News) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/admin/news/add', news);
      dispatch(slice.actions.addNewsSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function removeNews(ids: string[]) {
  return async () => {  
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/admin/news/remove`, {ids});
      dispatch(slice.actions.removeNewsSuccess(ids));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}