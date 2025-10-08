import { EntidadBasico } from './EntidadBasico';
export interface ProcesoFiscalizado {
    id:string;
    fechaIngreso:string;
    requisitoFiscalizado:string;
    tipodocumentofoleo:string;
    descripciondocumento:string;
    emisor:string;
    sectorempresa:string;
    tipoverificacion:string;
    estado:string;
    fechaInicio:string;
    fechaFin:string;
    esnotificacion:string;
    esrespuesta:string;
    documentoRecibido:string;
    documentoEnviado:string;
    documentoCargado:string;
    observacion:string;
    observacionInterna:string;
    medioNotificacion:string;
}