import apiClient from "./apiClient";
import { ProcesoFiscalizado } from "../Interfaces/ProcesoFiscalizado";
import { Ingresante } from "../Interfaces/Ingresantes";
import { Response } from "../Interfaces/Response";
export const searchForEmpleado = async (empleado: string) => {
    const response = await apiClient.post<Response<Ingresante>>(`/procesoFiscalizado/searchForEmpleado`, { empleado });
    return response.data;
};
export const searchForNumeroLegajo = async (numeroLegajo: string) => {
    const response = await apiClient.post<Response<Ingresante>>(`/procesoFiscalizado/searchForLegajo`, { numeroLegajo });
    return response.data;
};
export const searchForNumeroDocumento = async (numeroDocumento: string) => {
    const response = await apiClient.post<Response<Ingresante>>(`/procesoFiscalizado/searchForDocumento`, { numeroDocumento });
    return response.data;
};
export const searchFiscalizadorForEmpleado = async (empleado: string, page:number , pageSize:number) => {
    const response = await apiClient.post<Response<ProcesoFiscalizado>>(`/procesoFiscalizado/searchFiscalizadoForEmpleado?page=${page}&pageSize=${pageSize}`, { empleado });
    return response.data;
};
