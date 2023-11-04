import React  from 'react';
import style from "./Tables.module.css"
import {RegularEditableSpan} from "../editinebalSpan/RgularEditinebalSpan/RegularEditableSpan";
import ShowingSpan from "./ShowingSpan";

const NULL_WALUE = "Не задано"

export type callbackDataType = {
    fieldOfFormativeData:string
    fieldOfHash:string
    value:string
    hash:string
    chooseFromRemaining:boolean
}

type TableRowProps = {
    rowData: {[p: string]: string | number | null}
    hashForForeignKey:{[key: string]:any}
    bindingHashInterface:{[key:string]:Array<bindingHashInterfaceItemType>}
}
export type HashCollectionType = {
    [key:string]:{[key:string]:{[key:string]:string|number|null}}// hash of hashes )
}
type formativeDataType =  Array<{[key:string]:string|number|null}>

type TableProps = {
    marginTop?:number
    formativeCallback?:(Data:{[key:string]:string|number|null}[],
                        formativeDataField:string,
                        filteredValue:string,
                        flag:boolean)=>void
    callback:(Data:HashCollectionType, data:callbackDataType)=>void
    formativeData: formativeDataType;
    baseFormativeData?:formativeDataType
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
    formativeAray.forEach((el)=>{
        exelModel.push(createRowExelModel(bindingHashInterfase,hashForForigenKey,el));
    });

    return exelModel;
}

export const tableCalbackForFormativeDataFiltering = (Data:{[key:string]:string|number|null}[],
                                                       formativeDataField:string,
                                                       filteredValue:string,
                                                       flag:boolean,
                                                       ):[{[key:string]:string|number|null}[],boolean]=>{
        if(Data){
            const filteredLinks:{[key:string]:string|number|null}[] = [];
            Data.forEach((el)=>{
              const temp =  el[formativeDataField]?el[formativeDataField]?.toString().toLocaleLowerCase().
                            startsWith(filteredValue):null ;
              temp && filteredLinks.push(el)
            })
            return [filteredLinks, flag];
        }
        return [[],flag];
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
        return [id, data.fieldOfFormativeData,data.chooseFromRemaining];
    }
    return [[],data.fieldOfFormativeData,data.chooseFromRemaining];
}


const Table: React.FC<TableProps> = ({
                                     hashForForigenKey,
                                     formativeData,
                                     baseFormativeData,
                                     bindingHashInterfase,
                                     callback,
                                     formativeCallback,
                                     marginTop


                                     }) => {

    return (
        <div className={style.tableContayner} >
            <table className={style.table} style={{marginTop: marginTop ?? 0}}>
                <thead >
                <tr style={{height:40}} >
                    {bindingHashInterfase["headers"].map((el,i)=> el.changeable ?
                        <th style={{minWidth:el.width,maxWidth:el.width}} key={i}>
                            <RegularEditableSpan
                                clueFilteredParam={el.filteringMode}
                                formativeField={el.data}
                                formative={el.chooseFromRemaining ? formativeData: baseFormativeData ?? formativeData}
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
                                        fieldOfFormativeData:el.data,
                                        chooseFromRemaining:el.chooseFromRemaining
                                    })
                                    el.filteringMode ==="ARAY"&&
                                    formativeCallback &&
                                    formativeCallback(baseFormativeData ? baseFormativeData :
                                                            formativeData,
                                                            el.data,
                                                            value,
                                                            el.chooseFromRemaining);
                                }}
                            /></th>:el.totalValue?
                            <th style={{minWidth:el.width,maxWidth:el.width}}>
                                <ShowingSpan countingField={el.data}
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
                              hashForForeignKey={hashForForigenKey}
                              bindingHashInterface={bindingHashInterfase}
                    />
                ))}
                </tbody>
            </table>
        </div>

    );
};

const TableRow: React.FC<TableRowProps> = ({   rowData,
                                               hashForForeignKey,
                                               bindingHashInterface })    => {
    return (
        <tr className={style.row} tabIndex={0}>
            {bindingHashInterface["headers"].map((el, i)=>{
                const currentHash =  el.hash?hashForForeignKey[el.hash]:null;
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