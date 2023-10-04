import React, {useState} from 'react';
import CalendarContainer from "../../UIcomponets/SelectOfData/CalendarContainer";
import  style from "./Sales.module.css"
type datePeriodType = Array<Date>

const DateSelectsContainer = () => {
    const [datePeriod,setDatePeriod] = useState<datePeriodType>([]);
    const setStart = (date:Date)=>{
        setDatePeriod([date,datePeriod[1]])
    }
    const setEnd = (date:Date)=>{
        
    }

    return (
        <div className={style.dateSelectContayner}>
            <CalendarContainer/>
            <CalendarContainer/>
        </div>
    );
};

export default DateSelectsContainer;