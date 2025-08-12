import api from "./ApiServiceThree"

export const MentorServices = {
    async recommendedmentors(params = {}) {
        try {
            const response = await api.get("/mentor/recommendation/", { params })
            if (response.data) {
                console.log("recommended mentors fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("could not fetch recommended mentors")
        }
    },
    async searchmentors(params = {}) {
        try {
            const response = await api.get(`/mentor/search/`, { params });
            if (response.data) {
                console.log("Search mentor fetched", response.data)
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Couldn't fetch the searched mentor");
            return { success: false, data: [] };
        }
    },
    //search all user in the platform
    async searchuser(params = {}) {
        try {
            const response = await api.get("/user/search/", { params });
            if (response.data) {
                console.log("Search user fetched", response.data);
                return { success: true, data: response.data.results || [] };
            }
        } catch (error) {
            console.log("Couldn't fetch the searched user", error);
            return { success: false, data: [] };
        }
    },
    async bookmentorsession(mentor) {
        try {
            console.log("Api payload", mentor)
            const response = await api.post('/mentor/sessions/book/', mentor);
            if (response.data) {
                console.log("session with mentor booked", response.data)
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("couldn't book session with mentor")
        }
    }
}