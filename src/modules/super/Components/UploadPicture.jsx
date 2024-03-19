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
            const response = await axios.post('http://104.237.128.187:3001/api/uploads/upload/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
