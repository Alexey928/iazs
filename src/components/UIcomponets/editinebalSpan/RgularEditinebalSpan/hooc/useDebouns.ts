import {useEffect, useMemo, useState} from 'react'

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

export const  configurateClue = (curentValue:string,
                                    hashFieldName:string,
                                    filteredPool:{[p: string]:{[p: string]: string | number |null}},
                                    corentCueArr:string[]
                                ):string[]  => {
    console.log(curentValue,hashFieldName,corentCueArr,filteredPool)
    let temp:string[] = [];
    if(curentValue){
        for(let key in filteredPool){
        const current = filteredPool[key];

        const currentHashValue =current[hashFieldName]??"";


        if(currentHashValue.toString().toLowerCase().startsWith(curentValue.toLowerCase())) temp.push(currentHashValue.toString());
    }
    }
    // if(corentCueArr.length>0){
    //     temp = corentCueArr.filter((e)=>e.toLowerCase().startsWith(curentValue))
    // }
    console.log(temp)
    return  temp;
}