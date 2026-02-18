import api from './api';

const orderService = {
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (error) {
            console.error("Create order failed", error);
            throw error;
        }
    },

    getUserOrders: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            console.error("Get user orders failed", error);
            throw error;
        }
    }
};

export default orderService;
