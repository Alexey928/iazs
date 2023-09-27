interface CreateDateparams {
locale:string//"usa","uk","gb"....
 date:Date
}


const getWeekNumber = (date:Date)=>{
    const firstDateOfYear = new Date(date.getFullYear(),0,1);
    const lastDayOfYear = (date.getTime() - firstDateOfYear.getTime())/864000000
    return (lastDayOfYear + firstDateOfYear.getDay()+1)/7;
}


 export const createDate = (params?:CreateDateparams)=>{
    const locale= params?params.locale:"default";
    const date = params?params.date : new Date();
    const DayNumber  = date.getDate();
    const day = date.toLocaleDateString(locale,{weekday:"long"});
    const dayShort = date.toLocaleDateString(locale,{weekday:"short"});
    const dayNumberInWeek = date.getDate()+1;
    const Year= date.getFullYear();
    const YearShort = date.toLocaleDateString(locale,{year:"2-digit"});
    const WeekNumberInMonts  = Math.ceil(getWeekNumber(date))

     return {
        WeekNumberInMonts,
        dayShort,
        YearShort,
        locale,
        date,
        DayNumber,
        day,
        dayNumberInWeek,
        Year,
     }
}
