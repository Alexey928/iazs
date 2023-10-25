import style from "../Tancs/Tanks.module.css"
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {OrganisationItemType} from "../../ActionCreators/TanksPageAC";
import Table from "../UIcomponets/Tabels/SimpleTAble";
import {bindingHashInterface} from "./referensePageOptions";

const Reference:React.FC = () => {
    const dispatch = useAppDispatch()
    const organisationlist = useSelector<AppRootStateType,Array<OrganisationItemType>>(state => state.tanksPage.organisationList)

return (
    <div className={style.content} >
        <div className={style.contentHeader}>
            <span>Организации</span>
            <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
        </div>

        <div className={style.contentWrapper}>
            <Table callback={()=>{}}
                   formativeData={organisationlist}
                   hashForForigenKey={{}}
                   bindingHashInterfase={bindingHashInterface}/>
        </div>
    </div>
    );
};

export default Reference;