import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts'
import UploadPicture from './UploadPicture';

export const AddPictureModal = ({ isOpen, onClose, objeto }) => {
    const [maestros, setMaestros] = useState([]);

    const handleClose = () => {
        onClose();
    }
    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Subir Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UploadPicture id={objeto.user_id}/>
        </Modal.Body>
    </Modal>
};