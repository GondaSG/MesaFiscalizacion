import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import Convocatoria from './convocatoria';
import TipoFiscalizacion from './Tipofiscalizacion';
interface DocumentosModalProps {
    isModelOpen: boolean;
    item: any;
    onClose: () => void;
}
interface DocumentoProps {
    id: number  | undefined;
    requisito: string;
    tipo: string;
    descripcion: string;
    emisor: string;
    sector: string;
    verificacion: string | null;
    fechaPresentacion: string;
    fechaFiscalizacion: string;
}
const DocumentosModal: React.FC<DocumentosModalProps> = ({ isModelOpen, item, onClose }) => {

    const [modalReingresante, setModalReingresante] = useState('si');
    const [modalVerTodosDocumentos, setModalVerTodosDocumentos] = useState(true);
    const [isConvocatoriaOpen, setIsConvocatoriaOpen] = useState(false);
    const [isTipoFiscalizacionOpen, setIsTipoFiscalizacionOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState<DocumentoProps>();

    const [documentos, setDocumentos] = useState([{
        id: 1,
        requisito: 'Capacitación',
        tipo: 'Diploma',
        descripcion: 'Grado de Bachiller',
        emisor: 'Universidad de Piura',
        sector: 'PRIVADO',
        verificacion: 'WEB',
        fechaPresentacion: '15/06/2025',
        fechaFiscalizacion: ''
    },
    {
        id: 2,
        requisito: 'Capacitación',
        tipo: 'Certificado',
        descripcion: 'Curso de Administración',
        emisor: 'ISIL',
        sector: 'PRIVADO',
        verificacion: 'SGD',
        fechaPresentacion: '15/06/2025',
        fechaFiscalizacion: ''
    },
    {

        requisito: 'Capacitación',
        tipo: 'Constancia',
        descripcion: 'Curso Power BI',
        emisor: 'Universidad Ricardo Palma',
        sector: 'PRIVADO',
        verificacion: 'SGD',
        fechaPresentacion: '15/06/2025',
        fechaFiscalizacion: ''
    },
    {
        id: 3,
        requisito: 'Experiencia Laboral',
        tipo: 'Constancia',
        descripcion: 'Constancia de trabajo',
        emisor: 'Ministerio de Vivienda Construcción y Saneamiento',
        sector: 'PÚBLICO',
        verificacion: null,
        fechaPresentacion: '16/06/2025',
        fechaFiscalizacion: ''
    },
    {
        id: 4,
        requisito: 'Experiencia Laboral',
        tipo: 'Certificado',
        descripcion: 'Certificado de trabajo',
        emisor: 'Agile Quality Ingeniería',
        sector: 'PRIVADO',
        verificacion: null,
        fechaPresentacion: '16/06/2025',
        fechaFiscalizacion: ''
    },
    {
        id: 5,
        requisito: 'Experiencia Laboral',
        tipo: 'Constancia',
        descripcion: 'Constancia de Prestación de Servicio (CAS)',
        emisor: 'Ministerio de Cultura',
        sector: 'PÚBLICO',
        verificacion: null,
        fechaPresentacion: '16/06/2025',
        fechaFiscalizacion: ''
    },
    {
        id: 6,
        requisito: 'Experiencia Laboral',
        tipo: 'Certificado de trabajo',
        descripcion: 'Certificado de trabajo',
        emisor: 'GEOSUELOS SAC',
        sector: 'PRIVADO',
        verificacion: 'SGD',
        fechaPresentacion: '16/06/2021',
        fechaFiscalizacion: ''
    }]);

    const selectedTipoFiscalizacion = (tipo: string) => {
        const updatedDocumentos = [...documentos];
        console.log(tipo);
        updatedDocumentos.forEach((doc, index) => {
            if (index == rowSelected?.id) {
                doc.verificacion = tipo;
            }
        });
        console.log(updatedDocumentos);
        setDocumentos(updatedDocumentos);
    }
    const handleRowClick = (row: DocumentoProps) => {
        setIsTipoFiscalizacionOpen(true);
        setRowSelected(row)
    }
    if (!isModelOpen) return null;
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
                                value={item.empleado}
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
                                    type="date"
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
                                    <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Seleccionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentos.map((doc, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.requisito}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.tipo}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.descripcion}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.emisor}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.sector}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">
                                            {doc.verificacion === null ? (
                                                <button onClick={() => handleRowClick(doc)} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                                                    AGREGAR
                                                </button>
                                            ) : (
                                                <span className="text-black">{doc.verificacion}</span>
                                            )}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.fechaPresentacion}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-xs text-black">{doc.fechaFiscalizacion}</td>
                                        <td className="border border-gray-200 px-2 py-2 text-center">
                                            <input type="checkbox" className="w-4 h-4" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TipoFiscalizacion isTipoFiscalizacionOpen={isTipoFiscalizacionOpen} onClose={() => setIsTipoFiscalizacionOpen(false)} selectedTipoFiscalizacion={selectedTipoFiscalizacion} />
                    <Convocatoria isConvocatoriaOpen={isConvocatoriaOpen} onClose={() => setIsConvocatoriaOpen(false)} pdfUrl={"https://drive.google.com/file/d/1hzklZXo7LM-EpsJBqi7wdbSWjVvXAnP3/preview"} />
                    {/* Botones del Modal */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentosModal;