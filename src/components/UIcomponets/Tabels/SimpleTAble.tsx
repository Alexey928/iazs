import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {AppRootStateType} from "../../../State/reduxStore";
import {useSelector} from "react-redux";
import {driverHash, DriverType, TransactionType} from "../../../ActionCreators/SalePageAC";
import {stationHashType, StationType, tankHashType, TankType} from "../../../ActionCreators/TanksPageAC";

interface TableRowProps {
    rowData: TransactionType;
    driver:DriverType
}
type TableProps = {
    formativeData: Array<formativeDataType>;
    hashForForigenKey: { [key: string]:hashType };
    bindingHashInterfase:{ [key:string]:Array<bindingHashInterfaceItemType>}
};
export type bindingHashInterfaceItemType =  {
    name:string,
    hash:string,
    hashDataFieldName:string,
    data:string
    changeable:boolean,
    width:number,
}

//for integration to another application we need tu change this types, too types of yor application
type hashType = driverHash|
                tankHashType|
                stationHashType;

type formativeDataType = TransactionType|
                         Array<TankType>|
                        Array<StationType>
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


const Table: React.FC<TableProps> = ({hashForForigenKey,
                                     formativeData,
                                     bindingHashInterfase,
                                     }) => {

   const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
   const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);

   console.log(transaction,driversHash,Object.keys(hashForForigenKey));

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
                {transaction.map((rowData, index) => (
                    <TableRow key={index} rowData={rowData} driver={driversHash[`${rowData._driver_id??"uknown"}`]}/>
                ))}
            </tbody>
        </table>
    );
};

const TableRow: React.FC<TableRowProps> = ({ rowData,driver }) => {
    return (
        <tr className={style.row} tabIndex={0}>
            <td className={style.cell}>{rowData._date??"не задано"}</td>
            <td className={style.cell}>{"не задано"}</td>
            <td className={style.cell}>{rowData._organization_id??"не задано"}</td>
            <td className={style.cell}>{shortenName(driver._name)??"не задано"}</td>
            <td className={style.cell}>{rowData._auto_id??"не задано"}</td>
            <td className={style.cell}>{rowData._azs_id??"не задано"}</td>
            <td className={style.cell}>{rowData._tank_id??"не задано"}</td>
            <td className={style.cell}>{rowData._fuel_id??"не задано"}</td>
            <td className={style.cell}>{rowData._volume??"не задано"}</td>
        </tr>

    );
};

export default Table;