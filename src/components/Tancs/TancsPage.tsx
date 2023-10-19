import React, {useEffect} from 'react';
import style from "./Tanks.module.css"
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import {setTankPageData, StationType, TanksPageStateType} from "../../ActionCreators/TanksPageAC";
import Stations from "./Stations";
import Preloader from "../UIcomponets/generalPreloader/Preloader";
import {setTransactionInTimeRange} from "../../ActionCreators/SalePageAC";
import RangeOfDateSelect from "../UIcomponets/SelectOfData/rangeOfDate";




const TanksPage = () => {
    const dispatch = useAppDispatch()
    console.log(new Date())
    const navigate = useNavigate();
    const auth = useSelector<AppRootStateType, UserAuthStateType>(state => state.userAuth);
    const tankPageStations = useSelector<AppRootStateType,Array<StationType>>(state => state.tanksPage.stations);
    const flagForLodingStartData = useSelector<AppRootStateType,boolean>(state => state.tanksPage.isFirstloading);

    useEffect(()=>{
        if(!auth.isAuth) {
            navigate("/");
        }
       !flagForLodingStartData &&
       dispatch(setTankPageData(auth.data._token?auth.data._token:"","2020-01-31 02:00:20"));
    },[]);

    const setTanksStateOfTimeRange = (dateToo:string,dateFrom:string)=>{
        console.log(dateToo,dateFrom)
        //dispatch(setTransactionInTimeRange(auth.data._token?auth.data._token:"",dateFrom,dateToo));
    }

    return (
        <div className={style.content}>
            <div className={style.contentHeader}>
                <span>Состояние Резервуаров</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
            </div>
            <div className={style.contentWrapper}>
                <div className={`${style.station} ${style.sattionMenu}`} >
                    <RangeOfDateSelect setRange={setTanksStateOfTimeRange}/>
                </div>
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