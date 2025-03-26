import {TaskStateType, TaskType} from "../App.tsx";
import {CreateTodoListAT, DeleteTodoListAT} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TaskStateType = {}

export type DeleteTaskAT = ReturnType<typeof DeleteTaskAC>
export type CreateTaskAT = ReturnType<typeof CreateTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType = DeleteTodoListAT | CreateTodoListAT | DeleteTaskAT | CreateTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT

export const tasksReducer = (tasks: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "create_todolist": {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }

        case "delete_todolist": {
            const {todoListID} = action.payload
            delete tasks[todoListID]
            return {...tasks}
        }

        case "delete_task": {
            const {todoListID, taskId} = action.payload
            return {...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)}
        }

        case "create_task": {
            const {todoListID, newTitle} = action.payload
            const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
            return {...tasks, [todoListID]: [ newTask, ...tasks[todoListID] ] }
        }

        case "change_task_status": {
            const {todoListID, taskId, newStatus} = action.payload
            return {...tasks, [todoListID]: tasks[todoListID].map(task=> task.id === taskId ? {...task, isDone: newStatus} : task)}
        }

        case "change_task_title": {
            const {todoListID, taskId, newTitle} = action.payload
            return {...tasks, [todoListID]: tasks[todoListID].map(task=> task.id === taskId ? {...task, title: newTitle} : task)}
        }

        default:
                return tasks;
    }
}



export const DeleteTaskAC = ({todoListID, taskId}: {todoListID: string, taskId: string}) => ({
    type: "delete_task",
    payload: {todoListID, taskId}
} as const)

export const CreateTaskAC = ({todoListID, newTitle}: {todoListID: string, newTitle: string}) => ({
    type: "create_task",
    payload: {todoListID, newTitle}
} as const)

export const ChangeTaskStatusAC = ({todoListID,taskId,  newStatus}: {todoListID: string, taskId: string, newStatus: boolean}) => ({
    type: "change_task_status",
    payload: {todoListID, taskId, newStatus}

} as const)

export const ChangeTaskTitleAC = ({todoListID,taskId,  newTitle}: {todoListID: string, taskId: string, newTitle: string}) => ({
    type: "change_task_title",
    payload: {todoListID, taskId, newTitle}
} as const)
