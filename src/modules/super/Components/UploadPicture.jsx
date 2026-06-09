import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const UploadPicture = ({ id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Por favor selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('archivo', selectedFile);

        try {
            setLoading(true);
            // const response = await axios.post('http://localhost:3001/api/uploads/upload/' + id, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
            const session = JSON.parse(localStorage.getItem('user') || 'null');
            const token = session?.data?.token;
            const response = await axios.post(`${API_URL}/uploads/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            console.log(response.data);
            setLoading(false);
            alert('Archivo enviado correctamente');
        } catch (error) {
            setLoading(false);
            console.error('Error al enviar el archivo:', error);
            alert('Error al enviar el archivo');
        }
    };

    return (
        <div>
            <h2>Subir Archivo</h2>
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Selecciona una Imagen</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button
                    variant="primary"
                    disabled={isLoading}
                    type='submit'
                >
                    {isLoading ? 'Cargando...' : 'Guardar'}
                </Button>
            </form>
        </div>
    );
};

export default UploadPicture;
