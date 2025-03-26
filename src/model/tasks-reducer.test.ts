import { beforeEach, expect, test } from 'vitest'
import {TaskStateType} from '../App'
import {ChangeTaskStatusAC, ChangeTaskTitleAC, CreateTaskAC, DeleteTaskAC, tasksReducer} from "./tasks-reducer.ts";
import {CreateTodolistAC, DeleteTodoListAC} from "./todolists-reducer.ts";

let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, CreateTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, DeleteTodoListAC('todolistId2'))

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        DeleteTaskAC({ todoListID: 'todolistId2', taskId: '2' })
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        CreateTaskAC({
            todoListID: 'todolistId2',
            newTitle: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe("juice")
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        ChangeTaskStatusAC({todoListID: 'todolistId2', taskId: '2', newStatus: false})
    );

    expect(endState.todolistId2[1].title).toBe("milk")
    expect(endState.todolistId2[1].isDone).toBe(false)
})

test('correct task should change its title', () => {
    const newTaskTitle = "cola"
    const endState = tasksReducer(startState, ChangeTaskTitleAC({todoListID: 'todolistId2', taskId: '1', newTitle: newTaskTitle})
    );

    expect(endState.todolistId2[0].title).toBe("cola")
})
