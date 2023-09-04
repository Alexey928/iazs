import React from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
// Подключите ваш файл стилей для таблицы

interface TableRowProps {
    rowData: string[];
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
    return (
        <tr className={style.row} tabIndex={0}>
            {rowData.map((cellData, index) => (
                <td className={style.cell} key={index}>{cellData}</td>
            ))}
        </tr>
    );
};


const Table: React.FC = () => {


    const generateData = () => {
        const data: string[][] = [];
        for (let i = 0; i < 100; i++) {
            const row: string[] = [];
            for (let j = 0; j < 9; j++) {
                row.push(`Строка ${i + 1}, Столбец ${j + 1}`);
            }
            data.push(row);
        }
        return data;
    };

    return (
        <table className={style.table}>
            <thead >
                <tr style={{height:40}} >
                        <th>Заголовок 1</th>
                        <th><RegularEditableSpan mutable={false} title={"Загоовок 2"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Загоовок 3"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Загоовок 4"} type={"text"}/></th>
                        <th><RegularEditableSpan mutable={false} title={"Загоовок 5"} type={"text"}/></th>
                        <th>Заголовок 6</th>
                        <th>Заголовок 7</th>
                        <th>Заголовок 8</th>
                        <th>Заголовок 9</th>
                    </tr>
            </thead>
            <tbody>
                {generateData().map((rowData, index) => (
                    <TableRow key={index} rowData={rowData}/>
                ))}
            </tbody>
        </table>
    );
};

export default Table;