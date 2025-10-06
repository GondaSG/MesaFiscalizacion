import apiClient from "./apiClient";
import { Response } from "../Interfaces/Response";

export const login = async (username: string, password: string) => {

    const response = await apiClient.post<Response<object>>("/auth/login", { username, password });
    const dataResponse = response.data;
    if(dataResponse.success){
      localStorage.setItem("token", dataResponse?.value?.token?.toString() ||'');
      return { isLogin :dataResponse.success , mensaje: dataResponse.menssage};

    }else{
      return { isLogin :false, mensaje: dataResponse.menssage};
    }
};

export const register = async (username: string, password: string, email?: string) => {
  const response = await apiClient.post("/auth/register", {
    username,
    password,
    email,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
