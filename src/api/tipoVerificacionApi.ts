import apiClient from "./apiClient";

export const list = async () => {
    const response = await apiClient.get(`/tipoVerificacion/list`);
    return response.data;
};
