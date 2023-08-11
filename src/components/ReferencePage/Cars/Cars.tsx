import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../../Tancs/Tanks.module.css";
import {sestIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";

const Cars = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Техника предприятия</span>
                <button  onClick={()=>dispatch(sestIsMenuActiveAC())}  >menu</button>
            </div>
        </div>
    );
};
export default Cars;