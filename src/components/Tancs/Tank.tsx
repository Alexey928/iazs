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

    const tankViewLevel = (height:number,overHeight:number):number=>{
        const percent = (height*100)/overHeight;
        const level = (175*percent)/100;
        return level<25?25:~~level;
    }
    const handleIncrement = () => {
        setCurrentDescriptionPos(currentDescriptionPos + 1);
    };
    const handleDecrement = ()=>{
        setCurrentDescriptionPos(currentDescriptionPos + 1);
    }

    const handleDecMouseDown = () => {

    };
    const handleIncMouseDown = ()=>{

    }

    const description = props.description[currentDescriptionPos]

    return (
        <div className={style.glass}>
            <div className={style.inner}>
                <label className={style.fuelName}>№1 A95</label>
                <div className={style.tankDescription}>
                    <div><span>Объем(л)</span><span>{description._fuelVolume}</span></div>
                    <div><span>Уровеь(мм)</span><span>{description._fuelLevel}</span></div>
                    <div><span>Т( С )</span><span>{description._temperature}</span></div>
                    <div><span>Вода(мм)</span><span>{description._waterLevel}</span></div>
                    <div><span>Плотн(кг/м)</span><span>{description._density}</span></div>
                    <div><span>Масса</span><span>{description._fuelMass}</span></div>
                    <div><span>h-рез</span><span>{props.height}</span></div>
                    <div><span style={{color:"#7cf508"}}>{description._date}</span></div>
                    <div>
                        <button onClick={()=>setCurrentDescriptionPos(p=>p-1)}
                                disabled={currentDescriptionPos===0}
                                className={style.descriptionControleButton}>{"<"}
                        </button>
                        <button onKeyPress={()=>setCurrentDescriptionPos(p=>p+1)}
                            onClick={()=>setCurrentDescriptionPos(p=>p+1)}
                                disabled={currentDescriptionPos===(props.description.length-1)}
                                className={style.descriptionControleButton}>{">"}
                        </button>
                    </div>
                </div>
                <div className={style.liquidPetrol}
                     style={{top:tankViewLevel(Number(props.description[currentDescriptionPos]._fuelLevel),
                                 Number(props.height))}}>

                </div>
            </div>
            
        </div>
    );
};

export default Tank;