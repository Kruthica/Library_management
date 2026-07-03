import axios from 'axios';
import BASE_URL from "./base";
const API_URL = `${BASE_URL}/books`;

export const getBooks = async () => {
    return await axios.get(API_URL);
};

export const addBook = async (book) => {
    return await axios.post(API_URL, book);
};

export const updateBook = async (id, book) => {
    return await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
