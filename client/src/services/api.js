import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProjects = () => api.get('/portfolio/projects/');
export const getSkills = () => api.get('/portfolio/skills/');
export const getCertifications = () => api.get('/portfolio/certifications/');
export const sendContact = (data) => api.post('/contact/', data);

export default api;
