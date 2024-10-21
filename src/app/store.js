//configure store
import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
//make the store 
export const store = configureStore({
    reducer:{
        todo: todoReducer,
    }
})