import React, { useContext, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import { Context } from '../contexts/context';
import { EditOutlined, CloseOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { useHttp } from '../hooks/http.hook';

const useStyles = makeStyles({
  li: {
    backgroundColor: '#d3d3d373',
    marginBottom: '6px',
    width: '100%',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    listStyle: 'none'
  },
  label: {
    width: '100%',
  }
});

export const TodoItem = ({ todo }) => {
    const [title, setTitle] = useState(todo.title);
    const [edit, setEdit] = useState(false);
    const { todos, setTodos } = useContext(Context);
    const { request } = useHttp();

    const classes = useStyles();

    const update = async () => {
        const { success, changedTodo } = await request(`/api/todos`, 'PUT', { id: todo._id, value: title });
        
        if (success) {
            setTodos(
                todos.map(todo => {
                    if (todo._id === changedTodo._id) {
                        todo.title = changedTodo.title;
                    }

                    return todo;
                })
            );
        } else {
            alert('Error');
        }

        setEdit(false);
    };

    const updateTodo = e => {
        if (e.key === 'Enter') {
            update();
        }
    };

    const handleChange = async e => {
        const { success, changedTodo } = await request(`/api/todos/complete`, 'POST', { id: todo._id, value: e.target.checked });
        
        if (success) {
            setTodos(
                todos.map(todo => {
                    if (todo._id === changedTodo._id) {
                        todo.completed = changedTodo.completed;
                    }

                    return todo;
                })
            );
        } else {
            alert('Error');
        }
    };

    const handleDelete = async e => {
        const { success, deletedTodo } = await request(`/api/todos/${todo._id}`, 'DELETE');

        if (success) {
            setTodos(
                todos.filter(t => t._id !== deletedTodo._id)
            );
        } else {
            alert('Error');
        }
    };

    return (
        <li className={`todo-item ${classes.li}`}>
            <FormControlLabel
                className={classes.label}
                control={
                    <Checkbox
                        checked={todo.completed}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label={
                    <div className="todo-title-icon">
                        {
                            !edit ? (
                                <span>{todo.title}</span>
                            )
                            : (
                                <TextField 
                                    id="standard-basic" 
                                    label="Title" 
                                    style={{width: '80%'}}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    onKeyPress={updateTodo}   
                                />
                            )
                        }
                    </div>
                }
            />

            <div className="icons-container">
                {
                    edit ? (
                        <>
                            <IconButton 
                                children={
                                    <CheckIcon />
                                }
                                onClick={update}
                            />
                            <IconButton 
                                children={
                                    <CloseOutlined />
                                }
                                onClick={() => setEdit(prev => !prev)}
                            />
                        </>
                    )
                    : (
                        <IconButton 
                            children={
                                <EditOutlined />
                            }
                            onClick={() => setEdit(prev => !prev)}
                        />
                    )
                }
                
                <IconButton 
                    children={
                        <DeleteOutlinedIcon />
                    }
                    onClick={handleDelete}
                />
            </div>
        </li>
    );
};