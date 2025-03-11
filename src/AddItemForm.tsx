import {ChangeEvent, useState, type KeyboardEvent} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";


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
            <TextField
                   size="small"
                   variant="outlined"
                   value={taskTitle}
                   placeholder={`max title length is ${maxTitleLength} charters`}
                   className={error ? "taskInputError" : ""}
                   error={error}
                   helperText={error && "Enter valid title"}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                       error && setError(false)
                       setTaskTitle(e.currentTarget.value)
                   }}
                   onKeyDown={createTaskOnKeyDownHandler}
            />
            <IconButton
                onClick={createTaskOnClickHandler}
                disabled={!taskTitle.length || maxTitleLengthError}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
            {!taskTitle && <div>Enter title, please</div>}
            {taskTitle && taskTitle.length <= maxTitleLength && <div>{`Max title length is ${maxTitleLength} charters`}</div>}
            {taskTitle.length > maxTitleLength && <div style={{color:"red"}}>Your task is too long</div>}
        </div>
    );
};
