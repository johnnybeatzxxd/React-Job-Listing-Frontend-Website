import axios from "axios"


const backend_url = import.meta.env.VITE_BACKEND_URL



export function signup(formData) {
    let data = JSON.stringify(formData);
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${backend_url}/api/auth/signup`,
        data: data
    };
    
    return axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' }; // Return error message
        });
}

export function signin(formData) {
    let data = JSON.stringify(formData);
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${backend_url}/api/auth/signin`,
        data: data
    };
    
    return axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            console.log(error.response.data.error);
            return { success: false, message: error.response.data.error || 'An error occurred' }; // Return error message
        });
}
