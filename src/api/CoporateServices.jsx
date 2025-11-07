import api from "./ApiServiceThree";
import Cookies from "js-cookie"

function handleApiError(error, defaultMessage = "An unexpected error occurred") {
  if (error.response) {
    const message =
      error.response.data?.detail ||
      error.response.data?.message ||
      error.response.data?.error ||
      defaultMessage;
    throw new Error(message);
  } else if (error.request) {
    throw new Error("No response from server. Please check your internet connection.");
  } else {
    throw new Error(defaultMessage);
  }
}

export const CorporateServices = {
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
    async createCorporateProfile(data) {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    formData.append(key, value);
                }
            });

            const response = await api.post("/user/corporate/signup/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: handleApiError(error, "Failed to create corporate profile") };
        }
    },

    async getChoiceFieldData(fieldName = null) {
        try {
            const endpoint = fieldName
            ? `/info/choice-data/?field_name=${fieldName}`
            : "/info/choice-data/";

            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            return { success: false, error: handleApiError(error, "Failed to fetch choice field data") };
        }
    },
}