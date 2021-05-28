import React, { useEffect, useState } from 'react'
import Feather from 'feather-icons-react';
import setExtensionImage from '../helper/setExtensionImage';
import { downloadFile } from '../helper/makeRequest';
var FileSaver = require('file-saver');

export default function File({file}) {
    const [ext,setExt] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setExt(setExtensionImage(file.extension));
    }, [file.extension])
    const handleDownload = async (id, e) => {
        setLoading(true)
        const {data} = await downloadFile(id);
        console.log(data);
        const { filename, contentType,  file } = data
        var link = document.createElement('a');
        link.href = `data:${contentType};base64,${file}`
        link.download = filename;
        link.click();
        setLoading(false)
    }
    return (
        <div className="file">
            <div className="left">
                <div className="icon">
                    <img src={ext} width="30" alt=""/>
                </div>
                <div className="filename">
                    {file.filename}
                </div>
            </div>
            <div className="right">
                {/* put an info icon from feather icons for info of the file in modal */}
                <small className="size">{Math.ceil(file.size/1000)} kb</small>
                <div onClick={e => handleDownload(file._id, e)} className={loading ? "download-btn option-btn downloading" : "download-btn option-btn"}><Feather icon={loading ? 'loader' : 'download'} size={18} color="#444" /></div>
                <div className="delete-btn option-btn"><Feather icon="trash" size={18} color="#444" /></div>
            </div>
        </div>
    )
}
