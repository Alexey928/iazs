import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table, {
    callbackDataType, createModelForExel,
    HashCollectionType,
    tableCallback
} from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent, {sellectColbac, sellectColbacSetingsType} from "../../UIcomponets/SelectComponent/Select";
import {
    driverHash,
    setFilteredTrasactionAC,
    setSalesPageData, setTransactionInTimeRange,
    TransactionType
} from "../../../ActionCreators/SalePageAC";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../../Resduscers/authUserReduser";
import {
    autoListHashtype,
    fuelListHashType,
    OrganisationHashType,
    stationHashType,
    tankHashType
} from "../../../ActionCreators/TanksPageAC";
import Preloader from "../../UIcomponets/generalPreloader/Preloader";
import {bindingInterface} from "./optionsForSalePageTable";
import * as XLSX from 'xlsx';
import {createDate} from "../../UIcomponets/SelectOfData/creatorsOfDateData/createDate";
import {createYear} from "../../UIcomponets/SelectOfData/creatorsOfDateData/createYear";
import RangeOfDateSelect from "./rangeOfDate";

// select configuration_________________________________________________________
const productSelectOptions = [
    { value: 'Дт'},
    { value: 'А92'},
    { value: 'А95'},
    { value: 'А98'},
];
const azsSelectOptions = [
    { value: 'АЗС-1'},
    { value: 'АЗС-2'},
]

const select_AZS_CalbackOptions:sellectColbacSetingsType = {
    fieldOfHash:"_name",
    fiedOfFormikcData:"_azs_id",
    chooseFromRemaining:false,
}
const selectProductCalbakOptions:sellectColbacSetingsType = {
    fieldOfHash:"_name",
    fiedOfFormikcData:"_fuel_id",
    chooseFromRemaining:true,
}
//_________________________________________________________________________________

const Sales = () => {
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
    const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
    const stationHash = useSelector<AppRootStateType,stationHashType>(state => state.tanksPage.stationHash);
    const filteredTransaction = useSelector<AppRootStateType, Array<{[key:string]:string|number|null}>>((state) =>
    { return state.salesPage.filteredTransaction });
    const fuelListHash = useSelector<AppRootStateType,fuelListHashType>(state => state.tanksPage.fuelListHash);
    const autoListHash = useSelector<AppRootStateType,autoListHashtype>(state => state.tanksPage.autoHashList);
    const tanksHashList = useSelector<AppRootStateType,tankHashType>(state => state.tanksPage.tanksHash);
    const organisationHash = useSelector<AppRootStateType,OrganisationHashType>(state => state.tanksPage.organisationHasah)




    const dispatch = useAppDispatch();
    console.log("Selse");
    const creteExelFile = ()=>{
        const monts = createDate()
        const year = createYear().getYearMonthes();
        console.log(monts,year);
        const ws = XLSX.utils.aoa_to_sheet(createModelForExel(
                                                            filteredTransaction,
                                                            {
                                                                driverHash:driversHash,
                                                                stationHash:stationHash,
                                                                fuelListHash:fuelListHash,
                                                                autoListHash:autoListHash,
                                                                tanksHashList: tanksHashList
                                                            },
                                                            bindingInterface["headers"]));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');
        XLSX.writeFile(wb, 'table.xlsx');
    }


    const getDataFromHeader = (Data:HashCollectionType, interfase:callbackDataType)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = tableCallback(Data,interfase)
        console.log(filteredId);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }

    const setFilteredTrasactionFromAzsSelect = (value:string)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = sellectColbac(stationHash,value,select_AZS_CalbackOptions);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }
    const setFilteredTransactionFromProductSelect = (value:string)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = sellectColbac(fuelListHash,value,selectProductCalbakOptions);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }
    const setTransactionOfTimeRange = (dateToo:string,dateFrom:string)=>{
        console.log(dateToo,dateFrom)
        dispatch(setTransactionInTimeRange(auth.data._token?auth.data._token:"",dateFrom,dateToo));
    }
    useEffect(()=>{
        dispatch(setSalesPageData(auth.data._token?auth.data._token:"","2020-01-1 02:00:20"));
    },[]);

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{display:"flex", zIndex:2, backgroundColor:'rgb(50,255,0)',
                            position:"absolute",left:0,right:0, top:30,height:60,
                            alignItems:"center",justifyContent:"space-evenly",
                }}>
                    <RangeOfDateSelect setRange={setTransactionOfTimeRange}/>
                    <SelectComponent options={productSelectOptions} name={"Продукт"} onSelect={setFilteredTransactionFromProductSelect}/>
                    <SelectComponent options={azsSelectOptions} name={"По АЗС"} onSelect={setFilteredTrasactionFromAzsSelect}/>
                    <button onClick={creteExelFile} style={{zIndex:1,display:"block",position:"absolute",left:0,top:-30}}>XSLS</button>
                </div>
            </div>

                <div className={style.contentWrapper}>
                    {
                        !auth.isLading ?
                            <Table
                                callback={getDataFromHeader}
                                formativeData={filteredTransaction}
                                hashForForigenKey={{
                                    organisationHash:organisationHash,
                                    driverHash:driversHash,
                                    stationHash:stationHash,
                                    fuelListHash:fuelListHash,
                                    autoListHash:autoListHash,
                                    tanksHashList: tanksHashList
                                }}
                                bindingHashInterfase = {bindingInterface}

                            />:
                            <Preloader/>
                    }
                </div>
        </div>
    );
};

export default Sales;