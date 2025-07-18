import api from "./ApiServiceThree"



export const NetworkService = {
    async recommendbylocation(params = {}) {
        try {
            const response = await api.get(`/connection/recommendation/`, { params: {criteria: "location", ...params} })
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
            // const response = await api.get(`/connection/recommendation/?criteria=${industry}`,{params})
            const response = await api.get(`/connection/recommendation/`,{ params: {criteria: "industry", ...params} });
            if (response.data) {
                console.log("recomended connections by industry fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("recomended connections by industry not fetched")
        }
    },
}