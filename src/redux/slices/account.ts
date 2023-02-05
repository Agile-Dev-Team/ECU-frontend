import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { ProductState, CartItem, Product } from '../../@types/product';
//
import { dispatch } from '../store';
import { AccountState, UserAccount } from 'src/@types/user';
import { actions } from './kanban';
import { StaticDatePicker } from '@mui/lab';

// ----------------------------------------------------------------------

const initialState: AccountState = {
  isLoading: false,
  error: null,
  _id: null,
  name: null,
  profileImage: null,
  phoneNumber: null,
  email: null,
  address:null,
  country: null,
  state: null,
  city: null,
  zipCode: null,
  role: null,
  about: null,
  facebookLink: null,
  instagramLink: null,
  linkedinLink: null,
  twitterLink: null,
  bills: null,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    getAccount(state, action) {
      console.log('accountreducer getaccount: ',action.payload);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    },
    updateAccount(state, action) {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    },
    hasError (state, action){
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading
} = slice.actions;

export function getAccount(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('slice account getAccount');
      const response = await axios.get(`/user/${id}`);
      console.log('getaccount result', response.data);
      dispatch(slice.actions.getAccount(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function setAccount(account: UserAccount, id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try{
      await axios.put(`/user/${id}`,{
        ...account
      });
      dispatch(slice.actions.updateAccount(account));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}
