import React from 'react'
import axios from 'axios';

const BaseUrl = 'https://careernexus.pythonanywhere.com/';

const apiService = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
    },
});

export const JoinWaitList = async(name,email,industry)=>{
    try {
        const response = await apiService.post('user/join/', {
            name,
            email,
            industry
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const Subscribe = async(email)=>{
    try {
        const response = await apiService.post('user/subscribe/', {
            email
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}