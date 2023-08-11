import style from "../Tancs/Tanks.module.css"
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useAppDispatch} from "../../State/reduxStore";



const Reference:React.FC = () => {
    const dispatch = useAppDispatch()

return (
    <div className={style.content} >
        <div className={style.contentHeader}>
            <span>Организации</span>
            <button  onClick={()=>dispatch(setIsMenuActiveAC())}  >menu</button>
        </div>
    </div>
    );
};

export default Reference;