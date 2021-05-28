import React, { useContext, useState } from 'react'
import Loader from 'react-loader-spinner'
import logo from '../assets/img/logo.png'
import { AuthContext } from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';
// import custom hook
import {makePostRequest} from '../helper/makeRequest';

export default function Form({isLoginForm,  setIsLoginForm, setError, setSuccess}) {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const { setAuth, setToken } = useContext(AuthContext);
    const clearState = () => {
        setFormData({
            name: '',
            email: '',
            password: ''    
        })
        setLoading(false)
    }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = e => {
        setFormData(prevData => {
            return {...prevData, [e.target.name]: e.target.value}
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(isLoginForm){
            setLoading(true);
            const data = await makePostRequest('auth/signin', formData)
            console.log(data.data.auth);
            if(data.data.auth){
                setToken(data.data.token);
                setLoading(false);
                setIsLoginForm(true)
                setSuccess('Successfully logged in')
                localStorage.setItem('token', data.data.token);
                clearState();
                setAuth(data.data.user);
                history.push('/')
            }
            else{
                setError(data.data.message);
                setTimeout(() => {
                    setError('')
                }, 4000)
                setLoading(false)
            }
        }
        else{
            setLoading(true);
            const data = await makePostRequest('auth/signup', formData)
            if(data){
                setLoading(false);
                setIsLoginForm(true)
                setSuccess('Successfully Registered')
                setTimeout(() => {
                    setSuccess('')
                }, 4000)
                clearState();
            }
            else{
                setError('Oops! Something went wrong!');
                setTimeout(() => {
                    setError('')
                }, 4000)
                setLoading(false)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="title">
                <h3>{isLoginForm ? 'Login To' : 'Register To'}</h3>
                <img src={logo} alt=""/>
            </div>
            {!isLoginForm && (
                <div className="field">
                    <label htmlFor="name" >Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Eg. John Doe" />
                </div>
            )}
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Eg. John@Doe.com" />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="********" />
            </div>
            <div className="field">
                {isLoginForm ? (
                    <button className="btn-auth btn" disabled={loading}>{loading ? (
                        <Loader type="Oval" color="#fff" height={16} width={16} />
                    ) : ('Login') }</button>
                ) : (
                    <button className="btn-auth btn" disabled={loading}>{loading ? (
                        <Loader type="Oval" color="#fff" height={16} width={16} />
                    ) : ('Register') }</button>
                )}
            </div>
            <div className="field">
                {isLoginForm ? (
                    <small className="switch" onClick={e => {
                        setIsLoginForm(false)
                        clearState();
                    }}>Don't have an account? <span>Create One</span></small>
                ): (
                    <small className="switch" onClick={e => {
                        setIsLoginForm(true)
                        clearState();
                    }}>Already have an account? <span>Sign in</span></small>
                )}
            </div>
        </form>
    )
}
