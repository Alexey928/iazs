import React, {useState} from 'react';
import style from "./Tanks.module.css"
import Tank from "./Tank";


type TankStateType = {
    tankNumber?:number
    fuelType?:"дт"|"бн"
    fuelBrand?:string
    V?:string
    T?:string
}

const TanksPage = () => {
    const [tanks,setTanks] = useState([
        {
            _di:"243",
            _date:"2020-01-31 08:40:26",
            _type:"1",// тип измерения 1-автомат, 2-ручной
            _auth:"1",//достоверность измерений 1-достоверно 0-не достоверно
            _tank_id:"8",
            _fuel_id:"1",
            _fuelLevel:"1450",// задано в мм
            _temperature:"10",// гр.цельсия

        },

    ])



    return (
        <div className={style.content} >
            <div className={style.contentHeader}><span>Tank fuel level</span></div>
            <div className={style.contentWrapper}>
                <div className={style.flexWraper}>
                    <Tank level={180}/>
                    <Tank level={120}/>
                    <Tank level={100}/>
                    <Tank level={150}/>
                </div>

            </div>
        </div>
    );
};

export default TanksPage;