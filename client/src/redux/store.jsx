import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice.jsx";
import loadersReducer from './loadersSlice.jsx'

const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loadersReducer
    },
});
export default store;