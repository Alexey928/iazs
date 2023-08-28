import React, {useEffect} from 'react';
import style from "./Tanks.module.css"
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import {setTankPageData, StationsType, TanksPageStateType} from "../../ActionCreators/TanksPageAC";
import Stations from "./Stations";
import Preloader from "../UIcomponets/generalPreloader/Preloader";

const TanksPage = () => {
    const dispatch = useAppDispatch()
    console.log(new Date())
    const navigate = useNavigate();
    const auth = useSelector<AppRootStateType, UserAuthStateType>(state => state.userAuth);
    const tankPageStations = useSelector<AppRootStateType,Array<StationsType>>(state => state.tanksPage.stations);

    useEffect(()=>{
        if(!auth.isAuth) {
            navigate("/");
        }
    },[]);

    useEffect(()=>{
       dispatch(setTankPageData(auth.data._token?auth.data._token:"","2020-01-31 02:00:20"));
    },[])

    return (
        <div className={style.content}>
            <div className={style.contentHeader}>
                <span>Состояние Резервуаров</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
            </div>
            <div className={style.contentWrapper}>
                {auth.isLading?<Preloader/>:tankPageStations && tankPageStations.map((station=><Stations
                        name={station._name}
                        key={station._id}
                        stationId={station._id}
                />))}
            </div>
        </div>
    );
};

export default TanksPage;