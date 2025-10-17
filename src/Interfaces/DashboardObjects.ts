export interface DashboardObjects{
    empleadoCount : string;
    legajoCount : string;
    observadoCount: string;
    tasaobservacion: TasaObservacion[];
    promediopormes: PromedioPorMes[];
    trazaCompleta: TrazaCompleta;
    tasaCumplimiento: TasaCumplimiento;
}

export interface TasaObservacion {
    estado: string;
    motivoobservacion: string;
}

export interface TrazaCompleta {
    total: number;
    cumplido: number;
}
export interface TasaCumplimiento {
    total: number;
    cumplido: number;
}
export interface PromedioPorMes {
    mes: number;
    promedio: number;
}