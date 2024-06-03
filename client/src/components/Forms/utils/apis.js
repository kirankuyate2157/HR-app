import axios from "axios";


export const createJob = async (jobData) => {
    try {
        const response = await axios.post('/job', jobData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};


export const getAllJob = async () => {
    try {
        const response = await axios.get('/job');
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};