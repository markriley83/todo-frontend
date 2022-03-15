import React, {FunctionComponent, MouseEventHandler} from "react";
import Todo from './Todo';
import TodoInterface from "../interfaces/TodoInterface";

interface Props {
    todoList: TodoInterface[];
    handleToggle: Function;
    handleFilter: MouseEventHandler<HTMLButtonElement>;
}

const TodoList: FunctionComponent<Props> = (props => {
    const {todoList, handleToggle, handleFilter} = props;
    return (
        <div>
            {todoList.map((todo) => {
                return (
                    <Todo key={todo.id} todo={todo} handleToggle={handleToggle}/>
                )
            })}
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
});

export default TodoList;