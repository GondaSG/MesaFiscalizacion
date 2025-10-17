import apiClient from "./apiClient";
import { ProcesoFiscalizado } from "../Interfaces/ProcesoFiscalizado";
import { Ingresante } from "../Interfaces/Ingresantes";
import { Response } from "../Interfaces/Response";
import { RespuestaDto } from "../Interfaces/RespuestaDto";
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
export const saveInformeNoConforme = async (formData:FormData) => {
    const response = await apiClient.post(`/procesoFiscalizado/file`, formData , {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data;
};
export const saveInformeConforme = async (item:RespuestaDto) => {
    const response = await apiClient.post(`/procesoFiscalizado/Confirmaok`, item);
    return response.data;
};
export const saveReiteracion = async (item:any) => {
    const response = await apiClient.post(`/procesoFiscalizado/saveReiteracion`, item);
    return response.data;
};
export const obtenerDocumento = async (id:string) => {
    const response = await apiClient.get(`/procesoFiscalizado/obtenerDocumento?fiscalizacionId=${id}`, { responseType: 'blob' });
    console.log(response);
    return response.data;
};
