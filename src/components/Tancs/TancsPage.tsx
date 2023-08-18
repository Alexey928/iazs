import React, {useEffect} from 'react';
import style from "./Tanks.module.css"
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import {setTankPageData, TanksPageStateType} from "../../ActionCreators/TanksPageAC";
import Stations from "./Stations";
import {AppStateType} from "../../ActionCreators/AppAC";
import Preloader from "../UIcomponets/generalPreloader/Preloader";


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
    const tankPageState = useSelector<AppRootStateType,TanksPageStateType>(state => state.tanksPage)




    useEffect(()=>{
        if(!auth.isAuth) {
            navigate("/");
        }
    },[]);

    useEffect(()=>{
        dispatch(setTankPageData(auth.data._token?auth.data._token:"","2020-01-31 02:00:20"))
    },[])



    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Состояние Резервуаров</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
            </div>
            <div className={style.contentWrapper}>
                {auth.isLading?<Preloader/>:tankPageState.stations&&tankPageState.stations.map((station=><Stations
                        key={station._id}
                        tanks={tankPageState.tanks.filter((t)=>t._azs_id===station._id)}
                        stationId={station._id}
                        tanksDescription={tankPageState.tanksDescriptions}
                    />))}
            </div>

        </div>
    );
};

export default TanksPage;