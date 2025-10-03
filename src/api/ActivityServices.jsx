import api from "./ApiServiceThree";

export const ActivityService = {
    //library
    async createLibrary(create) {
        try {
            console.log("Api payload", create)
            const response = await api.post("/info/library/", create)
            if (response.data) {
                console.log("Library created", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not create library")
        }
    },
    async getLibrary(params = {}) {
        try {
            const response = await api.get("/info/library/", { params })
            if (response.data) {
                console.log("Library data fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch library")
        }
    },
    async deleteLibrary(del) {
        try {
            console.log("Api payload", del)
            const response = await api.delete(`/info/library/?content_id=${del}`)
            if (response.data) {
                console.log("Library data deleted", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not delete library")
        }
    },
    //newsletter
    async createNewsletter(create) {
        try {
            console.log("Api payload", create)
            const response = await api.post("/newsletter/create/", create)
            if (response.data) {
                console.log("Newsletter created", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not create newsletter")
        }
    },
    async getNewsletter(params = {}) {
        try {
            const response = await api.get("/newsletter/", { params })
            if (response.data) {
                console.log("Newsletter data fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch newsletter")
        }
    },
    async subscribeNewsletter(email) {
        try {
            console.log("Api payload", email)
            const response = await api.post(`/newsletter/subscribe/`, { email })
            if (response.data) {
                console.log("Newsletter subscription successful", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not delete newsletter")
        }
    },
    async unsubscribeNewsletter(email) {
        try {
            console.log("Api payload", email)
            const response = await api.post(`/newsletter/unsubscribe/`, { email })
            if (response.data) {
                console.log("Newsletter unsubscription successful", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not unsubscribe from newsletter")
        }
    },
    async userSettings() {
        try {
            const response = await api.get("/user/settings/")
            if (response.data) {
                console.log("User settings fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch user settings")
        }
    },
    async updateUserSettings(updatedSettings) {
        try {
            const response = await api.put("/user/settings/", updatedSettings);
            if (response.data) {
                console.log("User settings updated", response.data);
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.log("Could not update user settings");
        }
    },

    async UserCreateDispute(create) {
        try {
            console.log("Api payload", create);
            const response = await api.post("/user/disputes/", create);

            if (response.status === 201) {
                console.log("Dispute created", response.data);
                return { success: true, data: response.data };
            }
            return { success: false };
        } catch (error) {
            console.error("Could not create dispute", error);
            return { success: false, error };
        }
    },
    async UserGetDispute(params = {}) {
        try {
            const response = await api.get("/user/disputes/", { params })
            if (response.data) {
                console.log("Dispute data fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch dispute")
        }
    },
    async GetVaultData(params = {}) {
        try {
            const response = await api.get("/mentor/vault/", { params })
            if (response.data) {
                console.log("Vault data fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch vault data")
        }
    },
    async AdminGetDispute() {
        try {
            const res = await api.get("/user/admin/disputes/" )
            return res.data;
        } catch (error) {
            console.error("Disputes unavailable")
        }
    }
}