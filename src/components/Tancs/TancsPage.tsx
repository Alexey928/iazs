import React, {useEffect, useState} from 'react';
import style from "./Tanks.module.css"
import Tank from "./Tank";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import {TanksPageStateType} from "../../ActionCreators/TanksPageAC";


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
    const tankPageState = useSelector<AppRootStateType, TanksPageStateType>(state => state.tanksPage)


    useEffect(()=>{
        if(!auth.isAuth) {
            navigate("/");
        }
    },[]);

    useEffect(()=>{

    },[])



    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Состояние Резервуаров</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
            </div>
            <div className={style.contentWrapper}>
                <div>
                    <div>HEDER</div>
                    <div className={style.flexWraper}>
                        <Tank level={180}/>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default TanksPage;