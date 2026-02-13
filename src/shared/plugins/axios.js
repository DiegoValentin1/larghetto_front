import instance from 'axios';

// Configuración de la URL base desde variables de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const AxiosClient = instance.create({
    baseURL: API_URL,
});

const requestHandler = (request) => {
    request.headers['Accept'] = "application/json";
    request.headers['Content-type']='application/json';
    const session = JSON.parse(localStorage.getItem('user') || null);
    console.log(request);
    const temp = JSON.parse(request.data || null);
    request.data = {...temp, empleado:session?.data ? session.data.name : "N/A"};
    if(session?.isLogged && session?.token) {
        request.headers["Authorization"] = `Bearer ${session.token}`;
    }
    return request;
};

const errorResponseHandler = (error) => {
    return Promise.reject(error);
};
const successResponseHandler = (response) => Promise.resolve(response.data);


AxiosClient.interceptors.request.use(
(request)=>requestHandler(request),
    (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
    (response) => successResponseHandler(response),
    (error)=> errorResponseHandler(error)
);
export default AxiosClient;