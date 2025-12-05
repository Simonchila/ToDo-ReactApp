import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => setNewTask(event.target.value);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') addTask();
    }

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks);
        }
    }

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} // ← attached Enter key support
                />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="move-button-up" onClick={() => moveTaskUp(index)}>Up</button>
                        <button className="move-button-down" onClick={() => moveTaskDown(index)}>Down</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
