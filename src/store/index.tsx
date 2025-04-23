import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './cartSlice';
// import { RootState } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart:cartSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector :TypedUseSelectorHook<RootState>=useSelector;
