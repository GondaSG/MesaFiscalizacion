export interface Documento {
    id: string ;
    requisitoFiscalizado: string;
    tipoDocumentofoleo: string;
    descripcionDocumento: string;
    emisor: string;
    sectorEmpresaEmisora: string;
    tipoVerificacion: string | null;
    tipoVerificacionId: string | null;
    subTipoVerificacion: string | null;
    subTipoVerificacionId: string | null;
    fechaPresentacion: string;
    fechaFiscalizacion: string;
    isfiscalizado: boolean;
}