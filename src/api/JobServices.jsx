import api from './ApiServiceThree'

export const JobServices = {
    // create job
    // get jobs
    async GetUsersJobs(params = {}) {
        try {
            const response = await api.get('/job/recommend/', { params });
            console.log(response.data);
            if (response.data) {
                console.log("recomended jobs fetched", response.data);
                return { success: true, data: response.data }
            }
        } catch (error) {
            console.log(error);
        }
    },
    // update job preferences
    async UpdateJobPreferences(preference) {
        try {
            const response = await api.put('/job/preference/', preference)
            console.log('update job preferences', response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get job preferences
    async GetPreferedJob() {
        try {
            const response = await api.get('/job/preference/');
            console.log("get prefered jobs", response.data)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    async SaveJob(save){
        console.log("Api Payload",save)
        try {
            const response = await api.post('not set yet',save)
        } catch (error) {
            console.log("Couldn't save this job", error)
        }
    }
}