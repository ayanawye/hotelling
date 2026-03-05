import { authReducer } from '@entities/user/model/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@shared/api/baseApi';
import serviceReducer from '@entities/services/model/serviceSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  service: serviceReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
