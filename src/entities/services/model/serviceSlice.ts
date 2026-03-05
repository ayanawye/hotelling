import { createSlice } from '@reduxjs/toolkit';
import type { IGuest } from '@entities/guests/types';
import type { RootState } from '@app/store/store.ts';

interface IInitialState {
  orderUserService: IGuest | null;
}

export const INITIAL_STATE: IInitialState = {
  orderUserService: null,
};

export const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setOrderUserService: (state, { payload }) => {
      state.orderUserService = payload;
    },
  },
  extraReducers: () => {},
});

export const { setOrderUserService } = serviceSlice.actions;
export const serviceSelector = (state: RootState) => state.service;
export default serviceSlice.reducer;
