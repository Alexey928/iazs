import React, {useEffect} from 'react';
import style from './login.module.css';
import {EditableSpan} from "../UIcomponets/editinebalSpan/EditableSpan";
import {Field, InjectedFormProps,reduxForm,WrappedFieldProps} from "redux-form";
import {maxLength, minLength, notSpaces, required} from "../../utils/validators";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {loginTC} from "../../ActionCreators/authUserAC";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import {useNavigate} from "react-router-dom";

type FormDataType = {
    login?: string;
    password?: string;
    rememberMe?:boolean
};


export const RenderedField:React.FC<WrappedFieldProps> = ({input,meta ,...props})=>{
    console.log(meta);
return(
    <div className={style.errorContainer}>
        <span className={`${style.error} ${meta.error && style.errorActive}`}>{meta.error}</span>
        <input {...input} {...props} />
    </div>
)
}

const LoginForm = (props:InjectedFormProps)=>{
    console.log(props)
    return(
        <form className={style.form} onSubmit={props.handleSubmit}>
            <EditableSpan input={Field} title={"Yor login ?"} type={"text"} placeholder={"'demo' - for testing"}
                           handler={(tittle:string) => console.log(tittle)}/>

            <EditableSpan input={Field} title={"Yor Password ?"} type={"password"} placeholder={"'demo' - for testing"}/>
            <span> remember me <Field name={"rememberMe"} type={"checkbox"} component="input"/></span>
            <button   className={style.button}>Sing In</button>
        </form>
    )
}

const ReduxLoginForm = reduxForm({
    form:"login",
})(LoginForm)

const LoginPage = () => {
    const auth = useSelector<AppRootStateType, UserAuthStateType>(state => state.userAuth)
    console.log(auth.isLading)
    const navigate = useNavigate();
    useEffect(()=>{
        if(auth.isAuth) { navigate("/Tanks/")};
    })
    const dispatch = useAppDispatch();
    const onSubmit = (formData:FormDataType)=>{
        if(!maxLength(formData.login) && !required(formData.login) && !notSpaces(formData.login)) {
            if(!required(formData.password) && !minLength(formData.password) && !notSpaces(formData.password)){
                if(formData.password && formData.login) {
                   !auth.isLading && dispatch(loginTC(formData.password,formData.login,formData.rememberMe?formData.rememberMe:false))
                }
            } else {alert("password is not corect")};
        }else{
            alert("login is not corect");
        }
    }
    return (
        <div className={style.loginFormContayner}>
            <button  onClick={()=>dispatch(setIsMenuActiveAC())} className={style.button}>menu</button>
            <ReduxLoginForm onSubmit = {onSubmit}/>
        </div>
    );
};
export default LoginPage;