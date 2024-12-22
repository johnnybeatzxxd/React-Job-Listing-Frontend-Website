import axios from "axios";

axios.defaults.withCredentials = true;

const backend_url = import.meta.env.VITE_BACKEND_URL;


function createRequestConfig(url, data, method = 'post') {
    const csrftoken = localStorage.getItem('csrfToken');
    const isFormData = data instanceof FormData;

    return {
        method: method,
        maxBodyLength: Infinity,
        url: url,
        ...(data && { data: data }),
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...(csrftoken && { 'X-CSRFToken': csrftoken }),
        },
        withCredentials: true,
    };
}



export function postJob(formData) {
    const config = createRequestConfig(`${backend_url}/api/jobs/post`, JSON.stringify(formData));


    return axios.request(config)
        .then((response) => {
      
            const csrfToken = response.headers['x-csrftoken'];
            if (csrfToken) {
                localStorage.setItem('csrfToken', csrfToken);
            }
            console.log(JSON.stringify(response.data));
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}

export const fetchJobs = async (requestData) => {
    const config = createRequestConfig(`${backend_url}/api/jobs/search`, JSON.stringify(requestData));

    try {
        const response = await axios.request(config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchJobs:', error);
        return { success: false, message: error.response.data.error || 'An error occurred' };
    }
};

export const toggleJobFavorite = async (jobId) => {
    const config = createRequestConfig(`${backend_url}/api/jobs/save`, JSON.stringify({ jobId }));
    
    try {
        const response = await axios.request(config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error toggling job favorite:', error);
        return { success: false, message: error.response?.data?.error || 'An error occurred' };
    }
};

export const getJob = async (requestData) => {
    const config = createRequestConfig(`${backend_url}/api/jobs/get`, JSON.stringify(requestData));

    try {
        const response = await axios.request(config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchJobs:', error);
        return { success: false, message: error.response.data.error || 'An error occurred' };
    }
};