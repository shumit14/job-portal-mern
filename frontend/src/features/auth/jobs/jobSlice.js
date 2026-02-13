import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobApi, fetchJobApiById } from "./jobApi";


export const fetchJob = createAsyncThunk(
    '/jobs/fetchJobs',
    async (params,thunkAPI)=>{
        try {
          return  await fetchJobApi(params)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const fetchJobById = createAsyncThunk(
    '/jobs/fetchJobById',
    async(id,thunkAPI)=>{
        try {
            return await fetchJobApiById(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
            
        }
    }
)

 const jobSlice = createSlice({
    name : 'jobs',
    initialState : {
        list : [],
        jobDetails: null,
        page : 1,
        totalPages : 1,
        loading : false,
        error : null
    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchJob.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchJob.fulfilled,(state,action)=>{
            state.loading = false;
            state.list = action.payload.jobs
            state.page = action.payload.page
            state.totalPages = action.payload.totalPages
           
        })
        .addCase(fetchJob.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        // JOB DETAIL SLICE REDUCER
         .addCase(fetchJobById.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchJobById.fulfilled,(state,action)=>{
            state.loading = false;
            state.jobDetails = action.payload
           
        })
        .addCase(fetchJobById.rejected, (state)=>{
            state.loading = false
        })
    }
 })

 export default jobSlice.reducer