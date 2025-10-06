import React, { useState, useEffect,useRef } from 'react';
import { X, Calendar } from 'lucide-react';
import Convocatoria from './convocatoria';
import TipoFiscalizacion from './TipoFiscalizacion';
import {TipoVerificacion} from '../../Interfaces/TipoVerificacion';
interface DocumentosModalProps {
    data: DocumentoProps[];
    item: any;
    onClose: () => void;
    selectedRows: string[];
    onSelectRow: (id: string) => void;
    selectedTipoFiscalizacion: (value: TipoVerificacion) => void;
}
interface DocumentoProps {
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
}
interface DocumentosSave {
    id: string;
    tipoVerificacion: string;
    subTipoVerificacion: string;
}
const DocumentosModal: React.FC<DocumentosModalProps> = ({data,item, onClose, selectedRows ,onSelectRow,selectedTipoFiscalizacion}) => {

    const [modalReingresante, setModalReingresante] = useState('si');
    const [modalVerTodosDocumentos, setModalVerTodosDocumentos] = useState(true);
    const [isConvocatoriaOpen, setIsConvocatoriaOpen] = useState(false);
    const [isTipoFiscalizacionOpen, setIsTipoFiscalizacionOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState<DocumentoProps>();
    const [documentos, setDocumentos] = useState<DocumentoProps[]>([]);


    const handleRowClick = (row: DocumentoProps) => {
        setIsTipoFiscalizacionOpen(true);
        setRowSelected(row)
    }



    const handleGuardar = ()=>{
        console.log(selectedRows)
        console.log(data)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        Documentos de Capacitación y Experiencia Laboral
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Contenido del Modal */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Formulario Superior */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Empleado</label>
                            <input
                                type="text"
                                value={item.entrevistado}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Cargo</label>
                            <input
                                type="text"
                                value={item.cargo}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Dependencia</label>
                            <input
                                type="text"
                                value={item.dependencia}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Fecha de Ingreso</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={item.fechaIngreso}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="dd/mm/yyyy"
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Opciones adicionales */}
                    <div className="flex items-center space-x-6 mb-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-black">¿Reingresante?</span>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="modalReingresante"
                                    value="si"
                                    checked={modalReingresante === 'si'}
                                    onChange={(e) => setModalReingresante(e.target.value)}
                                    className="mr-1"
                                />
                                <span className="text-sm text-black">Sí</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="modalReingresante"
                                    value="no"
                                    checked={modalReingresante === 'no'}
                                    onChange={(e) => setModalReingresante(e.target.value)}
                                    className="mr-1"
                                />
                                <span className="text-sm text-black">No</span>
                            </label>
                        </div>
                        <button onClick={() => setIsConvocatoriaOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                            Ver Convocatoria
                        </button>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={modalVerTodosDocumentos}
                                onChange={(e) => setModalVerTodosDocumentos(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm text-black">Ver todos los documentos</span>
                        </label>
                    </div>

                    {/* Tabla de Documentos */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Requisito Fiscalizado</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Tipo de Documento</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Descripción del Documento</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Emisor</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Sector Empresa</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Tipo Verificación</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Fecha Presentación</th>
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Fecha Fiscalización</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black"> Seleccionar </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((doc, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.requisitoFiscalizado}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.tipoDocumentofoleo}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.descripcionDocumento}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.emisor}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.sectorEmpresaEmisora}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">
                                            {doc.tipoVerificacion === null || doc.tipoVerificacion === undefined ? (
                                                <button onClick={() => handleRowClick(doc)} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                                                    AGREGAR
                                                </button>
                                            ) : (
                                                <span className="text-black">{doc.tipoVerificacion}</span>
                                            )}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.fechaPresentacion}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.fechaFiscalizacion}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => onSelectRow(item.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isTipoFiscalizacionOpen && 
                        <TipoFiscalizacion rowSelected={rowSelected} onClose={() => setIsTipoFiscalizacionOpen(false)} selectedTipoFiscalizacion={selectedTipoFiscalizacion} />
                    }
                    <Convocatoria isConvocatoriaOpen={isConvocatoriaOpen} onClose={() => setIsConvocatoriaOpen(false)} pdfUrl={"https://drive.google.com/file/d/1hzklZXo7LM-EpsJBqi7wdbSWjVvXAnP3/preview"} />
                    {/* Botones del Modal */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentosModal;