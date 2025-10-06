import apiClient from "./apiClient";

export const searchForDates = async (fechaInicio: string, fechaFin: string,page:number,pageSize:number) => {
    const response = await apiClient.post(`/legajos/searchForDates?page=${page}&pageSize=${pageSize}`, { fechaInicio, fechaFin });
    if(response.status == 200)
        return response.data;
    return {mensaje: 'Ocurrio un error'}
};
export const searchForEmpleado = async (empleado:string,page:number,pageSize:number) => {
    const response = await apiClient.post(`/legajos/searchForEmpleado?page=${page}&pageSize=${pageSize}`, { empleado });
    if(response.status == 200)
        return response.data;
    return {mensaje: 'Ocurrio un error'}
};
export const searchForDependency = async (dependencia: string,page:number,pageSize:number) => {
    const response = await apiClient.post(`/legajos/searchForDependency?page=${page}&pageSize=${pageSize}`, { dependencia });
    if(response.status == 200)
        return response.data;
    return {mensaje: 'Ocurrio un error'}
};
export const searchForNumeroLegajo = async (numeroLegajo: string,page:number,pageSize:number) => {
    const response = await apiClient.post(`/legajos/searchForNumeroLegajo?page=${page}&pageSize=${pageSize}`, { numeroLegajo });
    if(response.status == 200)
        return response.data;
    return {mensaje: 'Ocurrio un error'}
};
export const searchDocumentoForEmpleado = async (empleado: string) => {
    const response = await apiClient.post(`/legajos/searchDocumentosForEmpleado`, { empleado });
    if(response.status == 200)
        return response.data;
    return {mensaje: 'Ocurrio un error'}
};
