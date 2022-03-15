import React, {FunctionComponent} from "react";
import TodoInterface from "../interfaces/TodoInterface";

interface Props {
    todo: TodoInterface;
    handleToggle: Function;
}

const Todo: FunctionComponent<Props> = (props => {
    const {todo, handleToggle} = props;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleToggle(parseInt(e.currentTarget.id));
    }

    return (
        <div id={todo.id.toString()} key={todo.id + todo.task} onClick={handleClick}
             className={todo.complete ? "strike" : ""}>
            {todo.task}
        </div>
    );
});

export default Todo;