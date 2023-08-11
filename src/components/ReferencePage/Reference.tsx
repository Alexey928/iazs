import style from "../Tancs/Tanks.module.css"
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useAppDispatch} from "../../State/reduxStore";



const Reference:React.FC = () => {
    const dispatch = useAppDispatch()

return (
    <div className={style.content} >
        <div className={style.contentHeader}>
            <span>Организации</span>
            <button  onClick={()=>dispatch(sestIsMenuActiveAC())}  >menu</button>
        </div>
    </div>
    );
};

export default Reference;