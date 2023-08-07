import React from 'react';
import style from "./Tank.module.css"





type TankPropsType = {
    level:number
    tankNumber?:number
    fuelType?:"дт"|"бн"
    fuelBrand?:string
    V?:string
    T?:string

}

const Tank = (props:TankPropsType) => {
    return (
        <div className={style.glass}>
            <div className={style.inner}>
                <label className={style.fuelName}>№1 A95</label>
                <div className={style.tankDescription}>
                    <div><span>Обем</span><span>1200mm</span></div>
                    <div><span>Уровеь</span><span>1200mm</span></div>
                    <div><span>Т</span><span>1200mm</span></div>
                    <div><span>Вода</span><span>1200mm</span></div>
                    <div><span>Level</span><span>1200mm</span></div>
                    <div><span>Level</span><span>1200mm</span></div>
                    <div><span>Level</span><span>1200mm</span></div>
                    <div><span>Level</span><span>1200mm</span></div>
                </div>
                <div className={style.liquidPetrol} style={{top:props.level}}></div>
            </div>
            
        </div>
    );
};

export default Tank;