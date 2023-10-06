import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, Modal, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  confirmMsj,
  confirmTitle,
  succesMsj,
  successTitle,
  errorMsj,
  errorTitle,
} from "../../../shared/plugins/alerts";

export const EditRecepcionistaForm = ({
  isOpen,
  cargarDatos,
  onClose,
  objeto,
  option
}) => {
  console.log(objeto)

  const form = useFormik({
    initialValues: {
      email: "",
      role: "ALUMNO",
      nombre: "",
      fechaNacimiento: "",

    },
    validationSchema:
      yup.object().shape({
        name: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
        fechaNacimiento: yup.string().required("Campo obligatorio"),
        domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        // clabe: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        // cuenta: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        // banco: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
      }),
    onSubmit: async (values) => {
      return Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "Aceptar",
        cancelButtonColor: '#DD6B55',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
          try {
            console.log(JSON.stringify({ ...values, role: "ALUMNO" }));
            const response = await AxiosClient({
              method: "PUT",
              url: "/personal/user",
              data: JSON.stringify({ ...values, role: "RECEPCION" }),
            });
            console.log(response);
            if (!response.error) {
              cargarDatos();
              Alert.fire({
                title: successTitle,
                text: succesMsj,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
              }).then((result) => {
                if (result.isConfirmed) handleClose();
              });
            }
            return response;
          } catch (error) {
            console.log(error);
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            }).then((result) => {
              if (result.isConfirmed) handleClose();
            });
          }
        }
      });
    }
  });

  React.useMemo(() => {
    const { id, name, email, fechaNacimiento, domicilio, municipio, telefono, contactoEmergencia} = objeto;

    form.values.id = id;
    form.values.name = name;
    form.values.email = email;
    form.values.fechaNacimiento = fechaNacimiento ? fechaNacimiento.substring(0, 10) : fechaNacimiento;
    form.values.domicilio = domicilio;
    form.values.municipio = municipio;
    form.values.telefono = telefono;
    form.values.contactoEmergencia = contactoEmergencia;
  }, [objeto]);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };
  return (
    <Modal
      backdrop='static'
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
      style={{ width: "90vw", display: "flex", alignContent: "center", justifyItems: "center", marginLeft: "5vw", padding: "0" }}
      dialogClassName="mi-modal-personalizado"
      id="modalAlumnoR"
    >
      <Modal.Header closeButton >
        <Modal.Title>Actualizar Recepcionista</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <div className="InputContainer4">
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='name'>Nombre</Form.Label>
              <Form.Control name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} />
              {
                form.errors.name && (<span className='error-text'>{form.errors.name}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='fechaNacimiento'>Fecha de Nacimiento</Form.Label>
              <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} />
              {
                form.errors.fechaNacimiento && (<span className='error-text'>{form.errors.fechaNacimiento}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control type='email' name='email' placeholder="correo@dominio.com" value={form.values.email} onChange={form.handleChange} />
              {
                form.errors.email && (<span className='error-text'>{form.errors.email}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='abbreviation'>Contraseña</Form.Label>
              <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} />
              {
                form.errors.password && (<span className='error-text'>{form.errors.password}</span>)
              }
            </Form.Group>
          </div>
          <div className="InputContainer4" style={{ width: "100%" }}>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='domicilio'>Domicilio</Form.Label>
              <Form.Control name='domicilio' placeholder="Calle #34" value={form.values.domicilio} onChange={form.handleChange} />
              {
                form.errors.domicilio && (<span className='error-text'>{form.errors.domicilio}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='municipio'>Municipio</Form.Label>
              <Form.Control name='municipio' placeholder="Temixco" value={form.values.municipio} onChange={form.handleChange} />
              {
                form.errors.municipio && (<span className='error-text'>{form.errors.municipio}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='telefono'>Telefono</Form.Label>
              <Form.Control type='number' min={0} name='telefono' placeholder="7771234567" value={form.values.telefono} onChange={form.handleChange} />
              {
                form.errors.telefono && (<span className='error-text'>{form.errors.telefono}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='contactoEmergencia'>Contacto de Emergencia</Form.Label>
              <Form.Control type='number' min={0} name='contactoEmergencia' placeholder="7777654321" value={form.values.contactoEmergencia} onChange={form.handleChange} />
              {
                form.errors.contactoEmergencia && (<span className='error-text'>{form.errors.contactoEmergencia}</span>)
              }
            </Form.Group>
          </div>
          {/* <div className="InputContainer3">
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='clabe'>Clabe</Form.Label>
                        <Form.Control name='clabe' placeholder="123456789012345678" value={form.values.clabe} onChange={form.handleChange} />
                        {
                            form.errors.clabe && (<span className='error-text'>{form.errors.clabe}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='cuenta'>Cuenta</Form.Label>
                        <Form.Control name='cuenta' placeholder="1234567890123456" value={form.values.cuenta} onChange={form.handleChange} />
                        {
                            form.errors.cuenta && (<span className='error-text'>{form.errors.cuenta}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='banco'>Banco</Form.Label>
                        <Form.Control name='banco' placeholder="BBVA" value={form.values.banco} onChange={form.handleChange} />
                        {
                            form.errors.banco && (<span className='error-text'>{form.errors.banco}</span>)
                        }
                    </Form.Group>
                </div> */}
          <FormGroup className='mb-3'>
            <Row style={{ padding: "10px" }}>
              <Col className='text-end'>
                <Button variant='outline-danger' className='me-2' onClick={handleClose}>
                  <FeatherIcon icon='x' />&nbsp;Cancelar
                </Button>
                <Button variant='outline-success' type='submit'>
                  <FeatherIcon icon='check'>&nbsp;Guardar</FeatherIcon>
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
