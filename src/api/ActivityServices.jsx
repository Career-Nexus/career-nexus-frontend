import api from "./ApiServiceThree";

export const ActivityService={
    //library
    async createLibrary(create){
        try {
            console.log("Api payload",create)
            const response = await api.post("/info/library/",create)
            if (response.data) {
                console.log("Library created", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not create library")
        }
    },
    async getLibrary(params={}){
        try {
            const response = await api.get("/info/library/",{params})
            if (response.data) {
                console.log("Library data fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not fetch library")
        }
    },
    async deleteLibrary(del){
        try {
            console.log("Api payload",del)
            const response = await api.delete(`/info/library/?content_id=${del}`)
            if (response.data) {
                console.log("Library data deleted", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("Could not delete library")
        }
    },
}