import { useLocation, Navigate } from "react-router-dom"
import { Cookies } from 'react-cookie'

const cookies = new Cookies();

export const setToken = (value, opt) => {

    cookies.set("access-token", value, { ...opt });
}

export const getToken = () => {

    return cookies.get("access-token");
}

export function removeToken(){

    cookies.remove("access-token");
    window.location.href = "/";
}
