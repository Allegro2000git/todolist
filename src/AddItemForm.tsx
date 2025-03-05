import {ChangeEvent, useState, type KeyboardEvent} from "react";
import {Button} from "./Button.tsx";

type AddItemFormPropsType = {
    createItem: (newTitle: string) => void
    maxTitleLength: number
}

export const AddItemForm = ({createItem, maxTitleLength}: AddItemFormPropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const maxTitleLengthError = taskTitle.length > 15

    const createTaskOnClickHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle("")
    }

    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle && taskTitle.length <= 15) {
            createTaskOnClickHandler()
        }
    }

    return (
        <div>
            <input
                   value={taskTitle}
                   placeholder={`max title length is ${maxTitleLength} charters`}
                   className={error ? "taskInputError" : ""}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                       error && setError(false)
                       setTaskTitle(e.currentTarget.value)
                   }}
                   onKeyDown={createTaskOnKeyDownHandler}
            />
            <Button
                    title={"+"}
                    onClickHandler={createTaskOnClickHandler}
                    disabled={!taskTitle.length || maxTitleLengthError}
            />
            {error && <div style={{ color: "red" }}>enter valid title</div>}
            {!taskTitle && <div>Enter title, please</div>}
            {taskTitle && taskTitle.length <= maxTitleLength && <div>{`Max title length is ${maxTitleLength} charters`}</div>}
            {taskTitle.length > maxTitleLength && <div style={{color:"red"}}>Your task is too long</div>}
        </div>
    );
};
