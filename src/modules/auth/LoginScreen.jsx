import { useFormik } from "formik";
import React, { useContext, useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import * as yup from "yup";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { Card, Col, Row, Container, Figure, Form, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/login.css'

export const LoginScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleLogin = (credencialesValidas) => {
    // Realizar verificación de las credenciales aquí
    // Simulando un retraso de 2 segundos antes de mostrar el resultado
    setTimeout(() => {
      if (credencialesValidas) {
        setSuccess(true);
        setTimeout(() => {
          // Redirigir a otra parte
          navigation("/", { replace: true });
        }, 2000);
      } else {
        setFailure(true);
        setTimeout(() => {
          setExpanded(false);
          setFailure(false);
        }, 2000);
      }
    }, 1000);

    setExpanded(true);
  };
  const navigation = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      setExpanded(!expanded);
      console.log("Valores: ");
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "/auth",
          method: "POST",
          data: JSON.stringify(values),
        });
        console.log(response);
        if (!response.error) {
          const action = {
            type: "LOGIN",
            payload: {data:response},
          };
          dispatch(action);
          handleLogin(true);
        }
      } catch (err) {
        console.log(err);
          handleLogin(false);
      }
    },
  });
  useEffect(() => {
    document.title = "Larghetto";
  }, []);
  // if (user.isLogged) {
  //   return <Navigate to={"/"} />;
  // }
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#F3F4F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2563EB' }}>🎵</div>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#1F2937',
            margin: '0 0 0.5rem 0'
          }}>
            Bienvenido a Larghetto
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', margin: 0 }}>
            Sistema de Gestión Académica
          </p>
        </div>

        <Form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              id="email"
              autoComplete="off"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              style={{
                height: '50px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                fontSize: '15px',
                padding: '0 1rem'
              }}
            />
            {formik.errors.email && (
              <span style={{
                display: 'block',
                marginTop: '0.5rem',
                color: '#EF4444',
                fontSize: '0.875rem'
              }}>
                {formik.errors.email}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              id="password"
              autoComplete="off"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              style={{
                height: '50px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                fontSize: '15px',
                padding: '0 1rem'
              }}
            />
            {formik.errors.password && (
              <span style={{
                display: 'block',
                marginTop: '0.5rem',
                color: '#EF4444',
                fontSize: '0.875rem'
              }}>
                {formik.errors.password}
              </span>
            )}
          </Form.Group>

          <Button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || expanded}
            style={{
              width: '100%',
              height: '50px',
              borderRadius: '12px',
              background: '#2563EB',
              border: 'none',
              fontWeight: '600',
              fontSize: '15px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.4)';
              e.target.style.background = '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = '#2563EB';
            }}
          >
            {expanded ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              <>
                <FeatherIcon icon={'log-in'} size={18}/>
                INICIAR SESIÓN
              </>
            )}
          </Button>
        </Form>

        {/* Mensajes de éxito/fallo */}
        {success && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <div style={{ color: '#10B981', fontSize: '1rem', fontWeight: '600' }}>
              ✓ Inicio exitoso
            </div>
          </div>
        )}
        {failure && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <div style={{ color: '#EF4444', fontSize: '1rem', fontWeight: '600' }}>
              ✗ Credenciales inválidas
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
