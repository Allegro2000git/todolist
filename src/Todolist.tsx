import {filterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


export type TodolistPropsType = {
    todoListID: string;
    title: string;
    tasks: Array<TaskType>;
    filter: filterValuesType;
    deleteTask: (todoListID: string, taskId: string) => void;
    changeTodolistFilter: (todoListID: string, filter: filterValuesType) => void;
    createTask: (todoListID: string, title: string) => void;
    changeTaskStatus: (todoListID: string, taskId: string, newStatus: boolean) =>void;
    deleteToDoList: (todoListID: string) => void;
    changeTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void;
    changeTodoListTitle: (todoListID: string, newListTitle: string) => void
}


export const Todolist = ({
        title,
        tasks,
        deleteTask,
        changeTodolistFilter,
        changeTaskStatus,
        createTask,
        todoListID,
        changeTaskTitle,
        changeTodoListTitle,
        deleteToDoList,
        filter}: TodolistPropsType) => {



    const TasksList = tasks.length === 0
        ? <span>Todolist is empty</span>
        : <ul>
            {tasks.map((t: TaskType) => {
            return (
                <li key={t.id} className={t.isDone ? "task_done" : "task"}>
                    <input
                        type={"checkbox"}
                        checked={t.isDone}
                        onChange={(e)=> changeTaskStatus(todoListID, t.id, e.currentTarget.checked)}
                    />
                    <EditableSpan title={t.title} changeTitle={(newTitle: string)=>changeTaskTitle(todoListID, t.id, newTitle)}/>
                    <Button title={"x"} onClickHandler={()=>deleteTask(todoListID, t.id)}/>
                </li>
                    )
                 })
            }
            </ul>

    const createTaskCallback = (newTaskTitle: string) => {
            createTask(todoListID,newTaskTitle)
    }

    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={title} changeTitle={(newTitle: string)=>changeTodoListTitle(todoListID, newTitle)}/>
                <Button title={"X"} onClickHandler={()=>deleteToDoList(todoListID)}/>
            </h3>
            <AddItemForm createItem={createTaskCallback} maxTitleLength={20}/>
            {TasksList}
            <Button
                classes={filter === "all" ? 'filterBtn-active' : ''}
                title={"All"}
                onClickHandler={()=>changeTodolistFilter(todoListID,"all")}/>
            <Button
                classes={filter === "active" ? 'filterBtn-active' : ''}
                title={"Active"}
                onClickHandler={()=>changeTodolistFilter(todoListID,"active")}/>
            <Button
                classes={filter === "completed" ? 'filterBtn-active' : ''}
                title={"Completed"}
                onClickHandler={()=>changeTodolistFilter(todoListID,"completed")}/>
        </div>
    );
}