import api from './api';

const addressService = {
    getAddresses: async () => {
        const response = await api.get('/addresses');
        return response.data;
    },

    addAddress: async (addressData) => {
        const response = await api.post('/addresses', addressData);
        return response.data;
    },

    updateAddress: async (id, addressData) => {
        const response = await api.put(`/addresses/${id}`, addressData);
        return response.data;
    },

    deleteAddress: async (id) => {
        const response = await api.delete(`/addresses/${id}`);
        return response.data;
    },

    setDefaultAddress: async (id) => {
        const response = await api.put(`/addresses/${id}/default`);
        return response.data;
    }
};

export default addressService;
