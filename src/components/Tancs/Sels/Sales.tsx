import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table from "../../UIcomponets/Tabels/SimpleTAble";

const Sales = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{width:"100%",backgroundColor:'rgb(50,255,0)',textAlign:"center" ,position:"absolute",left:0,right:0, top:30}}>menu</div>
            </div>

            <div className={style.contentWrapper}>
                <Table/>
            </div>
        </div>
    );
};

export default Sales;