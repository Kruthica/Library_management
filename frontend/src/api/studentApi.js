import axios from 'axios';

const API_URL = 'http://localhost:5000/students';

export const getStudents = async () => {
    return await axios.get(API_URL);
};

export const addStudent = async (student) => {
    return await axios.post(API_URL, student);
};

export const updateStudent = async (id, student) => {
    return await axios.put(`${API_URL}/${id}`, student);
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
