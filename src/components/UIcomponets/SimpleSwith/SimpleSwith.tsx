import React, {useEffect, useState} from 'react';
import style from "./simpleSwotch.module.css"
type swithPropsType  = {
 bindingIntarfasse?:{[key:string]:boolean|string|number}[]
 interfaseField?:string
 calback?:(togle:boolean)=>void
}

const Swith:React.FC<swithPropsType> = ({bindingIntarfasse,interfaseField,calback}) => {
    const [togle,setTogle] = useState(false);
    console.log(bindingIntarfasse)
    useEffect(()=>{
    bindingIntarfasse && bindingIntarfasse.forEach((el)=>{el["chooseFromRemaining"]= togle});
    calback && calback(togle);
    },[togle]);

    return (
        <div className={style.contayner}>
            <input onChange={()=>{setTogle(!togle)}} className={style.input} type="checkbox" id="switch"/>
            <label className={style.label} htmlFor="switch">Toggle</label>
        </div>
    );
};
export default Swith;