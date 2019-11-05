import * as React from "react";

export interface TodoType { todo: TodoMemo[] };
export interface TodoMemo { memo?: string; time?: string; }


const TodoList = (props) => {
  const todo = React.useContext(todoContext);

  function editValue(val, index) {
    todo.state.todo.forEach((v, i) => {
      if (index === i) {
        v['memo'] = val;
        v['time'] = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    });
  }

  return (
      <ul>
        {
          todo.state.todo.map((item, index)=> 
            (<li key={(index+1).toString()}>
              { props.editCheck && props.editIdex() === index ?
              (<input type="text" defaultValue={item.memo} onInput={(e) => editValue((e.target as HTMLInputElement).value, index)} />) : (
                <span>
                  Memo: {item['memo']} / Date: {item['time']+''}
                </span>
              )}
              <button onClick={(e) => props.removeFunc(todo.state.todo, index)}>Remove</button>
              <button onClick={(e) => { props.editFunc(todo.state.todo, index); props.editIdex(index); }}>Edit</button>
            </li>))
        }
      </ul>
  );
}

type Action = | { type: 'add', things: string } | { type: 'remove', things: string };

// const initialState: TodoType = { todo: [{memo: '1', time: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}] };
export const todoContext = React.createContext<{
    state: TodoType;
    dispatch: (action:Action) => void;
}>({ 
    state: null, 
    dispatch: ()=> {} 
});

function reducer(state: TodoType, action: Action): TodoType {
    switch (action.type) {
        case 'add':
          state.todo.push({memo: action.things, time: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })});
          return state;
        case 'remove':
          return state;
    }
}


export function TodoContextProvider (props:any) {
    // hook
    const [things, setThings] = React.useState('');
    const [state, dispatch] = React.useReducer(reducer, {todo: []});
    const [remove, setRemove] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    let value = {state, dispatch};
    let targetVal;

    function changeValue() {
      if (targetVal) {
        dispatch({type: 'add', things: targetVal});
        setThings(targetVal);
      }
    }

    function removeItem(todo, index) {
      todo.splice(index, 1);
      // dispatch({type: 'remove', things: null});
      setRemove(true);
    }

    function editCheck() {
      return edit;
    }

    function editItem(todo) {
      setEdit(edit ? false: true);
      console.log(todo, edit);
      return todo;
    }

    function editIdex(idex?) {
      if (idex > -1) {
        setIndex(idex);
      }
      console.log(index);
      
      return index;
    }

    React.useEffect(() => {
      setRemove(false);
    });

    return (
        <>
            <div>
                <label>
                    TODO: 
                    <input type="text" onInput={(c)=> { targetVal = (c.target as HTMLInputElement).value; }} />
                </label>
                <button onClick={()=> changeValue()}>Add</button>
            </div>
            <todoContext.Provider value={value}>
               <TodoList removeFunc={removeItem} editFunc={editItem} editIdex={editIdex} editCheck={editCheck()} />
            </todoContext.Provider>
        </>
    );
}