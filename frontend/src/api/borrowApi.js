import axios from 'axios';

const API_URL = 'http://localhost:5000/borrow';
const HISTORY_URL = 'http://localhost:5000/history';

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
