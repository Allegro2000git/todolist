import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}:EditableSpanType) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [titleValue, setTitleValue] = useState<string>(title)
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(titleValue)}

    return (
        isEditMode
        ? <TextField
            variant="standard"
            autoFocus
            value={titleValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitleValue(e.currentTarget.value)
            }}
            onBlur={offEditMode}/>
        : <span onDoubleClick={onEditMode}>{title}</span>
    );
};
