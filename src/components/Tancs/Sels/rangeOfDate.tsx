import React, {useState} from 'react';
import CalendarContainer from "../../UIcomponets/SelectOfData/CalendarContainer";
import  style from "./Sales.module.css"
import {comparisonOfTwoDAys, isIqualDate} from "../../UIcomponets/SelectOfData/hooks/useCalendar";
type datePeriodType = Array<Date>

const DateSelectsContainer = () => {
    const [datePeriod,setDatePeriod] = useState<datePeriodType>([new Date(),new Date()]);
    const setStart = (date:Date)=>{
        setDatePeriod([date,datePeriod[1]]);
    }
    const setEnd = (date:Date)=>{
        setDatePeriod([datePeriod[0],date]);
    }
    console.log(comparisonOfTwoDAys(datePeriod[0],datePeriod[1]));


    
    return (
        <div className={style.dateSelectContayner}>
            {!isIqualDate(datePeriod[0],datePeriod[1])&&
             !comparisonOfTwoDAys(datePeriod[0],datePeriod[1])&&
                <div className={style.triger}>go</div>}
            <CalendarContainer calback={setStart}/>
            <CalendarContainer calback={setEnd} />
        </div>
    );
};

export default DateSelectsContainer;