import React, {useEffect, useState} from 'react';
import style from "./Tanks.module.css"
import Tank from "./Tank";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";


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
    const navigate = useNavigate();

    const auth = useSelector<AppRootStateType, UserAuthStateType>(state => state.userAuth);


    useEffect(()=>{
        if(!auth.isAuth) {
            navigate("/");
        }
    },[]);



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