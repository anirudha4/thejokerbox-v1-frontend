import React, { createContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { makeGetRequest } from '../helper/makeRequest';

export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const [auth, setAuth] = useState(null)
    const [token, setToken] = useState(null);
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    setTimeout(() => {
        setIsAppLoaded(true)
    }, 2000)
    const getUserByToken = async () => {
        const {user} = await makeGetRequest('auth/getuserbytoken', localStorage.getItem('token'))
        setAuth(user);
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            const user = getUserByToken()
        }
        else{
            setAuth(null);
        }
    }, [])
    const logout = () => {
        setAuth(null)
        localStorage.removeItem('token')
    }
    if(!isAppLoaded){
        if(!auth){
            return (
                <div className="loader-container">
                    <Loader type="TailSpin" color="#2400FF" height={70} width={70} />
                    <p>Loading . . .  </p>
                </div>
            )
        }
    }
    return (
        <AuthContext.Provider value={{setAuth, auth, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
