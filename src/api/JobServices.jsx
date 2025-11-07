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
    //apply for job
    async ApplyForJob(applicationData) {
        try {
            const response = await api.post('/job/apply/', applicationData);
            console.log('Job application submitted successfully', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.log("Couldn't apply for job", error);
            return { success: false, error };
        }
    },
    //receive job applications
    async GetJobApplications() {
        try {
            const response = await api.get('/job/application/recent/');
            console.log('Job applications fetched successfully', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.log("Couldn't fetch job applications", error);
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
            const response = await api.post('/job/save/', save)
            console.log("Job saved", response.data)
            return { success: true, data: response.data }
        } catch (error) {
            console.log("Couldn't save this job", error)
            return { success: false, error };
        }
    },
    async GetSavedJobs() {
        try {
            const response = await api.get('/job/save/')
            console.log("Saved jobs fetched", response.data)
            return { success: true, data: response.data }
        } catch (error) {
            console.log("Couldn't fetch saved jobs", error)
            return { success: false, error };
        }
    },
    async RemoveSavedJob(jobId) {
        try {
            const response = await api.delete(`/job/unsave/?job=${jobId}`)
            console.log("Saved job removed", response.data)
            return { success: true, data: response.data }
        } catch (error) {
            console.log("Couldn't remove saved job", error)
            return { success: false, error };
        }
    },
    async GetAppliedJobs() {
        try {
            const response = await api.get('/job/apply/')
            console.log("Applied jobs fetched", response.data)
            return { success: true, data: response.data }
        } catch (error) {
            console.log("Couldn't fetch applied jobs", error)
            return { success: false, error };
        }
    },
    async GetRecentApplicants(jobId) {
        try {
            const response = await api.get('/job/application/', { params: { job_id: jobId } })
            console.log("Job details fetched", response.data)
            return { success: true, data: response.data }
        } catch (error) {
            console.log("Couldn't fetch job details", error)
            return { success: false, error };
        }
    },
}