import apiClient from "./apiClient";
import { Dependencia } from "../Interfaces/Dependencia";
import { Response } from "../Interfaces/Response";
export const listDependencia = async () => {
    const response = await apiClient.get<Response<Dependencia>>("/dependencia/list");
    return response.data;
};