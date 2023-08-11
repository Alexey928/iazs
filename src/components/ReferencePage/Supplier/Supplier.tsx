import React from 'react';
import style from "../../Tancs/Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import {useAppDispatch} from "../../../State/reduxStore";

const Supplier = () => {
   const dispatch = useAppDispatch()
    return(
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Поставщики</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
            </div>
        </div>
    );
};
export default Supplier;