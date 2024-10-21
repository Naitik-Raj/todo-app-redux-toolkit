import { useEffect } from 'react'
import './App.css'
import AddTodos from './components/AddTodos'
import TodoList from './components/TodoList'
import {Provider} from 'react-redux'
import {store} from './app/store'
import { setTodos } from './features/todo/todoSlice' // Import the action to set todos

function App() {
  useEffect(() => {
    // This effect runs once when the component mounts

    // Attempt to load todos from localStorage
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      // If todos exist in localStorage, parse them and update the Redux store
      store.dispatch(setTodos(JSON.parse(storedTodos)))
    }

    // Set up a subscription to the Redux store
    const unsubscribe = store.subscribe(() => {
      // Whenever the store state changes, save the todos to localStorage
      localStorage.setItem('todos', JSON.stringify(store.getState().todo.todos))
    })

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe()
  }, []) // Empty dependency array means this effect runs only once on mount

  return (
    // Wrap the app in a Redux Provider, giving all components access to the store
    <Provider store={store}>
      <h1>Todo App understanding redux toolkit</h1>
      {/* Render the AddTodos component for adding new todos */}
      <AddTodos />
      {/* Render the TodoList component to display all todos */}
      <TodoList />
    </Provider>
  )
}

export default App
