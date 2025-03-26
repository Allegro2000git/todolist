import {FilterValuesType, TaskType} from "./App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from "@mui/material/Button"
import {Box, IconButton, List} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {getListItemSx} from "./TodolistItem.styles.ts";


export type TodolistPropsType = {
    todoListID: string;
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    deleteTask: (todoListID: string, taskId: string) => void;
    changeTodolistFilter: (todoListID: string, filter: FilterValuesType) => void;
    createTask: (todoListID: string, newTitle: string) => void;
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
        ? <p>Todolist is empty</p>
        : <ul>
            {tasks.map((t: TaskType) => {
            return (
                <ListItem key={t.id}
                          disablePadding
                          sx={getListItemSx(t.isDone)}>
                    <Box>
                        <Checkbox
                            checked={t.isDone}
                            onChange={(e)=> changeTaskStatus(todoListID, t.id, e.currentTarget.checked)}
                        />
                    <EditableSpan title={t.title} changeTitle={(newTitle: string)=>changeTaskTitle(todoListID, t.id, newTitle)}/>
                    </Box>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {deleteTask(todoListID, t.id)}}>
                        <DeleteIcon fontSize={"inherit"}/>
                    </IconButton>
                </ListItem>
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
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {deleteToDoList(todoListID)}}
                ><DeleteIcon fontSize={"inherit"}/>
                </IconButton>
            </h3>
            <AddItemForm createItem={createTaskCallback} maxTitleLength={20}/>
            <List>
                {TasksList}
            </List>
            <Box sx={{display: "flex", gap: "20px"}}>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === "all" ? "primary" : "secondary"}
                    onClick={()=>changeTodolistFilter(todoListID,"all")}
                >All</Button>

                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === "active" ? "primary" : "secondary"}
                    onClick={()=>changeTodolistFilter(todoListID,"active")}
                >Active</Button>

                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === "completed" ? "primary" : "secondary"}
                    onClick={()=>changeTodolistFilter(todoListID,"completed")}
                >Completed</Button>
            </Box>

        </div>
    );
}