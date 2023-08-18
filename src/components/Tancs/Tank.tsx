import React, {useState} from 'react';
import style from "./Tank.module.css"
import {TankDescriptionType} from "../../ActionCreators/TanksPageAC";

type TankPropsType = {
    height:string|null
    tankId:number|null
    description:Array<TankDescriptionType>
}

const Tank = (props:TankPropsType) => {
    const [currentDescriptionPos, setCurrentDescriptionPos] = useState(0);


const tankVieuLevel = (height:number,overHeight:number):number=>{
    const prcent = (height*100)/overHeight;
    const level = (175*prcent)/100;
    return level<25?25:~~level;
}

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
                    <button>{"<--"}</button>
                </div>
                <div className={style.liquidPetrol}
                     style={{top:tankVieuLevel(Number(props.description[currentDescriptionPos]._fuelLevel),Number(props.height))}}>

                </div>
            </div>
            
        </div>
    );
};

export default Tank;