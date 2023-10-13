import React, {useMemo, useState} from 'react';
import style from "./ShowingSpan.module.css"
type ShowingPropsType = {
    countingField:string
    name:string
    dataArray:{[p: string]: string | number | null}[]
}

const ShowingSpan:React.FC<ShowingPropsType> = React.memo(({name,dataArray,countingField}) => {

    const [active,setActive] = useState(false);

    const value = useMemo(()=>{
        console.log("factory");
        return Math.floor(dataArray.reduce((acum,el)=>{
            return acum += Number(el[countingField]);},0
        ));
    },[dataArray]);





    return (
        <span className={style.span} style={{color:active?"#fa0303":""}} onClick={()=>setActive(!active)}>
          {active?value:name}
        </span>
    );
});

export default ShowingSpan;