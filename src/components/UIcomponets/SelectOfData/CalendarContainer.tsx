import React, {useState} from 'react';
import Calendar from "./Calendar";
type CalendarContainerPropsType = {
    calback:(date:string)=>string
}
const CalendarContainer = () => {
    const [selectedDate,setSelectedDate] = useState<Date>(new Date());

    return (
        <div>
            <Calendar firstWeekDay={2} selectedDate={selectedDate} selectDate={(date)=>{setSelectedDate(date)}}/>
        </div>
    );
};

export default CalendarContainer;