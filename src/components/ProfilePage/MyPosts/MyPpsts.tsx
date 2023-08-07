import React from 'react';
import Post from "./Posts/Post";
import AddItemForm from "../../UIcomponets/AddItemForm/AddItemForm";
import {PostsItem} from "../../../State/Store";
import style from "./myPosts.module.css"
type MyposPropsType = {
    posts:Array<PostsItem>
    addPost:(newPost:string)=>void
    removePost:(postID:string)=>void
}


const MyPpsts = (props: MyposPropsType) => {

    return (
        <div>
            <div style={{paddingTop:80}}>
            </div>
            <AddItemForm addItem={props.addPost}/>
            <div className={style.postsContainer}>
                {props.posts.map((el)=><Post removePost={()=>props.removePost(el.id)} key={el.id} post={el}/>)}
            </div>
        </div>
    );
};

export default MyPpsts;