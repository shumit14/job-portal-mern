import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

//LOGIN
export const loginUser = createAsyncThunk(
    '/auth/login',
    async (credential, thunkAPI)=>{
        try {
            const res = await axiosInstance.post('/auth/login',credential)
            localStorage.setItem('token',res.data.token)
            return res.data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

// REGISTRATION
export const registerUser = createAsyncThunk(
    '/auth/register',

    async (data, thunkAPI) => {
        try {
            await axiosInstance.post('/auth/register', data)
        } catch (error) {
            return thunkAPI.fulfillWithValue(error.response.data.message)
        }
    }
)
const authSlice = createSlice({
    name : 'auth',
    initialState: {
        user : null,
        loading : false,
        error : null
    },
    reducers : {
       logout : (state)=>{
        state.user = null,
        localStorage.removeItem('token')
       }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer