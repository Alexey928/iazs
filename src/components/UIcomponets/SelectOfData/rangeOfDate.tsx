import React, {useState} from 'react';
import CalendarContainer from "./CalendarContainer";
import  style from "./rangeOfDate.module.css"
import {firstIsSmallerOfSecondDate, formativeDate, isIqualDate} from "./hooks/useCalendar";
type datePeriodType = Array<Date>
type DateSelectsContainerType = {
    setRange:(dateFrom:string,dateToo:string)=>void
    resetFilter?:()=>void
}
const tempStartDate = new Date(2020,0,1);
const tempEndDate = new  Date(2020,0,31);

const RangeOfDateSelect:React.FC<DateSelectsContainerType> = ({setRange}) => {
    const [datePeriod,setDatePeriod] = useState<datePeriodType>([new Date(),new Date()]);
    const setStart = (date:Date)=>{
        setDatePeriod([date,datePeriod[1]]);
    }
    const setEnd = (date:Date)=>{
        setDatePeriod([datePeriod[0],date]);
    }
    const composeHandlerClick = ()=>{
        
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
            <CalendarContainer startDate={tempStartDate} calback={setStart}/>
            <CalendarContainer startDate={tempEndDate} calback={setEnd} />
        </div>
    );
};
export default RangeOfDateSelect;