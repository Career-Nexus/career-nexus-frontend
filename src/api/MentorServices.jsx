import api from "./ApiServiceThree"

export const MentorServices={
    async recommendedmentors(params = {}){
        try {
            const response = await api.get("/mentor/recommendation/", {params})
            if (response.data) {
                console.log("recommended mentors fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log("could not fetch recommended mentors")
        }
    },
    async searchmentors(param = {}){
        try {
            const response = api.get("/mentor/search/?text=yemi&availability=weekends");
            if(response.data){
                console.log("Search mentor fetched", response.data)
                return {success: true, data: response.data}
            }         
        } catch (error) {
            console.log("error fetching the searched mentor")
        }
    }
}