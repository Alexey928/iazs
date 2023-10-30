import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
//import {filteredTransactionType} from "../../../ActionCreators/SalePageAC";
import ShowingSpan from "./ShowingSpan";

const NULL_WALUE = "Не задано"

export type callbackDataType = {
    fieldOfFormickData:string
    fieldOfHash:string
    value:string
    hash:string
    chooseFromRemaining:boolean
}

type TableRowProps = {
    rowData: {[p: string]: string | number | null}
    hashForForigenKey:{[key: string]:any}
    bindingHashInterfase:{[key:string]:Array<bindingHashInterfaceItemType>}
}
export type HashCollectionType = {
    [key:string]:{[key:string]:{[key:string]:string|number|null}}// hash of hashes )
}
type formativeDataType =  Array<{[key:string]:string|number|null}>

type TableProps = {
    formativeCallback?:(Data:{[key:string]:string|number|null}[],
                        formativeDataField:string,
                        filtewredValue:string)=>void
    callback:(Data:HashCollectionType, data:callbackDataType)=>void
    formativeData: formativeDataType;
    hashForForigenKey: {[key: string]:{[key:string]:{[key:string]:string|number|null}}};
    bindingHashInterfase:{ [key:string]:Array<bindingHashInterfaceItemType>}
};
export type bindingHashInterfaceItemType =  {
    name:string,
    hash:string,
    hashDataFieldName:string,
    chooseFromRemaining:boolean,
    data:string,
    changeable:boolean,
    totalValue:boolean
    width:number,
    widhClue?:boolean,
    shortenString?:boolean
    filteringMode:"HASH"|"ARAY"
}

const hashValidator = (hash:{[key: string]:HashCollectionType}):boolean =>{
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
const createRowExelModel = (bindingHashInterfase:Array<bindingHashInterfaceItemType>,
                            hashForForigenKey:HashCollectionType,
                            rowData:{[p: string]: string | number | null})=>{
   return  bindingHashInterfase.map((el,i)=>{
        const currentHash =  el.hash?hashForForigenKey[el.hash]:null;
        const currentHashField = el.hash && currentHash ? currentHash[`${rowData[el.data]}`]:null;
        const current = el.hash && currentHashField ? currentHashField[el.hashDataFieldName]:null;
        return `${el.hash ? current ?? NULL_WALUE : rowData[el.data] ?? NULL_WALUE}`;
    })
}
export const createModelForExel =  (formativeAray:formativeDataType,
                                    hashForForigenKey:HashCollectionType,
                                    bindingHashInterfase:Array<bindingHashInterfaceItemType>):string[][] => {
    const exelModel:Array<Array<string>> = [];
    exelModel.push(bindingHashInterfase.map((el) => el.name));
    formativeAray.forEach((el,i)=>{
        exelModel.push(createRowExelModel(bindingHashInterfase,hashForForigenKey,el));
    });

    return exelModel;
}

export const tableCalbackForFormativeDataFiltering = (Data:{[key:string]:string|number|null}[],
                                                     formativeDataField:string,
                                                     filteredValue:string
                                                    )=>{
        if(Data){
            const filteredLinks:{[key:string]:string|number|null}[] = [];
            Data.forEach((el)=>{
              const temp =  el[formativeDataField]?el[formativeDataField]?.toString().toLocaleLowerCase().
                            startsWith(filteredValue):null;
              temp && filteredLinks.push(el)
            })
            return filteredLinks
        }
        return []
}

export const  tableCallbackForHashFiltering = (Data:HashCollectionType, data:callbackDataType):[string[], string, boolean] => {
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
        return [id, data.fieldOfFormickData,data.chooseFromRemaining];
    }
    return [[],data.fieldOfFormickData,data.chooseFromRemaining];
}


const Table: React.FC<TableProps> = ({
                                     hashForForigenKey,
                                     formativeData,
                                     bindingHashInterfase,
                                     callback,
                                     formativeCallback
                                     }) => {
    return (
        <div className={style.tableContayner}>
            <table className={style.table}>
                <thead >
                <tr style={{height:40}} >
                    {bindingHashInterfase["headers"].map((el,i)=> el.changeable && el.hash ?
                        <th style={{minWidth:el.width,maxWidth:el.width}} key={i}>
                            <RegularEditableSpan
                                hasName={el.hashDataFieldName}
                                widthClue={el.widhClue}//el.widthClue
                                hash={hashForForigenKey[el.hash]}
                                key={i}
                                lang={"ru"}
                                mutable={false}
                                title={el.name}
                                type={"text"}
                                handler={(value:string) => {
                                    el.filteringMode==="HASH" && callback(hashForForigenKey,{
                                        value:value,
                                        hash:el.hash,
                                        fieldOfHash:el.hashDataFieldName,
                                        fieldOfFormickData:el.data,
                                        chooseFromRemaining:el.chooseFromRemaining
                                    })
                                    el.filteringMode ==="ARAY"&&
                                    formativeCallback &&
                                    formativeCallback(formativeData,el.data,value)
                                }}
                            /></th>:el.totalValue?
                            <th style={{minWidth:el.width,maxWidth:el.width}}><ShowingSpan countingField={el.data}
                                                                                            key={i} name={el.name}
                                                                                            dataArray={formativeData}/>
                            </th>:
                            <th style={{minWidth:el.width,maxWidth:el.width}} key={i}>{el.name}</th>
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
        </div>

    );
};

const TableRow: React.FC<TableRowProps> = ({   rowData,
                                               hashForForigenKey,
                                               bindingHashInterfase })    => {
    return (
        <tr className={style.row} tabIndex={0}>
            {bindingHashInterfase["headers"].map((el,i)=>{
                const currentHash =  el.hash?hashForForigenKey[el.hash]:null;
                const curentHashField = el.hash?currentHash[`${rowData[el.data]}`]:null
                const curent = el.hash && curentHashField?curentHashField[el.hashDataFieldName]:null
                return (
                  <td key={i} className={style.cell}>{ el.hash? curent ?? NULL_WALUE : rowData[el.data] ?? NULL_WALUE}</td>
                )
            })}
        </tr>
    );
};

export default Table;