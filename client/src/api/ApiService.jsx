import axios from 'axios';


const BaseUrl = 'https://16.16.24.199'

const ApiService = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
    },
});
//sign up
export const SignUp = async (name, email,username, password) => {
    try {
        const response = await ApiService.post('/user/signup/', {
            name,
            email,
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
