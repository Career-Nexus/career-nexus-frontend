import axios from "axios";

const BaseUrl = 'https://16.16.24.199'

const apiService = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
    },
});

export const registerUser = async(name, email, password)=>{
    try {
        const response = await apiService.post('user/signup/', {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}