import {filterValuesType, TaskType} from "./App.tsx";
import {TodoListHeader} from "./ToDoListHeader.tsx";
import {AddForm} from "./AddForm.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {Button} from "./Button.tsx";

export type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (taskId: number) => void,
    changeTodolistFilter: (filter: filterValuesType) => void
}


export const Todolist = ({title, tasks, deleteTask, changeTodolistFilter}: TodolistPropsType) => {


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
            <AddForm/>
            {TasksList}
           <FilterButtons changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
}