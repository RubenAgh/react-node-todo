export default function reducer(state, action) {
    switch(action.type) {
        case 'add': 
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now(), title: action.payload, completed: false
                    }
                ]
            };
        case 'complete':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (+todo.id === +action.payload.id) {
                      todo.completed = action.payload.value;
                    }
            
                    return todo;
                  })
            }
        case 'update':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                      todo.title = action.payload.title;
                    }
            
                    return todo;
                  })
            }
        case 'delete': 
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        default:
            return state;
    }
}