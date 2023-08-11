import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../../Tancs/Tanks.module.css";
import {sestIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";

const AutoModels = () => {
    const dispatch = useAppDispatch()
    return(
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Модели Автомобилей</span>
                <button  onClick={()=>dispatch(sestIsMenuActiveAC())}  >menu</button>
            </div>
        </div>
    );
};

export default AutoModels;