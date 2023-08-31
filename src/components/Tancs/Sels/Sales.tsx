import React from 'react';
import {useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent from "../../UIcomponets/SelectComponent/Select";

const options = [
    { value: 'Дт'},
    { value: 'А92'},
    { value: 'А95'},
    { value: 'А98'},
];
const options1 = [
    { value: 'АЗС-1'},
    { value: 'АЗС-2'},
    { value: 'АЗС-3'},
    { value: 'АЗС-4'},
];


const Sales = () => {
    const dispatch = useAppDispatch();
    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{paddingLeft:10, display:"flex",zIndex:2,backgroundColor:'rgb(50,255,0)',
                            position:"absolute",left:0,right:0, top:30,height:60,
                            alignItems:"flex-start",justifyContent:"space-evenly",

                }}>
                    <SelectComponent options={options} name={"Продукт"}/>
                    <SelectComponent options={options1} name={"По АЗС"}/>

                </div>
            </div>

            <div className={style.contentWrapper}>
                <Table/>
            </div>
        </div>
    );
};

export default Sales;