import React from 'react';
import {useCalendar} from "./hooks/useCalendar";
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
    firstWeekDay
                        }) => {
const {state}=useCalendar({selectedDate:new Date(),firstWeekDay});
    console.log(state);

    return (
        <div>
            Календарь
        </div>
    );
};

export default Calendar;