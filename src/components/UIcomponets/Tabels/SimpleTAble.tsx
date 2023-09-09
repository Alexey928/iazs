import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {AppRootStateType} from "../../../State/reduxStore";
import {useSelector} from "react-redux";
import {driverHash, DriverType, TransactionType} from "../../../ActionCreators/SalePageAC";
import {stationHashType, tankHashType} from "../../../ActionCreators/TanksPageAC";




interface TableRowProps {
    rowData: TransactionType;
    driver:DriverType
}

const TableRow: React.FC<TableRowProps> = ({ rowData,driver }) => {

    return (
        <tr className={style.row} tabIndex={0}>
            <td className={style.cell}>{rowData._date??"не задано"}</td>
            <td className={style.cell}>{"не задано"}</td>
            <td className={style.cell}>{rowData._organization_id??"не задано"}</td>
            <td className={style.cell}>{driver._name??"не задано"}</td>
            <td className={style.cell}>{rowData._auto_id??"не задано"}</td>
            <td className={style.cell}>{rowData._azs_id??"не задано"}</td>
            <td className={style.cell}>{rowData._tank_id??"не задано"}</td>
            <td className={style.cell}>{rowData._fuel_id??"не задано"}</td>
            <td className={style.cell}>{rowData._volume??"не задано"}</td>
        </tr>

    );
};

type TableProps = {
    formativeData: Array<formativeDataType>;
    hashForForigenKey: { [key: string]:hashType };
    bindingHashInterfase:{ [key:string]:{idForHash:string}|Array<any>}
};

type hashType = driverHash|//
                tankHashType|
                stationHashType;

type formativeDataType = TransactionType


const Table: React.FC<TableProps> = ({hashForForigenKey}) => {

   const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
   const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
   console.log(transaction,driversHash);

    return (
        <table className={style.table}>
            <thead >
                <tr style={{height:40}} >
                        <th>Дата</th>
                        <th><RegularEditableSpan mutable={false} title={"Путевой лист"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Организация"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Водитель"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Авто"} type={"text"}/></th>
                        <th>АЗС</th>
                        <th>Рез-ар</th>
                        <th>Продукт</th>
                        <th>Объем</th>
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

export default Table;