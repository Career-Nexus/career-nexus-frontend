import api from './ApiServiceThree'

export const JobServices={
// create job
// get jobs
async GetUsersJobs(){
    try {
        const response = await api.get('/job/');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
},
// update job preferences
async UpdateJobPreferences(preference){
    try {
        const response = await api.put('/job/preference/',preference)
        console.log('update job preferences', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
},
// get job preferences
    async GetPreferedJob(){
        try {
            const response = await api.get('/job/recommend/');
            console.log("get prefered jobs", response.data)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}