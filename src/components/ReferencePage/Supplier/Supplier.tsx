import React from 'react';
import style from "../../Tancs/Tanks.module.css";
import {sestIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import {useAppDispatch} from "../../../State/reduxStore";

const Supplier = () => {
   const dispatch = useAppDispatch()
    return(
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Поставщики</span>
                <button  onClick={()=>dispatch(sestIsMenuActiveAC())}  >menu</button>
            </div>
        </div>
    );
};
export default Supplier;