import apiClient from "./apiClient";
import { Response} from "../Interfaces/Response";   
import { Legajo } from "../Interfaces/Legajo";
import { Documento } from "../Interfaces/Documento";
 

export const searchForDates = async (fechaInicio: string, fechaFin: string,page:number,pageSize:number) => {
    const response = await apiClient.post<Response<Legajo>>(`/legajos/searchForDates?page=${page}&pageSize=${pageSize}`, { fechaInicio, fechaFin });
    return response.data;
};
export const searchForEmpleado = async (empleado:string,page:number,pageSize:number) => {
    const response = await apiClient.post<Response<Legajo>>(`/legajos/searchForEmpleado?page=${page}&pageSize=${pageSize}`, { empleado });
    return response.data;
};
export const searchForDependency = async (dependencia: string,page:number,pageSize:number) => {
    const response = await apiClient.post<Response<Legajo>>(`/legajos/searchForDependency?page=${page}&pageSize=${pageSize}`, { dependencia });
    return response.data;
};
export const searchForNumeroLegajo = async (numeroLegajo: string,page:number,pageSize:number) => {
    const response = await apiClient.post<Response<Legajo>>(`/legajos/searchForNumeroLegajo?page=${page}&pageSize=${pageSize}`, { numeroLegajo });
    return response.data;
};
export const searchDocumentoForEmpleado = async (empleado: string) => {
    const response = await apiClient.post<Response<Documento>>(`/legajos/searchDocumentosForEmpleado`, { empleado });
    return response.data;
};
