import * as React from "react";
import { Todo } from "./Todo";

export interface HelloProps { compiler: string; framework: string; }
export interface TodoType { memo?: string; time?: Date; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, TodoType, {}> {
    render() {
        return (
            <>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Todo />
            </>
        );
    }
}