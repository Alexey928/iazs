import React from 'react';
import style from "./Tanks.module.css";
import {TanksDescriptionsTypes, TankType} from "../../ActionCreators/TanksPageAC";
import Tank from "./Tank";

type stationStateType = {
    tanks:Array<TankType>
    stationId:number|null
    tanksDescription:TanksDescriptionsTypes
}

const Stations:React.FC<stationStateType> = ({tanks,stationId,tanksDescription}) => {
    return (
        <div className={style.contentWrapper}>
            <div>
                <div className={style.station}>Заправочная станция №{"1"}</div>
                <div className={style.flexWraper}>
                    {stationId && tanks.map((tank=>tank._id &&
                        <Tank description={tanksDescription[tank._id]} tankId={tank._id} level={44}/>))}
                </div>
            </div>
        </div>
    );
};

export default Stations;