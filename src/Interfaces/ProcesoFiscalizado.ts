import { ProcesoFiscalizadoHistorico } from './ProcesoFiscalizadoHistorico';
export interface ProcesoFiscalizado {
    id:string;
    fechaIngreso:string;
    requisitoFiscalizado:string;
    tipodocumentofoleo:string;
    descripciondocumento:string;
    emisor:string;
    sectorempresa:string;
    tipoverificacion:string;
    subtipoverificacion:string;
    estado:string;
    fechaInicio:string;
    fechaFin:string;
    fechaInforme:string;
    esnotificacion:string;
    esrespuesta:string;
    documentoRecibido:string;
    documentoEnviado:string;
    documentoCargado:string;
    observacion:string;
    observacionInterna:string;
    medionotificacion:string;
    historico:ProcesoFiscalizadoHistorico[];
}