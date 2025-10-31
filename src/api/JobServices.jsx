import api from './ApiServiceThree'

export const JobServices = {
    // create job
    async CreateJob(jobData) {
        try {
            const response = await api.post('/job/', jobData);
            console.log('Job created successfully', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.log("Couldn't create job", error);
            return { success: false, error };
        }
    },
    // get jobs
    async GetJobs(params = {}) {
        try {
            const response = await api.get('/job/', { params });
            console.log(response.data);
            return { success: true, data: response.data.results };
        } catch (error) {
            console.log(error);
            return { success: false, error };
        }
    },
    //update job status
    async UpdateJobStatus(jobId, status) {
        try {
            const payload = { job: jobId, status }; 
            const response = await api.put(`/job/status/update/`, payload);
            console.log('Job status updated successfully', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.log("Couldn't update job status", error);
            return { success: false, error };
        }
    },

    // get user recommended jobs
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
    async SaveJob(save) {
        console.log("Api Payload", save)
        try {
            const response = await api.post('not set yet', save)
        } catch (error) {
            console.log("Couldn't save this job", error)
        }
    }
}