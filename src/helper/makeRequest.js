import axios from "axios"

const BASE_URL = 'http://localhost:8000/api/'

export const makePostRequest = async (prefix, data) => {
    try{
        const result = await axios.post(BASE_URL + prefix, data)
        return result;
    }
    catch(err){
        console.log(err);
        return false;
    }
}


export const makeGetRequest = async (prefix, params = null) => {
    try{
        const result = await axios.get(BASE_URL + prefix, {
            headers: {
                'Authorization': `Basic ${params}` 
            }
        })
        return result.data;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

export const uploadFile = async (file, email) =>  {
    console.log(file, email);
    const formData = new FormData()
    formData.append('file', file);
    formData.append('email', email)
    const data = await axios.post(BASE_URL + 'files/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "authorization": "BEARER " + localStorage.getItem('token') || ''
          },
    });
    return data.data;
}

export const downloadFile = async id => {
    const data = await axios.get(BASE_URL + 'files/download/' + id)
    return data;
}