import React, { createContext, useContext, useEffect, useState } from 'react'
import { makeGetRequest } from '../helper/makeRequest';
import { AuthContext } from './AuthContext';

export const FileContext = createContext()
export default function FileContextProvider({children}) {
    const {auth, logout} = useContext(AuthContext)
    const [files, setFiles] = useState([])
    const fetchFiles = async () => {
        if(auth){
            const data = await makeGetRequest('files/' + auth.email)
            if(data.auth == false) {
                logout();
            }
            else{
                setFiles(data);
            }
        }
    }
    useEffect(() => {
        fetchFiles()
    }, [])
    return (
        <FileContext.Provider value={{files, setFiles}}>
            {children}
        </FileContext.Provider>
    )
}
