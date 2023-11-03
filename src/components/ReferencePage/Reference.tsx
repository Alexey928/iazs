import style from "../Tancs/Tanks.module.css"
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {OrganisationItemType} from "../../ActionCreators/TanksPageAC";
import Table, {tableCalbackForFormativeDataFiltering} from "../UIcomponets/Tabels/SimpleTAble";
import {bindingHashInterface} from "./referensePageOptions";

const Reference:React.FC = () => {
    const dispatch = useAppDispatch()
    const organisationlist = useSelector<AppRootStateType,Array<OrganisationItemType>>(state => state.tanksPage.organisationList);

    const getDataFromHeaderUsArrayMode = (Data:{[key:string]:string|number|null}[],
                                          formativeDataField:string,
                                          filteredValue:string,
                                          flag:boolean)=>{

        const [filteredLinkcs, filteringDerectionFlag] = tableCalbackForFormativeDataFiltering(Data,formativeDataField, filteredValue,flag);
    }



return (
    <div className={style.content} >
        <div className={style.contentHeader}>
            <span>Организации</span>
            <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
        </div>

        <div className={style.contentWrapper}>
            <Table callback={()=>{}}
                   formativeCallback={getDataFromHeaderUsArrayMode}
                   formativeData={organisationlist}
                   hashForForigenKey={{}}
                   bindingHashInterfase={bindingHashInterface}/>
        </div>
    </div>
    );
};

export default Reference;