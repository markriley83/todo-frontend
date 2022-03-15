import React, {MouseEventHandler, useState} from 'react';
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoInterface from "./interfaces/TodoInterface";
import axios, {AxiosResponse} from "axios";

function App() {
    const [todoList, setTodoList] = useState<Array<TodoInterface>>([]);

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/todo/').then((response: AxiosResponse<any>) => {
            setTodoList(response.data);
        }).catch((e: Error) => {
            console.log(e);
        });
    }, []);

    const handleToggle = (id: number) => {
        const task = todoList.find(e => e.id === id);
        axios.patch(`http://localhost:8000/api/todo/${id}/`, {
            complete: task ? !task.complete : false,
        }).then((response: AxiosResponse<any>) => {
            let mapped: TodoInterface[] = todoList.map((task: TodoInterface) => {
                return task.id === response.data.id ? {...task, complete: response.data.complete} : {...task}
            });
            setTodoList(mapped);
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    const handleFilter: MouseEventHandler<HTMLButtonElement> = () => {
        let filtered = todoList.filter(task => {
            return !task.complete;
        });
        setTodoList(filtered);
    }

    const addTask = (userInput: string) => {
        axios.post('http://localhost:8000/api/todo/', {
            task: userInput,
        }).then((response: AxiosResponse<any>) => {
            let copy = [...todoList];
            copy = [...copy, {
                id: response.data.id,
                task: response.data.task,
                complete: response.data.complete,
            }];
            setTodoList(copy);
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    return (
        <div className="App">
            <Header/>
            <TodoList todoList={todoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
            <TodoForm addTask={addTask}/>
        </div>
    );
}

export default App;
