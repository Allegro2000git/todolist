import {FilterValuesType, ToDoListType} from "../App.tsx";
import {v1} from "uuid";


const initialState: Array<ToDoListType> = []

export type DeleteTodoListAT = ReturnType<typeof DeleteTodoListAC>
export type CreateTodoListAT = ReturnType<typeof CreateTodolistAC>
export type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type ActionType = DeleteTodoListAT | CreateTodoListAT | ChangeTodoListTitleAT | ChangeTodolistFilterAT

export const todoListsReducer =
    (todoLists: Array<ToDoListType> = initialState, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {

        case "delete_todolist": {
            const {todoListID} = action.payload;
            return todoLists.filter(el => el.id !== todoListID);
        }

        case "create_todolist": {
            const {id, title} = action.payload;
            return [...todoLists, { id, title: title, filter: "all" }]
        }


        case "change_todolist_title": {
            const {todoListID, changingTitle} = action.payload
            return todoLists.map(list => list.id === todoListID ? {...list, title: changingTitle} : list)
        }

        case "change_todolist_filter": {
            const {todoListID, newFilterValue} = action.payload
            return todoLists.map(filtered=> filtered.id === todoListID ? {...filtered, filter: newFilterValue } : filtered)
        }

        default:
            return todoLists;
    }
}

export const DeleteTodoListAC = (todoListID: string) => ({
    type: "delete_todolist",
    payload: {todoListID}
} as const)

export const CreateTodolistAC = (title: string)=> ({
    type: "create_todolist",
    payload: { title, id: v1()}
} as const)

export const ChangeTodoListTitleAC = ({todoListID, changingTitle}: {todoListID: string; changingTitle: string}) => ({
    type: "change_todolist_title",
    payload: {todoListID, changingTitle}
} as const)

export const ChangeTodolistFilterAC = ({todoListID, newFilterValue}: {todoListID: string, newFilterValue: FilterValuesType}) => ({
    type: "change_todolist_filter",
    payload: {todoListID, newFilterValue}
}as const)