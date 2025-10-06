import apiClient from "./apiClient";
import { Ingresante } from "../Interfaces/Ingresantes";
import { Response } from "../Interfaces/Response";


export const searchForDates = async (fechaInicio: string, fechaFin: string, page:number , pageSize:number) => {
    const response = await apiClient.post<Response<Ingresante>>(`/ingresantes/searchForDates?page=${page}&pageSize=${pageSize}`, { fechaInicio, fechaFin });
    return response.data;
};
export const searchForEmpleado = async (empleado:string, page:number , pageSize:number) => {
    const response = await apiClient.post<Response<Ingresante>>(`/ingresantes/searchForEmpleado?page=${page}&pageSize=${pageSize}`, { empleado });
    return response.data;
};
export const searchForDependency = async (dependencia: string, page:number , pageSize:number) => {
    const response = await apiClient.post<Response<Ingresante>>(`/ingresantes/searchForDependency?page=${page}&pageSize=${pageSize}`, { dependencia });
    return response.data;
};
export const searchForConvocatoria = async (convocatoria: string, page:number , pageSize:number) => {
    const response = await apiClient.post<Response<Ingresante>>(`/ingresantes/searchForConvocatoria?page=${page}&pageSize=${pageSize}`, { convocatoria });
    return response.data;
};
export const guardarLegajos = async (ids: string[]) => {
    const response = await apiClient.post(`/ingresantes/agregarLegajos`, { ids });
    return response.data;
};

