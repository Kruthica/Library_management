import axios from 'axios';

const API_URL = 'https://library-management-nxqp.onrender.com/borrow';
const HISTORY_URL = 'https://library-management-nxqp.onrender.com/history';

export const borrowBook = async (borrowData) => {
    return await axios.post(API_URL, borrowData);
};

export const returnBook = async (id) => {
    return await axios.put(`${API_URL}/return/${id}`);
};

export const getHistory = async () => {
    return await axios.get(HISTORY_URL);
};

export const getBorrowed = async () => {
    return await axios.get(API_URL);
};
