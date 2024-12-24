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

export function overview() {
    const config = createRequestConfig(`${backend_url}/api/users/dashboard/overview`,null,'get');

    return axios.request(config)
        .then((response) => {
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error);
            return { success: false, message: error.response.data.error || 'An error occurred',user: error.response.data.user };
        });
}


export function appliedJobs() {
    const config = createRequestConfig(`${backend_url}/api/users/dashboard/applied_jobs`,null,'get');

    return axios.request(config)
        .then((response) => {
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error);
            return { success: false, message: error.response.data.error || 'An error occurred',user: error.response.data.user };
        });
}

export function favoriteJobs() {
    const config = createRequestConfig(`${backend_url}/api/users/dashboard/favorite_jobs`,null,'get');

    return axios.request(config)
        .then((response) => {
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error);
            return { success: false, message: error.response.data.error || 'An error occurred',user: error.response.data.user };
        });
}
