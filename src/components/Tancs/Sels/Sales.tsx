import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent from "../../UIcomponets/SelectComponent/Select";

const options = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' },
];


const Sales = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{paddingLeft:10, display:"flex",zIndex:2,backgroundColor:'rgb(50,255,0)',position:"absolute",left:0,right:0, top:30,height:"auto"}}>
                    <SelectComponent options={options} name={"По АЗС"}/>
                </div>
            </div>

            <div className={style.contentWrapper}>
                <Table/>
            </div>
        </div>
    );
};

export default Sales;