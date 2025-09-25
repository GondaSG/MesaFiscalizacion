import React from 'react';
import { X } from 'lucide-react';
import { compareDateToDate } from '../Help/helper';
interface RespuestaProps {
    isRespuestaModal: boolean;
    onClose: () => void;
    row: any;
    // You can add more props as needed
}
const Respuesta: React.FC<RespuestaProps> = ({ isRespuestaModal, onClose, row }) => {
    const [estadoRespuesta, setEstadoRespuesta] = React.useState<string>('');
    const [documentoInforme, setDocumentoInforme] = React.useState<string>('');
    const [fechaInforme, setFechaInforme] = React.useState<string>('');
    const [observacion, setObservacion] = React.useState<string>('');
    const [observacionReiteracion, setObservacionReiteracion] = React.useState<string>('');
    const [fechaReiteracion, setFechaReiteracion] = React.useState<string>('');


    const handleClick = () => {
    };
    if (!isRespuestaModal) return null;
    console.log(compareDateToDate(row.fechaPlazoEspera));
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        Respuesta de Documento
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Contenido del Modal */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
                    {/* Formulario Superior */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Documento</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.descripcionDocumento}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Entidad</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.emisor}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Plazo de Espera</label>

                        </div>
                        <div className="flex flex-col">
                            <input
                                type="date"
                                value={row.fechaPlazoEspera}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">¿Recibió Respuesta?</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.medioNotificacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Fecha de Respuesta</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.fechaPlazoActual}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Tipo Documento</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.subTipoVerificacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="blocks text-sm font-medium text-black mb-1">Documento Respuesta</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.documentoRespuesta}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="blocks text-sm font-medium text-black mb-1">Resultado</label>
                        </div>
                        <div className="flex flex-col">
                            <select
                                onChange={(e) => {
                                    setEstadoRespuesta(e.target.options[e.target.selectedIndex].text)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                <option value="" >Seleccione</option>
                                <option value="1">CONFORME</option>
                                <option value="2">NO CONFORME</option>
                            </select>
                        </div>
                    </div>
                    {estadoRespuesta === 'NO CONFORME' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-black mb-1">Fecha de Informe</label>
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="date"
                                    value={fechaInforme || row.fechaInforme}
                                    onChange={(e) => setFechaInforme(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                        </div>)}
                    {estadoRespuesta === 'NO CONFORME' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-black mb-1">Documento Informe</label>
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={documentoInforme || row.documentoInforme}
                                    onChange={(e) => setDocumentoInforme(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                        </div>)}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Observaciones</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                onChange={(e) => setObservacion(e.target.value)}
                                value={observacion || row.observaciones}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {compareDateToDate(row.fechaPlazoEspera) && (
                        <div>
                            <div className="flex flex-col">
                                <p className="block text-danger text-center font-medium mb-1 p-3">Sin Respuesta</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">¿Se reitera?</label>
                                </div>
                                <div className="flex flex-col">
                                    <select
                                        onChange={(e) => {
                                            setEstadoRespuesta(e.target.options[e.target.selectedIndex].text)
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        <option value="" >Seleccione</option>
                                        <option value="1">SI</option>
                                        <option value="2">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Fecha de Reiteración</label>
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="date"
                                        value={fechaReiteracion}
                                        onChange={(e) => setFechaReiteracion(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Observaciones</label>
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        onChange={(e) => setObservacionReiteracion(e.target.value)}
                                        value={observacionReiteracion}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            Cancelar
                        </button>
                        <button
                            onClick={handleClick}
                            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Respuesta;