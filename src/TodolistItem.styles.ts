import {SxProps} from "@mui/material"


export const getListItemSx = (isDone: boolean): SxProps => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: "0",
    fontWeight: "700",
    color: isDone ? "grey":"black",
    textDecoration: isDone ? "line-through" : "none"
})