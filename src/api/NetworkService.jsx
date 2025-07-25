import api from "./ApiServiceThree"



export const NetworkService = {
    async recommendbylocation(params = {}) {
        try {
            const response = await api.get(`/connection/recommendation/`, { params: { criteria: "location", ...params } })
            if (response.data) {
                console.log("recomended connections by location fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("recomended connections by location not fetched")
        }
    },
    async recommendbyindustry(params = {}) {
        try {
            const response = await api.get(`/connection/recommendation/`, { params: { criteria: "industry", ...params } });
            if (response.data) {
                console.log("recomended connections by industry fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("recomended connections by industry not fetched")
        }
    },
    async recommendtofollow(params = {}) {
        try {
            const response = await api.get(`/follow/recommendation/`, { params });
            if (response.data) {
                console.log("recomended connections to follow fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("recomended connections to follow not fetched")
        }
    },
    async followerscount() {
        try {
            const response = await api.get(`/followers/count/`);
            console.log("followers count fetched", response.data);
            return response.data
        } catch (error) {
            console.log("followers count not fetched")
        }
    },
    async connectionscount() {
        try {
            const response = await api.get(`/connection/count/`);
            console.log("connections count fetched", response.data);
            return response.data
        } catch (error) {
            console.log("connections count not fetched")
        }
    },
    async createConnection(connectionData) {
        try {
            console.log("Api payload", connectionData);
            const response = await api.post("/connection/", connectionData);
            if (response.data) {
                console.log("Connection created:", response.data);
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Create Connection Error:", error.response || error.message);
            throw new Error(error.response?.data?.message || "Failed to create connection");
        }
    },
    async getPendingConnections() {
        try {
            const response = await api.get("/connection/pending/");
            console.log("Pending connections fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get Pending Connections Error:", error.response || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch pending connections");
        }
    },
    async updateConnectionStatus(connectionId, status) {
        try {
            const response = await api.post("/connection/status/", {
                connection_id: connectionId,
                status: status, // "Accept" or "Reject"
            });
            console.log("Connection status updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to update connection status:", error.response || error);
            throw new Error(
                error.response?.data?.message || "Could not update connection status"
            );
        }
    },
}