import {v1} from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import {ToDoListType} from '../App'
import {
    ChangeTodolistFilterAC,
    ChangeTodoListTitleAC,
    CreateTodolistAC,
    DeleteTodoListAC,
    todoListsReducer
} from './todolists-reducer'



let todolistId1: string
let todolistId2: string
let startState: ToDoListType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {

    const endState = todoListsReducer(startState, DeleteTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todoListsReducer(startState, CreateTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const changingTitle = 'New title'
    const endState = todoListsReducer(startState, ChangeTodoListTitleAC({todoListID: todolistId2, changingTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changingTitle)
})

test('correct todolist should change its filter', () => {
    const newFilterValue = 'completed'
    const endState = todoListsReducer(startState, ChangeTodolistFilterAC({todoListID: todolistId2, newFilterValue}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilterValue)
})