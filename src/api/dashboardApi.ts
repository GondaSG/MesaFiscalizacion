import apiClient from "./apiClient";
import { DashboardObjects } from "../Interfaces/DashboardObjects";
import { Response } from "../Interfaces/Response";
import { ParametrosConsulta } from '../Interfaces/ParametrosConsulta';
export const searchforDashboard = async (item :ParametrosConsulta) => {
    const response = await apiClient.post<Response<DashboardObjects>>("/Dashboard/SearchforDashboard", item);
    return response.data;
};