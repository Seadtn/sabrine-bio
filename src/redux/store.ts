import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filters from './filter/slice.ts'
import cart from './cart/slice.ts'
import favorite from './favorite/slice.ts'

export const store = configureStore({
  reducer: {
		filters,
		cart,
		favorite,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();