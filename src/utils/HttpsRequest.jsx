import axios from 'axios';

const httpsRequests = axios.create({
    baseURL: import.meta.env.VITE_HTTPS_BACKEND,
    withCredentials: true, 
});

httpsRequests.interceptors.request.use(
    (config) => {
       
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        throw new Error(error);
    },
);


export const GET = async ({ path, config }) => {
    const result = await httpsRequests.get(path, config);
    return result;
};
export const POST = async ({ path, config }) => {
    const result = await httpsRequests.post(path, config);
    return result;
};
export const PUT = async ({ path, config }) => {
    const result = await httpsRequests.put(path, config);
    return result;
};
export const DELETE = async ({ path, config }) => {
    const result = await httpsRequests.delete(path, config);
    return result;
};
