import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import File from '../components/File';
import Loader from 'react-loader-spinner'
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext'
import { FileContext } from '../contexts/FileContext';
import Empty from '../components/Empty'

export default function Homepage() {
    const {auth} = useContext(AuthContext);
    const {files} = useContext(FileContext);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(files.length === 0){
            setEmpty(true);
        }
        else{
            setLoading(false)
        }
    }, [files])
    return (
        <>
        {auth ? (
            <div className="homepage">
                <Header />
                <div className="file-section">
                    <div className="title">
                        <div className="line"></div>
                        <p>Your Files</p>
                        <div className="line"></div>
                    </div>
                    <div className="file-grid">
                        {!loading ? (
                            <>
                                {files.map(file => (
                                    <File key={file._id} file={file} />
                                ))}
                            </>
                        ) : (
                            <div className="loading">
                                {empty ? (
                                    <Empty />
                                )
                                    : (
                                        <Loader type="Oval" color="#000" height={40} width={40} />
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <Redirect to="/auth" />
        )}
        </>
    )
}

