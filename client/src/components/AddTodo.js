import React, { useContext } from 'react';
import { Context } from '../contexts/context';
import { useHttp } from '../hooks/http.hook';
import TextField from '@material-ui/core/TextField';

const AddTodo = ({ title, setTitle }) => {
    const { todos, setTodos } = useContext(Context);
    const { request } = useHttp();

    const addTodo = async e => {
        if (e.key === 'Enter') {
            const data = await request('/api/todos', 'POST', { title });
            setTodos([ ...todos, data.todo ]);
            setTitle('');
        }
    };

    return (
        <div className="add-todo-container">
            <TextField 
                id="standard-basic" 
                label="Title" 
                style={{width: '100%'}}
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyPress={addTodo}   
            />
        </div>
    );
};

export default AddTodo;