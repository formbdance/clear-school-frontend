import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/api'

export const getOrders = createAsyncThunk('user/getOrders', api.getOrders);
export const saveOrder = createAsyncThunk('user/saveOrder', api.saveOrder);
export const getOneOrder = createAsyncThunk('user/getOneOrder', api.getOneOrder)
export const deleteOrder = createAsyncThunk('user/deleteOrder', api.deleteOrder)
export const getFeedOrders = createAsyncThunk('user/getFeedOrders', api.getFeedOrders)

const orderSlice = createSlice({
    name: 'orderState',
    initialState: {
        orderList: [],
        oneOrder: [],
        feedOrders: [],
        status: 'idle',
        deleteStatus: false,
        loadorder: 'idle',

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'success'
            state.orderList = action.payload
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.status = 'error'
        })
        .addCase(saveOrder.fulfilled, (state, action) => {
            state.loadorder = 'success'
        })
        .addCase(getOneOrder.fulfilled, (state, action) => {
            state.oneOrder = action.payload;
        })
        .addCase(deleteOrder.pending, (state, action) => {
            state.deleteStatus = false
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.deleteStatus = true
        })

        .addCase(getFeedOrders.fulfilled, (state, action) => {
            state.feedOrders = action.payload
        })


    }

})

export const regState = (state) => state.orderState.orderList;


export default orderSlice.reducer;