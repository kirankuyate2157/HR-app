import axios from "axios";


export const createApplicant = async (data) => {
    console.log("Post axios data : ", data);
    try {
        const response = await axios.post('/applicant', data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};

export const getJobStatus = async (id) => {
    try {
        const response = await axios.get(`/job/status/${id}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
};