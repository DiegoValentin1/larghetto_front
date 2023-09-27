import React from "react";
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

export const EditBridaForm = ({
  isOpen,
  cargarDatos,
  onClose,
  objeto,
}) => {
  const form = useFormik({
    initialValues: {
      specNo: "",
      grade:"",
      type:"",
      smys:"",
      status: true,
    },
    validationSchema: yup.object().shape({
      grade: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
      smys: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
    }),
    onSubmit: async (values) => {
      return Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
          try {
            console.log(values);
            const response = await AxiosClient({
              method: "PUT",
              url: "/brida/",
              data: JSON.stringify(values),
            });
            if (!response.error) {
              cargarDatos();
              Alert.fire({
                title: successTitle,
                text: succesMsj,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) handleClose();
              });
            }
            return response;
          } catch (error) {
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) handleClose();
            });
          }
        },
      });
    },
  })

  React.useMemo(() => {
    const { id, grade, smys } = objeto;
    form.values.id = id;
    form.values.grade = grade;
    form.values.smys = smys;
  }, [objeto]);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Material Brida Extremo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="grade">Grade</Form.Label>
            <Form.Control
              name="grade"
              value={form.values.grade}
              onChange={form.handleChange}
            />
            {form.errors.grade && (
              <span className="error-text">{form.errors.grade}</span>
            )}
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="smys">SMYS</Form.Label>
            <Form.Control
              name="smys"
              value={form.values.smys}
              onChange={form.handleChange}
            />
            {form.errors.smys && (
              <span className="error-text">{form.errors.smys}</span>
            )}
          </Form.Group>
          <FormGroup className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" />
                  &nbsp;Cancelar
                </Button>
                <Button variant="outline-sucess" type="submit">
                  <FeatherIcon icon="check" /> &nbsp;Actualizar
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
