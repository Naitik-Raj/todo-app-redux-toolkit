import React from 'react';
import { useSelector } from 'react-redux';
import Todos from './Todos';

const TodoList = () => {
  const todos = useSelector(state => state.todo.todos);

  if (!Array.isArray(todos) || todos.length === 0) {
    return <p>No todos available</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todos key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
