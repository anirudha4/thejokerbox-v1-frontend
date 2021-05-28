import React, { useContext, useState } from 'react'
import Form from '../components/Form'
import loginImage from '../assets/img/login.jpg'
import { AuthContext } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
export default function AuthenticationPage() {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const {auth} = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    return (
        <>
        {!auth ? (
            <div className="authentication-page container">
                {error && ( <div className={error ? 'error show' : 'error'}>
                    <p className="error-message">{error}</p>
                </div> )}
                {success && ( <div className={success ? 'success show' : 'success'}>
                    <p className="error-message">{success}</p>
                </div> )}
                <div className="form-container">
                    <Form isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} setError={setError} setSuccess={setSuccess} />
                    <div className="img-right">
                        {loginImage ? <img src={loginImage} alt=""/> : 'loading' }
                    </div>
                </div>
            </div>            
        ) : (
            <Redirect to="/" />
        )}
        </>

    )
}
