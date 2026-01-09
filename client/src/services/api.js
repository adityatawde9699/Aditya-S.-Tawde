import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.PROD 
        ? 'https://aditya-s-tawde-backend.onrender.com/api' 
        : 'http://127.0.0.1:8000/api');
        
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProjects = () => api.get('/portfolio/projects/');
export const getSkills = () => api.get('/portfolio/skills/');
export const getCertifications = () => api.get('/portfolio/certifications/');
export const getEducation = () => api.get('/portfolio/education/');
export const sendContact = (data) => api.post('/contact/', data);

export default api;
