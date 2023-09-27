import {createDate} from "./createDate";

interface creteMonthParamsType {
    date?:Date;
    locale:string
}


export const createMonth = (params?:creteMonthParamsType)=>{
    const date = params?.date?? new Date;
    const locale =params?.locale??"default";

    const currentDate = createDate({date, locale});
    const {monthName,Year,monthNumber,monthIndex} =currentDate;

    const getDay = (dayNumber:number)=>{
        return createDate({date:new Date(Year,monthIndex,dayNumber),locale})
    }
    const cteateMonthDays = [];



}