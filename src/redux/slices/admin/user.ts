import { createSlice } from "@reduxjs/toolkit";

import axios from '../../../utils/axios';

import { UserListState, UserManager } from '../../../@types/user';

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

    // UPDATE USER
    updateUserSuccess(state, action) {
      const updatedUser = action.payload;
      const updatedUsers = state.users.map(user => {
        if(user._id === updatedUser._id)
          return updatedUser;
        return user
      });

      state.isLoading = false;
      state.users = updatedUsers;
    },

    // REMOVE USER
    removeUserSuccess(state, action) {
      state.users = state.users.filter((user) => action.payload.indexOf(user._id) === -1);
      state.isLoading = false;
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
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(account: UserManager, id: string | undefined) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/admin/user/${id}`, {
        ...account
      });
      dispatch(slice.actions.updateUserSuccess(account));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
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