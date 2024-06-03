import axios from "axios";


export const createJob = async (jobData) => {
    try {
        const response = await axios.post('/job', jobData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error creating Job';
    }
};


export const updateJob = async (id,jobData) => {
    console.log('Updating Job ',id,jobData);
    try {
        const response = await axios.patch(`/job/${id}`, jobData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error while Updating Job';
    }
};


export const getAllJob = async () => {
    try {
        const response = await axios.get('/job');
        return response.data.data;
    } catch (error) {
        throw error.response.data.message || 'Error retrieving Job';
    }
};