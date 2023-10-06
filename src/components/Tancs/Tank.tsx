import React, {useEffect, useState} from 'react';
import style from "./Tank.module.css"
import {fuelListType, TankDescriptionType, TanksDescriptionsTypes, TankType} from "../../ActionCreators/TanksPageAC";
import {useNavigate} from "react-router-dom";
import chartIcom from "../../asets/chartIcon.png"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/reduxStore";
import {colorOffuel} from "./utils";

type TankPropsType = {
    name:string|null
    height:string|null
    tankId:number|null
    fuelId:number|null

}
type swithVectorType = ""|"inc"|"dec";

declare module 'csstype' {// добавляем в кастомную типизацию стилей нашу css переменную
    interface Properties {
        '--bac'?: string;
    }
}

const Tank = (props:TankPropsType) => {
    const currentDescriptions = useSelector<AppRootStateType, Array<TankDescriptionType>>(state => (
        state.tanksPage.tanksDescriptions[props.tankId?props.tankId:"1"]));
    const fuelList = useSelector<AppRootStateType,fuelListType>(state => state.tanksPage.fuelList);
    const findCurrentFuel = fuelList.find(item=>item._id===props.fuelId);
    const currentFuelName = findCurrentFuel ? findCurrentFuel._name : "";

    const [currentDescriptionPos, setCurrentDescriptionPos] = useState(0);
    const [isSwithed, setIsSwithed] = useState(false)
    const [swithVector,setSwithVector] = useState<swithVectorType>("")
    const [deviseType, setDeviseType] = useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        if(isSwithed){
            setTimeout(()=>{
                swithPosition(swithVector)
            },170);
        }
    },[swithVector,isSwithed,currentDescriptionPos]);

    const tankViewLevel = (height:number,overHeight:number):number=>{
        const percent = (height*100)/overHeight;
        const level = (175*percent)/100;
        return level<25?25:~~level;
    }
    const validatePositionOfDescriptions =  (pos:number,swithVector:swithVectorType):number => {
        if(pos===0&&swithVector==="dec"){
            return 0
        }else if(pos===currentDescriptions.length-1&&swithVector==="inc"){
            return currentDescriptions.length-1
        }
         return swithVector==="inc"?pos+1:pos-1
    }

    const swithPosition = (swithVector:swithVectorType) => {
        setCurrentDescriptionPos(prev=>validatePositionOfDescriptions(prev,swithVector))
    };

    const handleDecMouseDown = (vector:swithVectorType,) => {
        setIsSwithed(true);
        setSwithVector(vector);
    };
    const handleIncMouseUp = () => {
        setIsSwithed(false)
    }
    const nav = ()=>{
        navigate(`/TankChartPage/${props.tankId}`)
    }
    const description = currentDescriptions[currentDescriptionPos]

    return (
        <div className={style.glass}>
            <div className={style.inner}>
                <label className={style.fuelName}>{props.name + " " + currentFuelName}</label>
                <div className={style.tankDescription}>
                    <div><span>Объем(л)</span><span>{description._fuelVolume}</span></div>
                    <div><span>Уровеь(мм)</span><span>{description._fuelLevel}</span></div>
                    <div><span>Т( С )</span><span>{description._temperature}</span></div>
                    <div><span>Вода(мм)</span><span>{description._waterLevel}</span></div>
                    <div><span>Плотн(кг/м)</span><span>{description._density}</span></div>
                    <div><span>Масса</span><span>{description._fuelMass}</span></div>
                    <div><span>h-рез</span><span>{props.height}</span></div>
                    <img src={chartIcom} onClick={nav}/>
                    <div><span style={{color:"#7cf508"}}>{description._date}</span></div>
                    <div>
                        <button onTouchStart={()=>{
                                                setDeviseType("mob")
                                                handleDecMouseDown("dec")
                        }}
                                onTouchEnd={handleIncMouseUp}
                                onMouseDown={deviseType!=="mob"?()=>handleDecMouseDown("dec"):undefined}
                                onMouseUp={handleIncMouseUp}
                                disabled={currentDescriptionPos===0}
                                className={style.descriptionControleButton}> {"<"}
                        </button>
                        <button onTouchStart={()=>{
                                                    setDeviseType("mob")
                                                    handleDecMouseDown("inc")
                        }}
                                onTouchEnd={handleIncMouseUp}
                                onMouseDown={deviseType!=="mob"?()=>handleDecMouseDown("inc"):undefined}
                                onMouseUp={handleIncMouseUp}
                                disabled={currentDescriptionPos===(currentDescriptions.length-1)}
                                className={style.descriptionControleButton}> {">"}
                        </button>
                    </div>
                </div>
                <div className={style.liquidPetrol}
                     style={{"top":tankViewLevel(Number(currentDescriptions[currentDescriptionPos]._fuelLevel),
                                 Number(props.height)),"--bac":colorOffuel[currentFuelName.toLowerCase()]}}>

                </div>
            </div>
        </div>
    );
};
export default Tank;