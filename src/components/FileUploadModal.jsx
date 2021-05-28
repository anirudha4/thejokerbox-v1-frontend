import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import setExtensionImage from '../helper/setExtensionImage';
import {uploadFile} from '../helper/makeRequest';
import { FileContext } from '../contexts/FileContext';
import { ModalContext } from '../contexts/ModalContext';
import Loader from 'react-loader-spinner';
import Feather from 'feather-icons-react'
export default function FileUploadModal() {
    const {auth, logout} = useContext(AuthContext)
    const [filename, setFilename] = useState('')
    const {setFileUploadModalStatus} = useContext(ModalContext);
    const [loading, setLoading] = useState(false)
    const {setFiles} = useContext(FileContext);
    const [file, setFile] = useState(null)
    const [ext, setExt] = useState('')
    const [error, setError] = useState('')
    const handleFile = e => {
        setFile(e.target.files[0])
        console.log("ext " + e.target.files[0].type.split('/')[1]);
        
        setExt(setExtensionImage(e.target.files[0].type.split('/')[1]));
        console.log(ext);
        setFilename(e.target.files[0].name);
        console.log(e.target.files[0]);
    }
    const handleUpload = async e => {
        if(file){
            setLoading(true)
            const data = await uploadFile(file, auth.email);
    
            if(data.success) {
                setFiles(prevState => {
                    return [...prevState, data.file]
                })  
                setLoading(false);
                setFileUploadModalStatus(false)
            }
            else if(data.auth == false){
                logout();
            }
            else{
                setError("Could't upload your file at this moment. Please try Again");
            }
        }
        else{
            setError('Please select file to upload')
            setTimeout(() => {
                setError('');
            }, 4000)
        }
    }
    return (
        <div className="file-upload-modal-container">
            <div className="close" onClick={e => setFileUploadModalStatus(false)}><Feather icon="x" size="30" color="#333"/></div>
            <div className="modal">
                <div className="dragable-area">
                    <label htmlFor="inputfile" className="inputfile">
                        {filename ? (
                            <div className="file-display">
                                <img src={ext} width="60px" alt="" />
                                {filename}
                            </div>
                        ) : 'Click to choose file'}
                    </label>
                    <input type="file" id="inputfile" style={{display: 'none'}} onChange={handleFile} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" disabled={loading} onClick={handleUpload}>
                        {loading ? <Loader type="Oval" height={16} width={16} color="#fff" /> : 'Upload File'}
                    </button>
                </div>
            </div>
            {error && ( <p className="error show">{error}</p> )}
        </div>
    )
}
