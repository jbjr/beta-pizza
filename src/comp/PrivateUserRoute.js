import * as Realm from "realm-web";
import {Navigate, Outlet, useNavigate, useParams} from "react-router-dom";
import * as React from "react";

/*const useAuth = () => {
    const app = Realm.App.getApp('application-0-ctrvo');
    const curUser = app.currentUser;
    return curUser;
}*/
export default function PrivateUserRoute(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const navigate = useNavigate();

    //const user = useAuth();
    const {id} = useParams();
    let isValid;
    if (user === null){
        navigate('/blank')
    }
    console.log(user.id);
    console.log(id);
    if(user.id === id){
        isValid = true;
    }

    return(
            isValid ? <Outlet /> : <Navigate to={'/'}/>
    )
}