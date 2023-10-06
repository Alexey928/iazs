import React, {useEffect, useRef, useState} from 'react';
import Calendar from "./Calendar";
import {formativeDate, useCalendar} from "./hooks/useCalendar";
import style from "./calendar.module.css"

type CalendarContainerPropsType = {
    calback:(date:Date)=>void
}
const CalendarContainer:React.FC<CalendarContainerPropsType> = ({calback}) => {
    const [selectedDate,setSelectedDate] = useState<Date>(new Date());
    const [active,setActive] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setTimeout(()=>{
            setActive(false);
            calback(selectedDate);
        },300)

    },[selectedDate])

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setActive(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={style.calendarContayner} >
            <div className={style.dateSpan}
                 onClick={()=>setActive(!active)}>{formativeDate(selectedDate," DD. MM. YYYY.")}
            </div>
            {active && <Calendar
                                 firstWeekDay={2}
                                 selectedDate={selectedDate}
                                 selectDate={(date)=>{setSelectedDate(date)}}
            />}
        </div>
    );
};

export default CalendarContainer;