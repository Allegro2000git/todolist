import './App.css'
import { Todolist } from './Todolist'
import {useState} from "react";


export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

export type filterValuesType = "all" | "active" | "completed";

export const App = () => {

  const ToDoListTitle_1  = "What to learn";

  const [todolistTasks,setTodolistTasks ] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "REACT", isDone: false},
    {id: 4, title: "Rest API", isDone: false},
    {id: 5, title: "Redux", isDone: false},
])

    const [filter, setFilter] = useState<filterValuesType>("all")


    const deleteTask = (taskId: number) => {
        const nextState: Array<TaskType> = todolistTasks.filter(t=>t.id !== taskId)
        setTodolistTasks(nextState);
}

    const changeTodolistFilter = (filter: filterValuesType) => {
      setFilter(filter);
    }

    const getFilteredTasks = (tasks: TaskType[], filterValue: filterValuesType) : Array<TaskType>=> {
        switch (filterValue) {
            case "active" :
                return tasks.filter(t=> !t.isDone);
            case "completed" :
                return tasks.filter(t=> t.isDone);
            default:
                return tasks;
        }
    }

  return (
      <div className="app">
        <Todolist title={ToDoListTitle_1} tasks = {getFilteredTasks(todolistTasks,filter)} deleteTask={deleteTask} changeTodolistFilter={changeTodolistFilter}/>
      </div>
  )
}