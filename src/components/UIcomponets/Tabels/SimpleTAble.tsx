import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {driverHash, DriverType, TransactionType} from "../../../ActionCreators/SalePageAC";
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

type TableProps<K> = {
    callbacck:(Data:{[key:string]:{[key:string]:{[key:string]:string|number|null}}},
               data:callbackDataType)=>void
    formativeData: Array<K>;
    hashForForigenKey: { [key: string]:hashType };
    bindingHashInterfase:{ [key:string]:Array<bindingHashInterfaceItemType>}
};
export type bindingHashInterfaceItemType =  {
    name:string,
    hash:string,
    hashDataFieldName:string,
    fieldFromHash:string,
    data:string,
    changeable:boolean,
    width:number,
}
export type dateType = {
    [key:string]:{[key:string]:{[key:string]:string|number|null}}
}

//for integration to another application we need tu change this types, too types of yor application
type hashType = driverHash| tankHashType| stationHashType;
type formativeDataType = TransactionType | StationType | DriverType
//________________________________________________________

const hashValidator = (hash:{[key: string]:hashType}):boolean =>{
    let trigger = true;
    for (let hashKey in hash) {
        hash[hashKey] ? trigger=false:trigger=true
    }
    return trigger
}


const  shortenName = (fullName:string|null):string|null=>{
    const n = fullName ? fullName.split(" ").map((item,i)=>{
      return   i===0 ? item:item.charAt(0).toUpperCase();
    }).join(" "):null;
    console.log(n ,`--->${fullName}`)
    return n
}
export const  tableCallback = (Data:dateType,data:callbackDataType):void  => {
    if(data.hash) {
        const id:string[] = []
        const hash = Data[data.hash];
        for (let el in hash) {
            const value:{[key:string]:string|number|null} = hash[el];
            const v = value[data.fieldOfHash]
            //console.log(v?String(v).toLowerCase():"not transmitted !");
            if(v){
                const flag = String(v).toLowerCase().startsWith(data.value);
                if(flag)id.push(el,String(v))
            }
            //тут будем диспачить креетор setFilterAC пердавая ему значение в виде ([id:string,id:..,id:.., ...],{data.})
        }
        console.log(id);
    }
    if(!data.hash){
        //тут будем диспачить креатор setFilterAC перредавая ему значение в виде (string ,{data})
        //на уровне креейтора нужно разруливать логику на две ветки по флагу  isArray
    }
}


const Table: React.FC<TableProps<formativeDataType>> = ({
                                     hashForForigenKey,
                                     formativeData,
                                     bindingHashInterfase,
                                     }) => {
    return (
        <table className={style.table}>
            <thead >
                <tr style={{height:40}} >
                    {bindingHashInterfase["headers"].map((el,i)=>!el.changeable?
                            <th>{el.name}</th>:
                            <th><RegularEditableSpan key={i} mutable={false} title={el.name} type={"text"}/></th>
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
                const curentHashField = el.hash?currentHash[`${rowData[el.fieldFromHash]}`]:null
                const curent = el.hash&&curentHashField?curentHashField[el.hashDataFieldName]:null

                return (
                  <td key={i} className={style.cell}>{ el.hash? curent ?? "не задано" : rowData[el.data] ?? "не задано"}</td>
              )
            })}
        </tr>
    );
};

export default Table;