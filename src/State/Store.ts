import {v1} from "uuid";

// Typing for basic  Data__________________>
//-------< low level
export type DialogsItem = {
    user:string
    target:string
    message:string
};
export type friendsType = {
    level:number
    urlImage:string

}

export type PostsItem  = {
    id:string
    avatarURL:string
    time:string
    post:string
};
//____________________<
//ActionCreator  returnable Types ______________<
export type UpdatePostCreatorType = {
    type:"UPDATE_NEW_POST_TEXT"
    newText:string
}
export type AddPostActionType = {
    type:"ADD_POST"
}

//____________________________>
export type DispatchACtype = UpdatePostCreatorType |
                                AddPostActionType

//------> High level
export type StoreType ={
    State: StateType
    addPosts:(post:string)=>void
    subscribe:(subscriber:(store:StoreType)=>void)=>void
    _callSubscriber:(store:StoreType)=>void
    changePost:(instantaneousValue:string)=>void
    dispatch:(action:DispatchACtype)=>void
};

export type StateType  = {
    PostValue:string
    dialogs:Array<DialogsItem>
    posts:Array<PostsItem>
    friends:Array<friendsType>
};
//____________________________________________>>

export const store:StoreType = {

    State:{
        PostValue:"",

        dialogs:[
            {user:"вася",target:"1",message:"lkaklsma;m;ma"},
            {user:"Aася",target:"2",message:"kzzzzma;lkaklsma;m;ma"},
            {user:"Крася",target:"3",message:"kzzzzma;a"},
            {user:"Мася",target:"4",message:"kzzzzma;lkaklsma;m;ma"},
            {user:"Сяся",target:"5",message:"kzzzzma;lkaklsma;m;ma"},
        ],
        posts:[
            {
                id:v1(),
                avatarURL:"https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png",
                time:"11:20",
                post:"Hi may name Alexey"
            },
            {
                id:v1(),
                avatarURL:"https://russia-dropshipping.ru/800/600/https/proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-22.jpg",
                time:"1:20",
                post:"Hi, may name Alexey"
            },

            {
                id:v1(),
                avatarURL:"https://zoomwiki.ru/wp-content/uploads/2020/12/avatarki-dlya-zuma.jpg",
                time:"16:20",
                post:"Hi may name Alexey"
            },

            {id:v1(),
                avatarURL:"https://www.meme-arsenal.com/memes/9bb114f1b7db21ba4c66d77ab08f6cf1.jpg",
                time:"17:20",
                post:"Hi may name Alexey"
            },
        ],
        friends:[
            {
                level:3,
                urlImage:"https://www.meme-arsenal.com/memes/9bb114f1b7db21ba4c66d77ab08f6cf1.jpg"
            },
            {
                level:7,
                urlImage:"https://zoomwiki.ru/wp-content/uploads/2020/12/avatarki-dlya-zuma.jpg"
            },
            {
                level:8,
                urlImage:"https://www.meme-arsenal.com/memes/9bb114f1b7db21ba4c66d77ab08f6cf1.jpg"
            },
            {
                level:3,
                urlImage:"https://www.meme-arsenal.com/memes/9bb114f1b7db21ba4c66d77ab08f6cf1.jpg"
            },
        ],
    },

    _callSubscriber(store:StoreType){
        },
    subscribe(subscriber){
       this._callSubscriber = subscriber;
    },
    addPosts:function(post){
        this.State.posts  = [
        {
            id:v1(),
            avatarURL:urlRandomiser(this.State.posts),
            time:"16:20",
            post:post
        },...this.State.posts];

        this._callSubscriber(store);
    },
    changePost(instantaneousValue:string){
     this.State.PostValue = instantaneousValue
    },

    dispatch(action){//еще не дотнул )) !!!!!!!!!
        switch (action.type){
            case "ADD_POST":
                this.addPosts("dddd");
                break;
            case "UPDATE_NEW_POST_TEXT":
                console.log("ddd")
                debugger
                this.addPosts(action.newText);
                this._callSubscriber(store);
                break

        }
    }
}

export const addPostActionCreator = ():AddPostActionType=>({type:"ADD_POST"})
export const updateNewPostActionCreator  = (instantaneousValue:string):UpdatePostCreatorType=>(
    {type:"UPDATE_NEW_POST_TEXT",
    newText:instantaneousValue})


export const urlRandomiser = (urls:Array<PostsItem>):string=>{
     const random:number = Math.round((urls.length-1)*Math.random())
     return urls[random].avatarURL
};




//___________________________________________________________________________________>

