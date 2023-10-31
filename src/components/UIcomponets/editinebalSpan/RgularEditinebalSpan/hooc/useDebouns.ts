import {useEffect, useMemo, useState} from 'react'
import {log} from "util";

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 300)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
export const configureClueFormative = (formativeData:Array<{[key:string]:string|number|null}>,
                                       field:string,
                                       value:string)=>{
    console.log("formative");
    const temp:Array<string> = []
    if(value){
        formativeData && formativeData.forEach((item,i)=>{
            const currentValue = item[field]  ?? "";
            if(currentValue.toString().startsWith(value)) temp.push(currentValue.toString())
        })
    }
    console.log(temp);
    return temp
}

export const  configureClue = (curentValue:string,
                               hashFieldName:string,
                               filteredPool:{[p: string]:{[p: string]: string | number |null}},
                               corentCueArr:string[]
                                ):string[]  => {
    console.log(curentValue,hashFieldName,corentCueArr,filteredPool)
    let temp:string[] = [];
    if(curentValue){
        for(let key in filteredPool){
        const current = filteredPool[key];

        const currentHashValue = current[hashFieldName]??"";

        if(currentHashValue.toString().toLowerCase().startsWith(curentValue.toLowerCase())) temp.push(currentHashValue.toString());
    }
    }
    console.log(temp)
    return  temp;
}