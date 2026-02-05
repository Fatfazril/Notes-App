import { api } from "./api";

//Register User
export const Register = () =>{
    return api.post("/register")
}

//Login User
export const Login = () => {
    return api.post("/login")
}

//Logout User
export const LogOut = () => {
    return api.post("/logout")
}
