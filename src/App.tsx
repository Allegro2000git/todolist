import './App.css'
import { Todolist } from './Todolist'
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid2, Paper, Switch, ThemeProvider} from "@mui/material";
import {NavigationButton} from "./NavigationButton.ts";
import {green, indigo} from "@mui/material/colors";
import {
    ChangeTodolistFilterAC,
    ChangeTodoListTitleAC, CreateTodolistAC,
    DeleteTodoListAC,
    todoListsReducer
} from "./model/todolists-reducer.ts";
import {
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    CreateTaskAC,
    DeleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type TaskStateType = {
    [todoListID: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

export const App = () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    const initState: Array<ToDoListType> =  [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ]

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, initState)

    const initStateTask: TaskStateType = {
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
    }

    const [tasks, dispatchTasks] = useReducer(tasksReducer, initStateTask)

    const createTask = (todoListID: string, newTitle: string) => {
        dispatchTasks(CreateTaskAC({todoListID, newTitle}));
    }
    const changeTaskStatus = (todoListID: string, taskId: string, newStatus: boolean) => {
         dispatchTasks(ChangeTaskStatusAC({todoListID, taskId, newStatus}))
    }
    const deleteTask = (todoListID: string, taskId: string) => {
        dispatchTasks(DeleteTaskAC({todoListID, taskId}))
    }

    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        dispatchTasks(ChangeTaskTitleAC({todoListID, taskId, newTitle}))
    }

    /*-----------------------*/

    const changeTodolistFilter = (todoListID: string, newFilterValue: FilterValuesType) => {
        dispatchTodoLists(ChangeTodolistFilterAC({todoListID, newFilterValue}))
    }
    const deleteToDoList = (todoListID: string) => {
        const action = DeleteTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const createTodoList = (title: string) => {
        const action = CreateTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
        
    }
    const changeTodoListTitle = (todoListID: string, changingTitle: string) => {
        dispatchTodoLists(ChangeTodoListTitleAC({todoListID, changingTitle}))
    }

    const toDoListComponent = todoLists.map((todoListElement)=> {

        let tasksForTodoList = tasks[todoListElement.id];
        if (todoListElement.filter === "active") {
            tasksForTodoList = tasks[todoListElement.id].filter(t => !t.isDone)
        } else if (todoListElement.filter === "completed") {
            tasksForTodoList = tasks[todoListElement.id].filter(t => t.isDone)
        }

        return (
            <Grid2 key={todoListElement.id}>
                <Paper elevation={5} sx={{p: "30px"}}>
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
                </Paper>
            </Grid2>
        )
    })

    const [darkMode, setDarkMode] = useState<boolean>(false)

    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: green,
            mode: darkMode ? "dark" : "light",
        }
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: "space-between"}}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <NavigationButton>Sign in</NavigationButton>
                            <NavigationButton>Sign up</NavigationButton>
                            <NavigationButton background={theme.palette.primary.light}>Faq</NavigationButton>
                            <Switch onChange={() => setDarkMode(!darkMode)}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid2 container sx={{p: "25px 0px "}}>
                        <AddItemForm createItem={createTodoList} maxTitleLength={15}/>
                    </Grid2>
                    <Grid2 container spacing={8}>
                        {toDoListComponent}
                    </Grid2>
                </Container>
            </ThemeProvider>
            </div>
    )
}