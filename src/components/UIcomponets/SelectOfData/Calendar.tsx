import React from 'react';
import {isIqualDate, useCalendar} from "./hooks/useCalendar";
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

const {state,methods}= useCalendar({selectedDate:selectedDate,firstWeekDay:firstWeekDay});
const {selectedMonth,calendarDays,mode,selectedYear,selectedDate:date} = state;


    return (
        <div className={style.calendar}>
            <div className={style.calendar_header}>
                <span className={style.arrow_left}>{"<"}</span>
                {selectedMonth.monthName+" "}{selectedYear}
                <span className={style.arrowRight}>{">"}</span>
            </div>
            <div className={style.calendar_wraper}>
                {calendarDays.map((el)=>{
                    const isAdditionalDay = el.monthIndex == state.selectedMonth.monthIndex;
                    const isDayIqual = isIqualDate(el.date,date.date)

                    return(<div style={
                                isAdditionalDay?{backgroundColor:"#3bfc07",color:isDayIqual?"#ff6300":"white"}:
                                                {color:isDayIqual?"blue":"white"}
                               }
                                onClick={()=>{
                                    selectDate(el.date);
                                    methods.setSelectedDate(el)

                                }}
                                className={style.calendar_item}>{el.DayNumber}
                            </div>)
                })}
            </div>

        </div>
    );
};

export default Calendar;