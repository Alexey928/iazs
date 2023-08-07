import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {validateInputValue as validator} from "../../../AuxiliaryLogic/validate"
import style from "./adItemForm.module.css"

type AddItemFormPropsType ={
    addItem:(title:string)=>void|null
}

const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [isEnterPressed, setIsEnterPressed] = useState(false);

    const onClickHandler = () => {
        validator(inputValue, setError) && addItem(inputValue);
        setInputValue("");
        setIsEnterPressed(false);
    };

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            setIsEnterPressed(true);
            onClickHandler();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value);
        setError(false);
        setIsEnterPressed(false);
    };

    return (
        <div className={style.flexContayner}>
            <div className={style.container}>
                <textarea
                    autoFocus={true}
                    placeholder={isEnterPressed ? "" : "Yor text..."}
                    className={style.input}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyUp={onKeyUpHandler}
                />
                <span className={style.underline}></span>
            </div>
            <button className={style.button} style={{color:error?"red":"whitesmoke"}}
                    onClick={onClickHandler}>{error?"ER":"+"}</button>
        </div>
    );
};

export default AddItemForm;