import React, { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo.js';
import Loader from './components/Loader';
import { useHttp } from './hooks/http.hook';
import { Context } from './contexts/context';
import { TodoList } from './components/TodoList';
import { Typography } from '@material-ui/core';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('')
  const { request, loading } = useHttp();

  useEffect(() => {
    (async () => {
      const data = await request('/api/todos', 'GET');
      
      setTodos(data);
    })();
  }, [request]);

  return (
    <Context.Provider value={{
      todos, setTodos
    }}>
      <div className="container App">
        <div className="main-content">
          <Typography 
            variant="h4"
            align="center"
            children="React Todo App"
            style={{marginBottom: '32px'}}
          />

          <AddTodo 
            title={title} 
            setTitle={setTitle}
          />

          {
            loading ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <>
                <TodoList 
                  todos={todos}
                />
              </>
            )
          }

        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
