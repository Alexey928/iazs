interface CreateDateparams {
locale:string//"usa","uk","gb"....
 date:Date
}


 export const createDaste = (params?:CreateDateparams)=>{
    const local= params?params.locale:"default";
    const date = params?params.date:new Date();
    const DayNumber  = date.getDate();
    const day = date.toLocaleDateString(local,{weekday:"long"});
    const dayShort = date.toLocaleDateString(local,{weekday:"short"});
    const dayNumberInWeek = date.getDate()+1;
    const Yar= date.getFullYear();
    const YarShjort = date.toLocaleDateString(local,{year:"2-digit"})



    return {
        dayShort,
        YarShjort,
        local,
        date,
        DayNumber,
        day,
        dayNumberInWeek,
        Yar,
    }
}
