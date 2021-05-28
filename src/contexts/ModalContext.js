import React, { createContext, useState } from 'react'

export const ModalContext = createContext()

export default function ModalContextProvider({children}) {
    const [fileUploadModalStatus, setFileUploadModalStatus] = useState(false)
    return (
        <ModalContext.Provider value={{fileUploadModalStatus, setFileUploadModalStatus}}>
            {children}
        </ModalContext.Provider>
    )
}
