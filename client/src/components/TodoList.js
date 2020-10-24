import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos }) => {
    return (
        <ul className="todos-ul">
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo._id} />
            ))}
        </ul>
    );
};