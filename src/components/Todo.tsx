import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TodoType { memo?: string; time?: Date; }
type Action = | { type: 'add' } | { type: 'remove' };

function reducer(state: TodoType, action: Action): TodoType[] {
    switch (action.type) {
        case 'add':
        return [state];
        // case 'remove':
        // return ;
    }
}

const todoContext = React.createContext([]);

const initialState: TodoType[] = [];

export const Todo: React.FC<TodoType> = (props) => {
    // hook
    // const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <div>
            <form>
                <label>
                    TODO: 
                    <input type="text" />
                </label>
                <button>Add</button>
            </form>
            <ul>
                {/*
                <todoContext.Provider value={state}>
                    <TodoList />
                </todoContext.Provider>
                */}
                <TodoList />
            </ul>
        </div>
    );
}

const TodoList:React.FC<TodoType> = (props: TodoType) => {
    //const todo = React.useContext(todoContext);
    const todo = {memo: '1', time: new Date()};
    console.log(todo);

    return (
        <li><span>Memo: </span>{todo.memo}<span> / Date: </span>{todo.time + ''}</li>
    );

}