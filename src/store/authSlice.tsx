import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface userData {
    accessToken: string,
    email: string,
    firstName: string,
    gender: string,
    id: number,
    image: string,
    lastName: string,
    refreshToken: string,
    username: string,
}

interface AuthState {
    token: string;
    username: string;
    id: number;
    isOpen: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    id: Number(localStorage.getItem('username')) || 0,
    isOpen: false,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<userData>) {
            state.token = action.payload.accessToken;
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.isOpen= true;
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('id', action.payload.id.toString());
        },
        
        logout(state) {
            state.token = '';
            state.username = '';
            state.id = 0;
            state.isOpen=false;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('id');
        }

    }
})

export const { setData, logout } = authSlice.actions;
export default authSlice.reducer;