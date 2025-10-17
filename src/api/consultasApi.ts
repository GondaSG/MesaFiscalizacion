import { Response } from "../Interfaces/Response";
import apiClient from "./apiClient";
import { ParametrosConsulta } from "../Interfaces/ParametrosConsulta";
import { DocumentosObservados } from "../Interfaces/DocumentosObservados";
import { FiscalizacionLegajo } from "../Interfaces/FiscalizacionLegajo";
import { DocumentosNotificacion } from "../Interfaces/DocumentosNotificacion";
export const SearchConsultaLegajos =async (item :ParametrosConsulta,page: number, pageSize: number) => {
    const response = await apiClient.post<Response<FiscalizacionLegajo>>(`/consulta/SearchConsultaLegajos?page=${page}&pageSize=${pageSize}`, item );
    return response.data;
}
export const SearchConsultaDocumentosObservados =async (item :ParametrosConsulta,page: number, pageSize: number) => {
    const response = await apiClient.post<Response<DocumentosObservados>>(`/consulta/SearchConsultaDocumentosObservados?page=${page}&pageSize=${pageSize}`, item );
    return response.data;
}
export const SearchConsultaDocumentosNotificacion =async (item :ParametrosConsulta,page: number, pageSize: number) => {
    const response = await apiClient.post<Response<DocumentosNotificacion>>(`/consulta/SearchConsultaDocumentosNotificados?page=${page}&pageSize=${pageSize}`, item );
    return response.data;
}