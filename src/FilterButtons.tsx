import {Button} from "./Button.tsx";
import {filterValuesType} from "./App.tsx";

type FilterButtonsPropsType = {
    changeTodolistFilter: (filter: filterValuesType) => void;
    filter: filterValuesType;
}

export const FilterButtons = ( {changeTodolistFilter, filter}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button classes={filter === "all" ? 'filterBtn-active' : ''} title={"All"} onClickHandler={()=>changeTodolistFilter("all")}/>
            <Button classes={filter === "active" ? 'filterBtn-active' : ''} title={"Active"} onClickHandler={()=>changeTodolistFilter("active")}/>
            <Button classes={filter === "completed" ? 'filterBtn-active' : ''} title={"Completed"} onClickHandler={()=>changeTodolistFilter("completed")}/>
        </div>
    );
}