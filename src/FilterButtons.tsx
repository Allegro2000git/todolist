import {Button} from "./Button.tsx";
import {filterValuesType} from "./App.tsx";

type FilterButtonsPropsType = {
    changeTodolistFilter: (filter: filterValuesType) => void
}

export const FilterButtons = ( {changeTodolistFilter}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button title={"All"} onClickHandler={()=>changeTodolistFilter("all")}/>
            <Button title={"Active"} onClickHandler={()=>changeTodolistFilter("active")}/>
            <Button title={"Completed"} onClickHandler={()=>changeTodolistFilter("completed")}/>
        </div>
    );
}