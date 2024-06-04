import { redirect } from "react-router-dom"

export function isloading (){
    let token = localStorage.getItem ('token')
    if(!token){
        return redirect('/login')
    }
    else{
        return null;
    }
}