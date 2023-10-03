import React, {useState} from 'react';
import Calendar from "./Calendar";
import {formativeDate, useCalendar} from "./hooks/useCalendar";
import style from "./calendar.module.css"
type CalendarContainerPropsType = {
    calback:(date:string)=>void
}
const CalendarContainer = () => {
    const [selectedDate,setSelectedDate] = useState<Date>(new Date());
    const [active,setActive] = useState<boolean>(false);


    return (
        <div className={style.calendarContayner} >
            <div className={style.dateSpan} onClick={()=>setActive(!active)}>{formativeDate(selectedDate," DD. MM. YYYY.")}</div>
            {active && <Calendar
                                 firstWeekDay={2}
                                 selectedDate={selectedDate}
                                 selectDate={(date)=>{setSelectedDate(date)}}/>}
        </div>
    );
};

export default CalendarContainer;