import React from 'react';
import style from './login.module.css';
import {EditableSpan} from "../UIcomponets/editinebalSpan/EditableSpan";
import {Field, InjectedFormProps,reduxForm,WrappedFieldProps} from "redux-form";
import {maxLength, minLength, notSpaces, required} from "../../utils/validators";
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {useDispatch} from "react-redux";
import {loginTC} from "../../ActionCreators/authUserAC";
import {useAppDispatch} from "../../State/reduxStore";

type FormDataType = {
    email?: string;
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
    const dispatch = useAppDispatch();
    const onSubmit = (formData:FormDataType)=>{
        if(!maxLength(formData.email) && !required(formData.email) && !notSpaces(formData.email)) {
            if(!required(formData.password) && !minLength(formData.password) && !notSpaces(formData.password)){
                if(formData.password && formData.email) {
                    loginTC(formData.password,formData.email,formData.rememberMe?formData.rememberMe:false)
                }
            } else {alert("password is not corect")}
        }else{
            alert("login is not corect")
        }
    }
    return (
        <div className={style.loginFormContayner}>
            <button onClick={()=>dispatch(sestIsMenuActiveAC())} className={style.button}>menu</button>
            <ReduxLoginForm onSubmit = {onSubmit}/>
        </div>
    );
};
export default LoginPage;