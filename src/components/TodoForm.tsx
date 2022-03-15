import React, {FunctionComponent, useState} from "react";

interface Props {
    addTask: any;
}

const TodoForm: FunctionComponent<Props> = (props => {
    const [userInput, setUserInput] = useState('');
    const {addTask} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.currentTarget.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter task..."/>
            <button>Submit</button>
        </form>
    )
});

export default TodoForm;