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
    },
    async requestedmentorship(params = {}) {
        try {
            const response = await api.get("/mentor/sessions/?status=requested", { params })
            if (response.data) {
                console.log("retrieved requested mentorship session")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("couldn't retrieve requested mentorship session")
        }
    },
    async acceptedmentorship(params = {}) {
        try {
            const response = await api.get("/mentor/sessions/?status=accepted", { params })
            if (response.data) {
                console.log("retrieved accepted mentorship session")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("couldn't retrieve accepted mentorship session")
        }
    },
    async scheduledmentorship(params = {}) {
        try {
            const response = await api.get("/mentor/sessions/?status=scheduled", { params })
            if (response.data) {
                console.log("retrieved scheduled mentorship session")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("couldn't retrieve scheduled mentorship session")
        }
    },
    // async acceptOrrejectrequest(action){
    //     try {
    //         const response = await api.post("/mentor/sessions/accept-reject/",action)
    //         if(response.data){
    //             console.log('Action completed successfully',response.data)
    //             return { success: true, data: response.data }
    //         }
    //     } catch (error) {
    //         console.log("Couln't complete this action")
    //     }
    // },
    async acceptOrRejectRequest(sessionId, decision) {
        try {
            const payload = {
                session: sessionId, // session ID
                action: decision    // "Accept" or "Reject"
            };

            const response = await api.post("/mentor/sessions/accept-reject/", payload);

            if (response.status === 200 && response.data) {
                console.log("Action completed successfully", response.data);
                return { success: true, data: response.data };
            } else {
                console.error("Unexpected response:", response);
                return { success: false };
            }
        } catch (error) {
            console.error("Couldn't complete this action", error);
            return { success: false, error };
        }
    },
}