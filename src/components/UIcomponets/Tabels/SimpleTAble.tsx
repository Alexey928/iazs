import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import {AppRootStateType} from "../../../State/reduxStore";
import {useSelector} from "react-redux";
import {driverHash, TransactionType} from "../../../ActionCreators/SalePageAC";
// Подключите ваш файл стилей для таблицы

interface TableRowProps {
    rowData: TransactionType;
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {

    return (
        <tr className={style.row} tabIndex={0}>
            <td className={style.cell}>{rowData._date??"не задано"}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
            <td className={style.cell}>{rowData._volume15??""}</td>
        </tr>
    );
};


const Table: React.FC = () => {
   const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
   const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);

   console.log(transaction,driversHash)


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
                    <TableRow key={index} rowData={rowData} />
                ))}
            </tbody>
        </table>
    );
};

export default Table;