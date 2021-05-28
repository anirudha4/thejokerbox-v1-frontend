import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import FileUploadModal from '../components/FileUploadModal'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext';
import {ModalContext} from '../contexts/ModalContext';

export default function Layout({children}) {
    const {fileUploadModalStatus} = useContext(ModalContext)
    const {auth} = useContext(AuthContext)
    return (
        <>
            {auth ? (
                <div className="layout">
                    <Sidebar />
                        {fileUploadModalStatus && <FileUploadModal />}
                        {children}
                </div>
            ) : (
                <Redirect to="/auth" />
            )}
        </>
    )
}
