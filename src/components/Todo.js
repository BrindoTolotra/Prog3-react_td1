import React, {useState} from "react";

export const Todo = () => {
    const [todo,setTodo] = useState([]);

    const [newTodo,setNewTodo] = useState({
        id: '',
        name: '',
        isDone: false
    })


    const generateId = () => {
        return (Date.now()
            .toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase();
    };

    const handleChange = (event) => {
        setNewTodo({
            id: generateId(),
            name: event.target.value,
            isDone: false
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodo([...todo,newTodo])
        setNewTodo({
            id: '',
            name: '',
            isDone: false
        })
        console.log(newTodo)
    }

    return (
        <>
            <div className="container">
                <div className="todo-container">
                    <h1>TODO</h1>
                    <form id="adding-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={newTodo.name}
                            onChange={handleChange}/>
                        <button type="submit" id="submit-button">Add</button>
                    </form>
                    <div className="todo">
                        {todo.filter((todo) => !todo.isDone).map((item, index)=>(
                            <div key={index}>
                                <span>{item.name}</span>
                                <input id="status-checkbox" type="checkbox" onChange={() => {
                                    const updatedList = todo.map(todo => {
                                        if (todo.id === item.id) {
                                            todo.isDone = true;
                                        }
                                        return todo;
                                    });
                                    setTodo(updatedList);
                                }}>
                                </input>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="done-container">
                    <h1>DONE</h1>
                    <div className="done">
                        {todo.filter((todo) => todo.isDone).map((item, index)=>(
                            <div key={index}>
                                <div key={index}>
                                    <span>{item.name}</span>
                                    <input id="status-checkbox" type="checkbox" defaultChecked="true" onChange={() => {
                                        const updatedList = todo.map(todo => {
                                            if (todo.id === item.id) {
                                                todo.isDone = false;
                                            }
                                            return todo;
                                        });
                                        setTodo(updatedList);
                                    }}>
                                    </input>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}