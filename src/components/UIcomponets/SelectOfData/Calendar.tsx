import React from 'react';
import {useCalendar} from "./hooks/useCalendar";
import style from "./calendar.module.css"


type CalendarPropsType = {

    firstWeekDay:number
    locale?:string
    selectedDate:Date
    selectDate:(date:Date)=>void

}

const Calendar:React.FC<CalendarPropsType> = ({
    locale,
    selectDate,
    selectedDate,
    firstWeekDay,

                        }) => {

    const {state}= useCalendar({selectedDate:selectedDate,firstWeekDay:firstWeekDay});
    const {selectedMonth,calendarDays,mode,selectedYear} = state;
    

    return (
        <div className={style.calendar}>
            <div className={style.calendar_header}>
                <span className={style.arrow_left}>{"<"}</span>
                {selectedMonth.monthName+" "}{selectedYear}
                <span className={style.arrowRight}>{">"}</span>
            </div>
            <div className={style.calendar_wraper}>
                {calendarDays.map((el)=>{
                    const isAdditiomalDay = el.monthIndex == state.selectedMonth.monthIndex

                    return(<div style={
                                isAdditiomalDay?{backgroundColor:"#3bfc07"}:{}
                               }
                                className={style.calendar_item}>{el.DayNumber}
                            </div>)
                })}
            </div>

        </div>
    );
};

export default Calendar;