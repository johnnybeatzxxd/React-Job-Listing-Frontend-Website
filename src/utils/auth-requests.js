import axios from "axios";

axios.defaults.withCredentials = true;

const backend_url = import.meta.env.VITE_BACKEND_URL;





function createRequestConfig(url, data, method = 'post') {
    const csrftoken = localStorage.getItem('csrfToken');

    return {
        method: method,
        maxBodyLength: Infinity,
        url: url,
        ...(data && { data: data }),
        headers: {
            'Content-Type': 'application/json',
            ...(csrftoken && { 'X-CSRFToken': csrftoken }),
        },
        withCredentials: true,
    };
}



export function signup(formData) {
    const config = createRequestConfig(`${backend_url}/api/auth/signup`, JSON.stringify(formData));


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
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}

export function signin(formData) {
   
    const config = createRequestConfig(`${backend_url}/api/auth/signin`, JSON.stringify(formData));
   
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
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}

export function create_profile(formData) {

    const config = createRequestConfig(`${backend_url}/api/auth/set_profile`,JSON.stringify(formData));
    return axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}

export function get_profile() {

    const config = createRequestConfig(`${backend_url}/api/auth/get_profile`,null,'get');
    return axios.request(config)
        .then((response) => {
            return { success: true, message: response.data.profile };
        })
        .catch((error) => {
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}

export function logout() {
    const config = createRequestConfig(`${backend_url}/api/auth/logout`, null, 'get');
    return axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' };
        });
}