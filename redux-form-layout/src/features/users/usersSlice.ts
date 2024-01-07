import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export interface UserProps {
    id:string;
    name:string;
}

const USERS_URL: string = "https://jsonplaceholder.typicode.com/users";

const initialState:Array<UserProps> = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;