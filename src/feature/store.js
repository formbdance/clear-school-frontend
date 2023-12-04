import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import orderSlice from "./sliceAssets/orderSlice";
import preloaderSlice from "./sliceAssets/preloaderSlice";
import personSlice from "./sliceAssets/personSlice";





export const store = configureStore({
    reducer: {
        userStates: userSlice,
        orderState: orderSlice,
        preloaderState: preloaderSlice,
        personState: personSlice,

    },

})


