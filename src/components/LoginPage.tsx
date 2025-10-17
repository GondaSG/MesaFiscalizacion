import React, { useState } from 'react';
import { login as apiLogin } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(async() => {
      if (formData.user && formData.password) {
        const obj = await apiLogin(formData.user, formData.password);
        if (obj.isLogin) {
          login({ user: formData.user, role: 'ADMIN' });
        } else {
          setError(obj.mensaje);
        }
      } else {
        setError('Por favor, complete todos los campos');
      }
      setIsLoading(false);

    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-primary">
            <div className="text-center text-white">
              <h1 className="display-4 mb-4">
                <i className="bi bi-building"></i> SIGAFIP
              </h1>
              <p className="lead">Sistema de gestión administrativa de la fiscalización posterior</p>
              <p>Accede a tu panel de control para gestionar todos los aspectos de tu negocio</p>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
            <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="text-primary">Iniciar Sesión</h3>
                  <p className="text-muted">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="user" className="form-label text-dark">
                      <i className="bi bi-envelope me-2"></i>Usuario
                    </label>
                    <input
                      type="user"
                      className="form-control"
                      id="user"
                      name="user"
                      value={formData.user}
                      onChange={handleChange}
                      placeholder="JQUISPE"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-dark">
                      <i className="bi bi-lock me-2"></i>Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>{error}
                    </div>
                  )}

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label text-dark" htmlFor="remember">
                      Recordar sesión
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <a href="#" className="text-decoration-none text-primary">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
