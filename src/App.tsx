import './App.css'
import { Todolist } from './Todolist'
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type TaskStateType = {
    [todoListID: string]: TaskType[]
}

export type filterValuesType = "all" | "active" | "completed";

type ToDoListType = {
    id: string;
    title: string;
    filter: filterValuesType
}

export const App = () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })


    const createTask = (todoListID: string, title: string) => {
      const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }
    const changeTaskStatus = (todoListID: string, taskId: string, newStatus: boolean) => {
          setTasks({...tasks, [todoListID]: tasks[todoListID].map(task=> task.id === taskId ? {...task, isDone: newStatus} : task)})
    }
    const deleteTask = (todoListID: string, taskId: string) => {
        setTasks( {...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)} )
    }
    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(task=> task.id === taskId ? {...task, title: newTitle} : task)})
    }

    /*-----------------------*/

    const changeTodolistFilter = (todoListID: string, value: filterValuesType) => {
        setTodoLists(todoLists.map(filtered=> filtered.id === todoListID ? {...filtered, filter: value} : filtered))
    }
    const deleteToDoList = (todoListID: string) => {
        let filteredToDoList = todoLists.filter(el => el.id !== todoListID);
        setTodoLists(filteredToDoList)
        delete  tasks[todoListID]
        setTasks({...tasks})
    }
    const createTodoList = (newToDoListTitle: string) => {
        const newToDoListId = v1()
        setTodoLists([{id: newToDoListId, title: newToDoListTitle, filter: "all"}, ...todoLists])

        setTasks({...tasks, [newToDoListId]: []})
    }

    const changeTodoListTitle = (todoListID: string, newListTitle: string) => {
        setTodoLists(todoLists.map(list => list.id === todoListID ? {...list, title: newListTitle} : list))
    }


    const toDoListComponent = todoLists.map((todoListElement)=> {

        let tasksForTodoList = tasks[todoListElement.id];

        if (todoListElement.filter === "active") {
            tasksForTodoList = tasks[todoListElement.id].filter(t => !t.isDone)
        } else if (todoListElement.filter === "completed") {
            tasksForTodoList = tasks[todoListElement.id].filter(t => t.isDone)
        }

        return (
            <Todolist
                key={todoListElement.id}
                todoListID={todoListElement.id}
                title={todoListElement.title}
                tasks={tasksForTodoList}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                filter={todoListElement.filter}
                changeTaskTitle={changeTaskTitle}
                deleteToDoList={deleteToDoList}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="app">
            <AddItemForm createItem={createTodoList} maxTitleLength={15}/>
            {toDoListComponent}
            </div>)
}

