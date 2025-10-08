import React from 'react';
import { X } from 'lucide-react';
import { ProcesoFiscalizado } from '../../Interfaces/ProcesoFiscalizado';
interface EnvioProps {
    isEnvioModal: boolean;
    onClose: () => void;
    row: ProcesoFiscalizado;
    selectedDatos: (estado: string, date:string) => void;
    // You can add more props as needed
}
const Envio: React.FC<EnvioProps>  = ({isEnvioModal, onClose, row ,selectedDatos}) =>{
const [estado, setEstado] = React.useState<string>('');
const [fechaEnvio, setFechaEnvio] = React.useState<string>('');

const handleButtonCancelClick = () => {
    setFechaEnvio('');
    onClose();
}
const handleButtonSaveClick = () => {
    selectedDatos(estado,fechaEnvio);
    onClose();
}
if(!isEnvioModal)   return null;
return (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    {row.tipoverificacion === 'SGD' && 
                        <h3 className="text-lg font-semibold text-white">
                            Envío de Documento
                        </h3>
                    }  
                    {row.tipoverificacion === 'WEB' && 
                    <h3 className="text-lg font-semibold text-white">
                        Validación WEB
                    </h3>
                    }  

             
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
                            {row.tipoverificacion === 'SGD' && 
                                <label className="block text-sm font-medium text-black mb-1">Tipo Fiscalización</label>
                            }
                            {row.tipoverificacion === 'WEB' &&          
                                <label className="block text-sm font-medium text-black mb-1">Tipo Verificación</label>
                            }   
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.tipoverificacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            {row.tipoverificacion === 'SGD' && 
                                <label className="block text-sm font-medium text-black mb-1">Tipo Documento</label>
                            }
                            {row.tipoverificacion === 'WEB' &&          
                                <label className="block text-sm font-medium text-black mb-1">Página Web</label>
                            }   
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.subtipoverificacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    {row.tipoverificacion === 'SGD' &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Documento Enviado</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.documentoEnviado}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>}
                    {row.tipoverificacion === 'SGD' &&
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
                    </div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Fecha Envío</label>
                        </div>
                        <div className="flex flex-col">
                            {row.tipoverificacion === 'SGD' && 
                                <input
                                    type="date"
                                    value={row.fechaEstadoActual}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    readOnly={true}
                                    disabled={true}
                                />
                            }
                            {row.tipoverificacion === 'WEB' && 
                                <input
                                    type="date"
                                    value={fechaEnvio || row.fechaEstadoActual}
                                    onChange={(e) => setFechaEnvio(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            }
                        </div>
                    </div>
                    {row.tipoverificacion === 'WEB' &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Resultado</label>
                        </div>
                    
                        <div className="flex flex-col">
                                <select
                                    onChange={
                                        (e) => setEstado(e.target.options[e.target.selectedIndex].text)
                                        
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="" >Seleccione</option>
                                    <option value="1">CONFORME</option>
                                    <option value="2">NO CONFORME</option>
                                </select>
                        </div>
                    </div>
                    }
                    
                    <div className="flex justify-center space-x-3 mt-6">
                        <button 
                        onClick={ () => handleButtonCancelClick()}
                        className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            Cancelar
                        </button>
                        {row.tipoverificacion === 'WEB' && 
                        <button 
                        onClick={()=>handleButtonSaveClick()}
                        className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                            Guardar
                        </button>}
                    </div>
                </div>
            </div>
        </div>

)}

export default Envio;