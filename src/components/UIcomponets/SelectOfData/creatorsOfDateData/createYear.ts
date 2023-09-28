import {createDate} from "./createDate";
import {createMonth} from "./createMonth";

interface createYearParametrs{
    year?:number,
    locale?:string,
    numberOfMonth?:number
}
const MONTH_COUNT = 12;

export const cteateYear = (params?:createYearParametrs) => {
    const locale = params?.locale??"default";
    const tuday = createDate();
    const year = params?.year??tuday.Year;
    const monthNumber = params?.numberOfMonth??tuday.monthNumber;
    const month = createMonth({date:new Date(year,monthNumber),locale:locale});
    
}