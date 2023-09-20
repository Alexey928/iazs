import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table, {
    callbackDataType,
    HashCollectionType,
    tableCallback
} from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent, {sellectColbac, sellectColbacSetingsType} from "../../UIcomponets/SelectComponent/Select";
import {
    driverHash,
    setFilteredTrasactionAC,
    setsalesPagedata,
    TransactionType
} from "../../../ActionCreators/SalePageAC";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../../Resduscers/authUserReduser";
import {fuelListHashType, stationHashType} from "../../../ActionCreators/TanksPageAC";
import Preloader from "../../UIcomponets/generalPreloader/Preloader";
import loginPage from "../../Login/loginPage";
import {bindingInterface} from "./options";

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
    fieldOfHash:"",
    fiedOfFormikcData:"",
    chooseFromRemaining:false
}

//a structure that connects hashes with the necessary fields of the forming object and sets callbacks to their column headers, parameterizing them

//______________________________________________________________________________________________________________________

const Sales = () => {
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
    const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
    const stationHash = useSelector<AppRootStateType,stationHashType>(state => state.tanksPage.stationHash);
    const filteredTransaction = useSelector<AppRootStateType, Array<{[key:string]:string|number|null}>>(state=>state.salesPage.filteredTransaction);
    const fuelListHash = useSelector<AppRootStateType,fuelListHashType>(state => state.tanksPage.fuelListHash)
    const dispatch = useAppDispatch();

    const getDataFromHeader = (Data:HashCollectionType, interfase:callbackDataType)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = tableCallback(Data,interfase)
        console.log(filteredId);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }

    const setFilteredTrasactionFromAzsSelect = (value:string)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = sellectColbac(stationHash,value,select_AZS_CalbackOptions);
        console.log(filteredId);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }
    const setFilteredTransactionFromProductSelect = (value:string)=>{
        const [filteredId, fieldOfFormickData,chooseFromRemaining] = sellectColbac(driversHash,value,select_AZS_CalbackOptions);
        console.log(filteredId);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,fieldOfFormickData,chooseFromRemaining));
    }

    useEffect(()=>{
        dispatch(setsalesPagedata(auth.data._token?auth.data._token:"","2020-01-30 02:00:20"));
    },[]);

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{paddingLeft:10, display:"flex", zIndex:2, backgroundColor:'rgb(50,255,0)',
                            position:"absolute",left:0,right:0, top:30,height:60,
                            alignItems:"center",justifyContent:"space-evenly",
                }}>
                    <SelectComponent options={productSelectOptions} name={"Продукт"}/>
                    <SelectComponent options={azsSelectOptions} name={"По АЗС"}/>
                </div>
            </div>
            <div className={style.contentWrapper}>
                {
                    !auth.isLading ?
                    <Table
                            callback={getDataFromHeader}
                            formativeData={filteredTransaction}
                            hashForForigenKey={{
                                driverHash:driversHash,
                                stationHash:stationHash,
                                fuelListHash:fuelListHash,
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