

type ButtonPropsType = {
    title: string;
    onClickHandler?: ()=> void;
    disabled?: boolean;
    classes?: string;
}

const Button = ({title, onClickHandler, disabled, classes}: ButtonPropsType) => {
    return (
        <button className={classes} disabled={disabled} onClick={onClickHandler}>{title}</button>
    );
}

export default Button;