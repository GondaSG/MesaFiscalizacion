import React from 'react';
import { X } from 'lucide-react';
import { ProcesoFiscalizado } from '../../Interfaces/ProcesoFiscalizado';
import { ProcesoFiscalizadoHistorico } from '../../Interfaces/ProcesoFiscalizadoHistorico';
import { saveReiteracion} from '../../api/procesoFiscalizadoApi';
interface NotificacionProps {
    isNotificacionModal: boolean;
    onClose: () => void;
    row: ProcesoFiscalizado;
    historico: ProcesoFiscalizadoHistorico;
    isEdit: boolean;
    // You can add more props as needed
}
const Notificacion: React.FC<NotificacionProps>  = ({isNotificacionModal, onClose, row, historico,isEdit}) =>{
    const [estadoRespuesta,setEstadoRespuesta] = React.useState<string>('');
    const [fechaReiteracion,setFechaReiteracion] = React.useState<string>('');
    const [observacionReiteracion,setObservacionReiteracion] = React.useState<string>('');

    const onCloseModal = ()=>{
        setEstadoRespuesta('');
        setFechaReiteracion('');
        setObservacionReiteracion('');
        onClose();
    }
    const handleClick =async()=>{
        const resp = {
            id: row.id,
            respuesta : estadoRespuesta,
            fecha: fechaReiteracion,
            observacion: observacionReiteracion

        }
        console.log(resp);
        const response = await saveReiteracion(resp);
        onCloseModal();
    }
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
                                value={historico.fechaInicio}
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
                                value={historico.medionotificacion}
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
                                value={historico.fechaFin}
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
                                value={historico.estado}
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
                                    value={historico.observacion}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    readOnly={true}
                                    disabled={true}
                                />
                            
                        </div>
                    </div>
                    {isEdit && (
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
                            onClick={onCloseModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            Cancelar
                        </button>
                        {isEdit && 
                            <button
                                onClick={()=>handleClick}
                                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Guardar
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>

)}

export default Notificacion;