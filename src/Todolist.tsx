import {filterValuesType, TaskType} from "./App.tsx";
import {TodoListHeader} from "./ToDoListHeader.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";


export type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    deleteTask: (taskId: string) => void;
    changeTodolistFilter: (filter: filterValuesType) => void;
    createTask: (title: string) => void;
}


export const Todolist = ({title, tasks, deleteTask, changeTodolistFilter, createTask}: TodolistPropsType) => {


    const [taskTitle, setTaskTitle] = useState<string>("");


    const createTaskHandler = () => {
        createTask(taskTitle);
        setTaskTitle("")
    }

    const maxTitleLengthError = taskTitle.length > 10

    const TasksList = tasks.length === 0
        ? <span>Todolist is empty</span>
        : <ul>
            {tasks.map(t => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <Button title={"x"} onClickHandler={()=>deleteTask(t.id)}/>
                </li>
                    )
                 })
            }
            </ul>

    return (
        <div className={"todolist"}>
            <TodoListHeader title={title}/>
            <div>
                <input value={taskTitle} onChange={(e: ChangeEvent<HTMLInputElement>)=> setTaskTitle(e.currentTarget.value)} onKeyDown={(e)=> {
                    if(e.key === "Enter" && taskTitle && !maxTitleLengthError){
                        createTaskHandler();
                    }
                }}/>
                <Button title={"+"} onClickHandler={createTaskHandler} disabled={!taskTitle.length || maxTitleLengthError}/>
            </div>
            {!taskTitle && <span>Enter title, please</span>}
            { (taskTitle && !maxTitleLengthError) && <div>Max title length is 10 charters</div>}
            {maxTitleLengthError && <div style={{color:"red"}}>Your task is too long</div>}
            {TasksList}
           <FilterButtons changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
}