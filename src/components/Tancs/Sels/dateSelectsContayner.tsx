import React, {useState} from 'react';
import CalendarContainer from "../../UIcomponets/SelectOfData/CalendarContainer";
import  style from "./Sales.module.css"
type datePeriodType = Array<Date>

const DateSelectsContainer = () => {
    const [datePeriod,setDatePeriod] = useState<datePeriodType>([new Date(),new Date()]);
    const setStart = (date:Date)=>{
        setDatePeriod([date,datePeriod[1]]);
    }
    const setEnd = (date:Date)=>{
        setDatePeriod([datePeriod[0],date]);
    }
    console.log(datePeriod)
    return (
        <div className={style.dateSelectContayner}>
            <CalendarContainer calback={setStart}/>
            <CalendarContainer calback={setEnd} />
        </div>
    );
};

export default DateSelectsContainer;