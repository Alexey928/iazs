import React, {KeyboardEvent,ChangeEvent, useState} from 'react';
import style from "./editinebalSpan.module.css"

type EditableSpanPropsType = {
    mutable:boolean
    title: string
    type:"password"|"text"
    handler?:(value:string)=>void
    placeholder?:string
}
export function RegularEditableSpan(props: EditableSpanPropsType){
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>("");
    let [visible, setVisible] = useState<boolean>(false);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.handler && title && props.handler(title)

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const hiddenPassword = (password:string):string=>{
        return visible ? password : password.split("").map(()=>"*").join("");
    }

    return editMode ?
        <input className={style.input}
            type={props.type}
                    placeholder={props.placeholder?props.placeholder:""}
                    value={title}
                    onChange={changeTitle}
                    autoFocus
                    onBlur={activateViewMode}
                    onKeyDown={(e:KeyboardEvent<HTMLInputElement>)=>e.key==="Enter"&&activateViewMode()}
        />:
        <span className={style.spanContainer}>
            <span className={style.span}
                onClick={activateEditMode}>
                {
                    title&&props.type==="password"?
                    hiddenPassword(title):
                    title && props.mutable?title:
                    props.title
                }
            </span>{props.type==="password" && title &&
            <span className={style.triger}
                onClick={()=>setVisible(!visible)}
                style={{marginLeft:8,backgroundColor:"blue"}}>
                {visible?"of":"on"}
            </span>}
        </span>

}
