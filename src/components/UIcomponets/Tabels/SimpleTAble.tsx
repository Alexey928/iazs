import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {driverHash, DriverType, filteredTransactionType, TransactionType} from "../../../ActionCreators/SalePageAC";
import {stationHashType, StationType, tankHashType} from "../../../ActionCreators/TanksPageAC";



export type callbackDataType = {
    fieldOfFormickData:string
    fieldOfHash:string
    value:string
    hash:string
}

type TableRowProps = {
    rowData: any
    hashForForigenKey:{[key: string]:any}
    bindingHashInterfase:{[key:string]:Array<bindingHashInterfaceItemType>}
}

type TableProps = {
    callback:(Data:{[key:string]:{[key:string]:{[key:string]:string|number|null}}},
               data:callbackDataType)=>void
    formativeData: filteredTransactionType;
    hashForForigenKey: {[key: string]:hashType};
    bindingHashInterfase:{ [key:string]:Array<bindingHashInterfaceItemType>}
};
export type bindingHashInterfaceItemType =  {
    name:string,
    hash:string,
    hashDataFieldName:string,
    chooseFromRemaining:boolean,
    data:string,
    changeable:boolean,
    width:number,
}
export type dateType = {
    [key:string]:{[key:string]:{[key:string]:string|number|null}}// хеш хешей )
}

//for integration to another application we need tu change this types, too types of yor application
type hashType = driverHash| tankHashType| stationHashType;
//type formativeDataType = TransactionType | StationType | DriverType
//_____________________________________________________________________________________________________________

const hashValidator = (hash:{[key: string]:hashType}):boolean =>{
    let trigger = true;
    for (let hashKey in hash) {
        hash[hashKey] ? trigger=false:trigger=true;
    }
    return trigger
}


const  shortenName = (fullName:string|null):string|null=>{
    const n = fullName ? fullName.split(" ").map((item,i)=>{
      return   i===0 ? item:item.charAt(0).toUpperCase();
    }).join(" "):null;
    console.log(n ,`---> ${fullName}`)
    return n
}
export const  tableCallback = (Data:dateType,data:callbackDataType):[string[], callbackDataType] => {
    if(data.hash) {
        const id:string[] = []
        const hash = Data[data.hash];
        for (let el in hash) {
            const value:{[key:string]:string|number|null} = hash[el];
            const v = value[data.fieldOfHash]
            if(v){
                const flag = String(v).toLowerCase().startsWith(data.value);
                if(flag) id.push(el);

            }
        }
        console.log(id);
        return [id, data]
    }
    return [[],data]
}


const Table: React.FC<TableProps> = ({
                                     hashForForigenKey,
                                     formativeData,
                                     bindingHashInterfase,
                                     callback
                                     }) => {
    return (
        <table className={style.table}>
            <thead >
                <tr style={{height:40}} >
                    {bindingHashInterfase["headers"].map((el,i)=> el.changeable && el.hash ?
                        <th key={i}>
                            <RegularEditableSpan
                                key={i}
                                lang={"ru"}
                                mutable={false}
                                title={el.name}
                                type={"text"}
                                handler={(value:string)=>{
                                    callback(hashForForigenKey,{
                                        value:value,
                                        hash:el.hash,
                                        fieldOfHash:el.hashDataFieldName,
                                        fieldOfFormickData:el.data,
                                    })
                                }}
                            /></th>:<th key={i}>{el.name}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {formativeData.map((rowData, index) => (
                    <TableRow key={index}
                              rowData={rowData}
                              hashForForigenKey={hashForForigenKey}
                              bindingHashInterfase={bindingHashInterfase}
                    />

                ))}
            </tbody>
        </table>
    );
};

const TableRow: React.FC<TableRowProps> = ({ rowData,hashForForigenKey,bindingHashInterfase }) => {
    return (
        <tr className={style.row} tabIndex={0}>
            {bindingHashInterfase["headers"].map((el,i)=>{
                const currentHash =  el.hash?hashForForigenKey[el.hash]:null;
                const curentHashField = el.hash?currentHash[`${rowData[el.data]}`]:null
                const curent = el.hash && curentHashField?curentHashField[el.hashDataFieldName]:null
                return (
                  <td key={i} className={style.cell}>{ el.hash? curent ?? "не задано" : rowData[el.data] ?? "не задано"}</td>
              )
            })}
        </tr>
    );
};

export default Table;