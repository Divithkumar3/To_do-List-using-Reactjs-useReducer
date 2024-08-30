import React, { useReducer } from 'react';
import './App.css';

let initialState = {
  todo: [],
  list: '',
};

let process = (state, action) => {
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        todo: [...state.todo, { text: state.list, completed: false }],
        list: '',
      };
    case 'Delete':
      return {
        ...state,
        todo: state.todo.filter((list) => list.text !== action.payload),
      };
    case 'Update':
      return { ...state, list: action.payload };
    case 'Completed':
      if (action.payload) {
        return {
          ...state,
          todo: state.todo.map((list) =>
            list.text === action.payload
              ? { ...list, completed: !list.completed }
              : list
          ),
        };
      }
      return state;
    default:
      return state;
  }
};

function Call() {
  let [state, dispatch] = useReducer(process, initialState);

  let addtodo = (e) => {
    e.preventDefault();
    dispatch({ type: 'Add' });
  };

  let deletetodo = (list) => {
    dispatch({ type: 'Delete', payload: list });
  };

  const todocompleted = (list) => {
    dispatch({ type: 'Completed', payload: list });
  };

  return (
    <div className='div'>
      <h1>Todo List:</h1>
      <form onSubmit={addtodo}>
        <input
          type="text"
          value={state.list}
          onChange={(e) =>
            dispatch({ type: 'Update', payload: e.target.value })
          } placeholder='TYPE HERE'
        /><br></br>
        <button className='but' type="submit">Add the List</button>
      </form>
      <ol>
        {state.todo.map((list) => (
          <li
            key={list.text}
            style={{
              textDecoration: list.completed ? 'line-through' : 'none',
            }}
          >
            {list.text}
            <button className='Del' onClick={() => deletetodo(list.text)}>Delete</button>
            <button className='com' onClick={() => todocompleted(list.text)}>
              {list.completed ? 'Undo' : 'Completed'}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Call;
