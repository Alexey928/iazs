import React, {useState} from 'react';
import CalendarContainer from "../../UIcomponets/SelectOfData/CalendarContainer";
import  style from "./Sales.module.css"
import {firstIsSmallerOfSecondDate, formativeDate, isIqualDate} from "../../UIcomponets/SelectOfData/hooks/useCalendar";
type datePeriodType = Array<Date>
type DateSelectsContainerType = {
    setRange:(dateFrom:string,dateToo:string)=>void
}

const RangeOfDateSelect:React.FC<DateSelectsContainerType> = ({setRange}) => {
    const [datePeriod,setDatePeriod] = useState<datePeriodType>([new Date(),new Date()]);
    const setStart = (date:Date)=>{
        setDatePeriod([date,datePeriod[1]]);
    }
    const setEnd = (date:Date)=>{
        setDatePeriod([datePeriod[0],date]);
    }
    return (
        <div className={style.dateSelectContayner}>
            {!isIqualDate(datePeriod[0],datePeriod[1])&&
             firstIsSmallerOfSecondDate(datePeriod[0],datePeriod[1])&&
                    <div onClick={()=>setRange(formativeDate(datePeriod[0],"YYYY-MM-DD") + " 00:00:00",
                                               formativeDate(datePeriod[1],"YYYY-MM-DD") + " 00:00:00")
                                  } className={style.triger}> go
                    </div>
            }
            <CalendarContainer calback={setStart}/>
            <CalendarContainer calback={setEnd} />
        </div>
    );
};
export default RangeOfDateSelect;