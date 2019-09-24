import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./Hello";

export interface TodoType { todo: {memo?: string; time?: Date;}[] };

const TodoList:React.FC = (props) => {
    const todo = React.useContext(todoContext);
    //const todo = {memo: '1', time: new Date()};
    console.log(1,todo);
 
    // ERROR: 처음만 렌더링됨 근데 콘솔은 찍힘 ㅎ..
    return (
        <ul>
            {
                todo.state.todo.map((item, index)=> 
                 (<li key={(index+1).toString()}>Memo: {item.memo} / Date: {item.time+''}</li>))
            }
        </ul>
    );

}

type Action = | { type: 'add', things: string } | { type: 'remove', things: string };

const initialState: TodoType = { todo: [{memo: '1', time: new Date()}] };
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
            state.todo.push({memo: action.things, time: new Date()});
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
    let value = {state, dispatch};

    return (
        <>
            <div>
                <label>
                    TODO: 
                    <input type="text" onInput={(c)=> setThings((c.target as HTMLInputElement).value)} />
                </label>
                <button onClick={()=> dispatch({type: 'add', things: things})}>Add</button>
            </div>
            <todoContext.Provider value={value}>
               <TodoList/>
            </todoContext.Provider>
        </>
    );
}