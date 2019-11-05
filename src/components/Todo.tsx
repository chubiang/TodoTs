import * as React from "react";

export interface TodoType { todo: TodoMemo[] };
export interface TodoMemo { memo?: string; time?: string; }


const TodoList = (props) => {
  const todo = React.useContext(todoContext)
  
  return (
      <ul>
          {
              todo.state.todo.map((item, index)=> 
                (<li key={(index+1).toString()}>
                  <span>
                    Memo: {item['memo']} / Date: {item['time']+''}
                  </span>
                  <button onClick={(e) => props.removeFunc(todo.state.todo, index)}>Remove</button>
                </li>))
          }
      </ul>
  );
}




type Action = | { type: 'add', things: string } | { type: 'remove', things: string };

const initialState: TodoType = { todo: [{memo: '1', time: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}] };
export const todoContext = React.createContext<{
    state: TodoType;
    dispatch: (action:Action) => void;
}>({ 
    state: initialState, 
    dispatch: ()=> {} 
});

function reducer(state: TodoType, action: Action): TodoType {
    switch (action.type) {
        case 'add':
            state.todo.push({memo: action.things, time: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })});
            return state;
        return state;
        // case 'remove':
        // return ;
    }
}


export function TodoContextProvider (props:any) {
    // hook
    const [things, setThings] = React.useState('');
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [remove, setRemove] = React.useState(false);
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
      setRemove(true);
    }

    React.useEffect(() => {
      setRemove(false);
    });

    return (
        <>
            <div>
                <label>
                    TODO: 
                    <input type="text" onChange={(c)=> { targetVal = (c.target as HTMLInputElement).value; }} />
                </label>
                <button onClick={()=> changeValue()}>Add</button>
            </div>
            <todoContext.Provider value={value}>
               <TodoList removeFunc={removeItem}/>
            </todoContext.Provider>
        </>
    );
}