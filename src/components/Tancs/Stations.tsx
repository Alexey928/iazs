import React from 'react';
import style from "./Tanks.module.css";
import {TanksDescriptionsTypes, tanksType, TankType} from "../../ActionCreators/TanksPageAC";
import Tank from "./Tank";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/reduxStore";

type stationStateType = {
    name:string|null
    stationId:number|null
}

const Stations:React.FC<stationStateType> = ({stationId, name}) => {
    const tanksList = useSelector<AppRootStateType,tanksType>(state => state.tanksPage.tanks);
    const filteredTanks = tanksList.filter((t)=>t._azs_id===stationId);
    return (
        <div>
            <div className={style.station}>{name}</div>
            <div className={style.flexWraper}>
                {stationId && filteredTanks.map((tank => tank._id &&
                    <Tank
                          tankId={tank._id}
                          fuelId={tank._fuel_id}
                          key={tank._id}
                          height={tank._height}
                          name={tank._name}
                    />))}
            </div>
        </div>
    );
};

export default Stations;