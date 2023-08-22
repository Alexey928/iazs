import React from 'react';
import style from "./Tank.module.css";
type TankDescriptionNavButtonsType = {
    currentDescriptionPos:number
    lengthOfCounting:number
}

const TankDescriptionNavButtons:React.FC<TankDescriptionNavButtonsType> = ({
   currentDescriptionPos,
   lengthOfCounting,

}) => {
    return (
        <div>
            <button onClick={()=>{}}
                    disabled={currentDescriptionPos===0}
                    className={style.descriptionControleButton}>{"<"}
            </button>
            <button onKeyPress={()=>{}}
                    onClick={()=>{}}
                    disabled={currentDescriptionPos===lengthOfCounting}
                    className={style.descriptionControleButton}>{">"}
            </button>
        </div>
    );
};

export default TankDescriptionNavButtons;