import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {driverHash, DriverType, TransactionType} from "../../../ActionCreators/SalePageAC";
import {stationHashType, StationType, tankHashType} from "../../../ActionCreators/TanksPageAC";



type TableRowProps = {
    rowData: any
    hashForForigenKey:{[key: string]:any}
    bindingHashInterfase:{[key:string]:Array<bindingHashInterfaceItemType>}
}

type TableProps<T> = {
    formativeData: Array<T>;
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
                            <th><RegularEditableSpan key={i} mutable={false} title={el.name}  type={"text"}/></th>
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
                const curent = el.hash&&curentHashField?curentHashField["_name"]:null
                console.log(currentHash,curentHashField,curent)
                return (
                  <td key={i} className={style.cell}>{el.hash?"lllll":rowData[el.data]??"не задано"}</td>
              )
            })}
            {/*<td className={style.cell}>{rowData._id?rowData._id:"не задано"}</td>*/}
        </tr>
    );
};


export default Table;