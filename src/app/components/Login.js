import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-card">
                <h2>CompuTechStoreSV - Login</h2>
                
                <div className="input-group">
                    <label>Usuario</label>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu usuario"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>

                <button type="submit" className="btn-login">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;