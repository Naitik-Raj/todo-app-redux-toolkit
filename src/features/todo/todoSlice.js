//create reducer
import {createSlice, nanoid} from "@reduxjs/toolkit";

// This code creates a Redux slice for managing todo items using Redux Toolkit.

//create the initial state for the todo (it can be array or object)
const initialState = {
    todos: [{id: 1, text: "Todo 1", isComplete: false}]
}

// The todoSlice is created using createSlice from Redux Toolkit.
// It defines the name of the slice, initial state, and reducers.
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    //reducers have properties and methods to handle the state
    reducers:{
        //this function will have the access to the state and action(action ke under jo v data pass ho raha hai)
        addTodo:(state, action) => {
            //adding new todo object to the todos array
            //Note: we can use api to get the data from the server
            const todo = {
                id: nanoid(), // Generates a unique ID for the new todo
                text: action.payload, // The text of the todo comes from the action payload
                isComplete: false  // New todos are not completed by default
            }
            //now update the state
            state.todos.push(todo) // Adds the new todo to the array
        },
        removeTodo:(state, action) => {
            //filter out the todo that has the id that is equal to the action.payload
            state.todos = state.todos.filter((item) => item.id !== action.payload)
            // This removes the todo with the specified ID
        },
        updateTodo: (state, action) => {
            // Find the todo that has the id that is equal to action.payload.id and update the text
            state.todos = state.todos.map((item) => 
                item.id === action.payload.id ? { ...item, text: action.payload.text } : item
            )
            // This updates the text of the todo with the specified ID
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find(item => item.id === action.payload);
            if (todo) {
                todo.isComplete = !todo.isComplete;
            }
            // This toggles the completion status of the todo with the specified ID
        },
        setTodos: (state, action) => {
          // This reducer function is responsible for setting the entire todos array
          // It replaces the current state's todos with the new array provided in the action payload
          // This is useful for initializing the todos from an external source (e.g., localStorage or an API)
          state.todos = action.payload
        }
    }
})

// Exporting the action creators for use in other parts of the application
export const {addTodo, removeTodo, updateTodo, toggleComplete, setTodos} = todoSlice.actions;
//store ko sare ke sare reducer pass karna padega kyuki store har kisi se value leke update nahi karta hai
//it is only allowed to pass the reducer to the store
export default todoSlice.reducer;
// Exporting the reducer to be used in the Redux store
