import { createSlice } from "@reduxjs/toolkit";

import axios from '../../../utils/axios';

import { UserListState } from '../../../@types/user';

import { dispatch } from "../../store";

const initialState: UserListState = {
  error: null,
  isLoading: false,
  users: []
}

const slice = createSlice({
  name: 'user',
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
    getUsersSuccess(state, action) {
      const users = action.payload;
      state.users = users;
      state.isLoading = false;
    },

    // GET USER BY ID
    // getUserSuccess(state, action) {}

    // REMOVE USER BY ID
    removeUserSuccess(state, action) {
      const users = state.users.filter((user) => action.payload.indexOf(user._id) === -1);

      return {
        ...state,
        users : [...users]
      }
    }
  }
});

export default slice.reducer;

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/admin/user/');
      dispatch(slice.actions.getUsersSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function removeUsers(ids: string[]) {
  return async () => {  
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/admin/user/remove`, {ids});
      dispatch(slice.actions.removeUserSuccess(ids));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}