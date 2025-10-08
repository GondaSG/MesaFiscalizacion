import React from 'react';
import { X } from 'lucide-react';
import { ProcesoFiscalizado } from '../../Interfaces/ProcesoFiscalizado';
interface NotificacionProps {
    isNotificacionModal: boolean;
    onClose: () => void;
    row: ProcesoFiscalizado;
    // You can add more props as needed
}
const Notificacion: React.FC<NotificacionProps>  = ({isNotificacionModal, onClose, row}) =>{

if(!isNotificacionModal)   return null;
return (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                        <h3 className="text-lg font-semibold text-white">
                            Notificación de Documento
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
                                value={row.descripciondocumento}
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
                            <label className="block text-sm font-medium text-black mb-1">Fecha Notificación</label>
                            
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.fechaInicio}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Medio Notificación</label>
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
                            <label className="block text-sm font-medium text-black mb-1">Plazo de Espera</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.fechaFin}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="blocks text-sm font-medium text-black mb-1">Estado</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.estado}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
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
                                    value={row.observacion}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    readOnly={true}
                                    disabled={true}
                                />
                            
                        </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3 mt-6">
                        <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

)}

export default Notificacion;