import style from "../Tancs/Tanks.module.css"
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {OrganisationItemType, setFilteredOrganisationAC} from "../../ActionCreators/TanksPageAC";
import Table, {tableCalbackForFormativeDataFiltering} from "../UIcomponets/Tabels/SimpleTAble";
import {bindingHashInterface} from "./referensePageOptions";
import {useEffect} from "react";

const Reference:React.FC = () => {
    const dispatch = useAppDispatch()
    const organisationlist = useSelector<AppRootStateType,Array<OrganisationItemType>>(state => state.tanksPage.organisationList);
    const filteredOrganisation = useSelector<AppRootStateType,Array<{[key:string]:string|number|null}>>(state=>state.tanksPage.filteredOrganisationList)

    const getDataFromHeaderUsArrayMode = (Data:{[key:string]:string|number|null}[],
                                          formativeDataField:string,
                                          filteredValue:string,
                                          flag:boolean)=>{

        const [filteredLinks, filteringDerectionFlag] = tableCalbackForFormativeDataFiltering(Data,formativeDataField, filteredValue,flag);
        console.log(filteringDerectionFlag);
        dispatch(setFilteredOrganisationAC(filteredLinks))
    }

    useEffect(()=>{
        dispatch(setFilteredOrganisationAC(organisationlist))
    },[])

return (
    <div className={style.content} >
        <div className={style.contentHeader}>
            <span>Организации</span>
            <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
        </div>

        <div className={style.contentWrapper}>
            <Table callback={()=>{}}
                   formativeCallback={getDataFromHeaderUsArrayMode}
                   formativeData={filteredOrganisation}
                   baseFormativeData={organisationlist}
                   hashForForigenKey={{}}
                   bindingHashInterfase={bindingHashInterface}/>
        </div>
    </div>
    );
};

export default Reference;