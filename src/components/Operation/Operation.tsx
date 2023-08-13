import React from 'react';
import {useAppDispatch} from "../../State/reduxStore";
import style from "../Tancs/Tanks.module.css";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";


    const Operation = () => {
        const dispatch = useAppDispatch()

        return (
            <div className={style.content} >
                <div className={style.contentHeader}>
                    <span>Операции</span>
                    <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
                </div>
            </div>
        );
    };

export default Operation;