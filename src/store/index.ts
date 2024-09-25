import { configureStore } from '@reduxjs/toolkit';
import donationsReducer from './donations';

const store = configureStore({
  reducer: {
    donations: donationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
