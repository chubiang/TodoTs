import * as React from "react";
import { TodoContextProvider } from "./Todo";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const Hello: React.FC = (props) => {
 
    return (
        <>
            <TodoContextProvider />
        </>
    );
}