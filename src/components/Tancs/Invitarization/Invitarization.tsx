import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";

const Invitarization = () => {
    const dispatch = useAppDispatch()

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Инвентаризация</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
            </div>
        </div>
    );
};

export default Invitarization;