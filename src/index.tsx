import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./State/reduxStore"
import {Provider} from "react-redux";



// const RenderTree  = (store:StoreType):void=>{
//     ReactDOM.render(
//
//             <App
//                 data = {store.State}
//                 addPost = {store.addPosts.bind(store)}
//                 changePost = {store.changePost}
//                 dispatch = {store.dispatch.bind(store)}
//             />,
//         document.getElementById('root')
//     );
// }
// store.subscribe(RenderTree); // привязали как подпищик на изменение стейта))
//
// RenderTree(store);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,document.getElementById('root')

)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
