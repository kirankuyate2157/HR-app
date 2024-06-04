import axios from "axios";

export const getAllApplications = async (perPage, page) => {
    try {
        const response = await axios.get(`/applicant?limit=${perPage}&page=${page}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
};
export const getApplicationsDetails = async (id) => {
    try {
        const response = await axios.get(`/applicant/${id}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
};