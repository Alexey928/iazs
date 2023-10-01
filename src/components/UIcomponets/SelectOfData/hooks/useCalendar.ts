import {useMemo, useState} from "react";
import {createDate} from "../creatorsOfDateData/createDate";
import {createMonth} from "../creatorsOfDateData/createMonth";
import {createYear} from "../creatorsOfDateData/createYear";

interface usecalendarParams{
    locale?:string
    selectedDate:Date
    firstWeekDay:number
}
export const useCalendar = ({locale,selectedDate:date,firstWeekDay}:usecalendarParams)=>{
    const [mode,setMode] = useState<"day"|"month>"|"years">("day");
    const [selectedDate,setSelectedDate] = useState(createDate({date}));
    const [selectedMonth, setSelectedMonth] = useState(createMonth({date:new Date(selectedDate.Year,selectedDate.monthIndex)}));
    const [selectedYear, setSelectedYear] = useState(selectedDate.Year);
    const monthNames = useMemo(()=>getMonthNames(locale),[]);
    const weekDayNames = useMemo(()=>getDayNamesInWeek(firstWeekDay,locale),[])

    return {
        state:{
            mode,
            selectedDate,
            selectedMonth,
            selectedYear,
            monthNames,
            weekDayNames,

        }
    }
}

const getMonthNames = (locale:string="default")=>{
    const montNames:{
        month:ReturnType<typeof createDate>["monthName"];
        monthShort:ReturnType<typeof createDate>["monthShort"];//interesting method for typing of Array
        monthIndex:ReturnType<typeof createDate>["monthIndex"];
    }[] = Array.from({length:12});

    const d = new Date();

    montNames.forEach((el,i)=>{
        const {monthName,monthIndex,monthShort,date } = createDate({
        locale,
        date:new Date(d.getFullYear(),d.getMonth()+i,d.getDate())
        });
        const ff = d.getMonth()
        montNames[monthIndex]={month:monthName,monthIndex,monthShort,};

    })
    return montNames;
}

const getDayNamesInWeek = ( firstWeekDay:number = 2, locale:string="default")=>{
    const weekDaysNames:{
        day:ReturnType<typeof createDate>["day"]
        dayShort: ReturnType<typeof createDate>["dayShort"]
    }[] = Array.from({length:7})

    const d = new Date();
    weekDaysNames.forEach((_,i)=>{
        const{day,dayNumberInWeek,dayShort}=createDate({locale,date:new Date(d.getFullYear(),d.getMonth(),d.getDate()+i)});
        weekDaysNames[dayNumberInWeek-1]={day,dayShort}
    });
    return [...weekDaysNames.slice(firstWeekDay-1),...weekDaysNames.slice(0,firstWeekDay-1)];
}
