import api from "./ApiServiceThree";
import Cookies from "js-cookie"

export const CorporateServices = {
    // async getLinkedAccounts() {
    //     try {
    //         const response = await api.get(`/user/linked-accounts/`);
    //         if(response.data){
    //             console.log("Linked accounts fetched:", response.data);
    //             return {success: true, data: response.data};
    //         }
    //     } catch (error) {
    //         console.error('Error fetching linked accounts:', error);
    //         return {success: false, error: error.message};
    //     }
    // },
    async getLinkedAccounts() {
        try {
            const response = await api.get(`/user/linked-accounts/`);
            if (response.data) {
                const flattenedAccounts = response.data.map(item => item.account);
                console.log("Linked accounts fetched:", flattenedAccounts);
                return { success: true, data: flattenedAccounts };
            }
        } catch (error) {
            console.error('Error fetching linked accounts:', error);
            return { success: false, error: error.message };
        }
    },
    async switchAccount(accountId) {
        try {
            const response = await api.post(`/user/switch-account/`, { account: accountId });
            if (response.data) {
                Cookies.set('access_token', response.data.access);
                Cookies.set('refresh_token', response.data.refresh);

                api.interceptors.request.use((config) => {
                    const token = localStorage.getItem("access_token");
                    if (token) config.headers.Authorization = `Bearer ${token}`;
                    return config;
                });

                console.log("Switched account:", response.data);
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error('Error switching account:', error);
            return { success: false, error: error.message };
        }
    },
}