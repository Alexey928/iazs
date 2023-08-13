import React, {useState} from 'react';
import style from "./Tanks.module.css"
import Tank from "./Tank";
import {useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";


type TankStateType = {
    tankNumber?:number
    fuelType?:"дт"|"бн"
    fuelBrand?:string
    V?:string
    T?:string
}

const TanksPage = () => {
    const dispatch = useAppDispatch()
    console.log(new Date())
    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Состояние Резервуаров</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
            </div>
            <div className={style.contentWrapper}>
                <div className={style.flexWraper}>
                    <Tank level={180}/>
                    <Tank level={120}/>
                    <Tank level={100}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                    <Tank level={150}/>
                </div>

            </div>
        </div>
    );
};

export default TanksPage;