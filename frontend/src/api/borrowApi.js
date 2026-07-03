import axios from 'axios';
import BASE_URL from "./base";
const API_URL = `${BASE_URL}/borrow`;
const HISTORY_URL = `${BASE_URL}/history`;

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
