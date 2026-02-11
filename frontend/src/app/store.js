import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import jobReducer from "../features/auth/jobs/jobSlice"
export const store =   configureStore({
    reducer : {
        auth : authReducer,
        jobs : jobReducer
    }
})