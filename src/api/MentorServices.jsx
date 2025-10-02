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
    async completedmentorship(params = {}) {
        try {
            const response = await api.get("/mentor/sessions/?status=completed", { params })
            if (response.data) {
                console.log("retrieved completed mentorship session")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("couldn't retrieve completed mentorship session")
        }
    },
    async markascompleted(completed) {
        console.log("API response", completed);
        try {
            const response = await api.post("/mentor/annotate/", completed);
            if (response.data) {
                console.log("Session marked as completed");
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.log("Couldn't mark session as completed", error);
            return { success: false, error };
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
    async SaveMentor(save) {
        try {
            console.log("Api payload", save)
            const response = await api.post("/mentor/save/", save)
            if (response.data) {
                console.log("retrieved scheduled mentorship session")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not save this mentor")
        }
    },
    async getSavedMentors(params = {}) {
        try {
            const response = await api.get("/mentor/save/", { params })
            if (response.data) {
                console.log("retrieve saved mentors")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not retrieve saved mentors")
        }

    },
    async removeSavedMentor(id) {
        try {
            const response = await api.delete(`/mentor/save/?mentor=${id}`)
            if (response.data) {
                console.log("Saved mentors retrieved")
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not remove saved mentor")
        }
    },
    // payment with stripe
    async initiatesessionpaymentwithstripe(sessionId) {
        try {
            const response = await api.post("/payments/stripe/initiate/", { session: sessionId });
            if (response.data) {
                console.log("Payment initiated successfully");
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Could not initiate payment", error);
            return { success: false, error };
        }
    },
    // payment with flutterwave
    async initiatesessionpaymentwithflutterwave(sessionId) {
        try {
            const response = await api.post("/payments/flutterwave/initiate/", { session: sessionId });

            if (response.data) {
                console.log("Payment initiated successfully", response.data);

                // Extract the correct field
                const paymentLink = response.data["payment link"];

                return { success: true, data: { url: paymentLink } };
            }
        } catch (error) {
            console.error("Could not initiate payment", error);
            return { success: false, error };
        }
    },
    //join mentorship session
    async joinmentorshipsession(sessionId) {
        try {
            const response = await api.get(`/mentor/session/join/?session=${sessionId}`);
            if (response.data) {
                console.log("Joined mentorship session successfully");
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Could not join mentorship session", error);
            return { success: false, error };
        }
    }
}