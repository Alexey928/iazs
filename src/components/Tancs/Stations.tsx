import React from 'react';
import style from "./Tanks.module.css";
import {TanksDescriptionsTypes, tanksType, TankType} from "../../ActionCreators/TanksPageAC";
import Tank from "./Tank";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/reduxStore";

type stationStateType = {
    name:string|null
    tanks:Array<TankType>
    stationId:number|null
    tanksDescription:TanksDescriptionsTypes
}

const Stations:React.FC<stationStateType> = ({   tanks,
                                                 stationId,
                                                 tanksDescription,
                                                 name}) => {

    const tanksList = useSelector<AppRootStateType,tanksType>(state => state.tanksPage.tanks)

    return (
        <div>
            <div className={style.station}>{name}</div>
            <div className={style.flexWraper}>
                {stationId && tanks.map((tank=>tank._id &&
                    <Tank description={tanksDescription[tank._id]}
                          tankId={tank._id}
                          key={tank._id}
                          height={tank._height}
                          name={tank._name}
                    />))}
            </div>
        </div>
    );
};

export default Stations;