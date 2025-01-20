import './App.css'
import { Todolist } from './Todolist'
import {useState} from "react";
import {v1} from "uuid";



export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type filterValuesType = "all" | "active" | "completed";

export const App = () => {

  const ToDoListTitle_1  = "What to learn";

  const [tasks,setTasks ] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: false},
    {id: v1(), title: "REACT", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
])

    const createTask = (title: string) => {

      const newTask: TaskType = {
          id: v1(),
          title: title,
          isDone: false
      }
      setTasks([newTask, ...tasks]);
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
      const nextChangeState: Array<TaskType> = tasks.map(task=> task.id === taskId ? {...task, isDone: newStatus} : task)
          setTasks(nextChangeState)
    }


    const deleteTask = (taskId: string,) => {
        const nextState: Array<TaskType> = tasks.filter(t=>t.id !== taskId)
        setTasks(nextState);
}

    const [filter, setFilter] = useState<filterValuesType>("all")
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
        <Todolist title={ToDoListTitle_1} tasks = {getFilteredTasks(tasks,filter)} deleteTask={deleteTask} changeTodolistFilter={changeTodolistFilter} createTask={createTask} changeTaskStatus={changeTaskStatus} filter={filter}/>
      </div>
  )
}