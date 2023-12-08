import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/api'

export const createPerson = createAsyncThunk('person/createPerson', api.createPerson);
export const updateUsername = createAsyncThunk('person/updateUsername', api.updateUsername);
export const getPerson = createAsyncThunk('person/getPerson', api.getPerson);

const personSlice = createSlice({
    name: 'personState',
    initialState: {
        createStatus: false,
        userStatus: false,
        currentPerson: [],
        currentStatus: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createPerson.pending, (state) => {
            state.createStatus = false
        })
        .addCase(createPerson.fulfilled, (state,action) => {
            console.log('create ', action.payload)
            state.currentPerson = action.payload
            state.createStatus = true
        })
        .addCase(updateUsername.pending, (state) => {
            state.userStatus = false
        })
        .addCase(updateUsername.fulfilled, (state, action) => {
            state.currentPerson[0].username = action.payload.username
            state.userStatus = true
        })
        .addCase(getPerson.pending, (state, action) => {
            state.currentStatus = false
        })
        .addCase(getPerson.fulfilled, (state, action) => {
            state.currentStatus = true
            state.currentPerson = action.payload
        })



    }

})

export const regState = (state) => state.personState;


export default personSlice.reducer;