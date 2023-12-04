import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'userStates',
    initialState: {
        loginModal: false,
        menuModal: false,
        isLogged: false,
        uuid: '',
    },
    reducers: {
        setModal: (state) => {
            state.loginModal = !state.loginModal;
        },
        setIsLogged: (state, action) => {
            state.uuid = action.payload;
        },
        setMenu: (state, action) => {
            state.menuModal = action.payload;
        },
        setUuid: (state, action) => {
            state.uuid = action.payload;
        }
    },
});


export const {setModal, setIsLogged, setUuid, setMenu} = userSlice.actions;
export default userSlice.reducer