import React from "react";
import { X } from "lucide-react";
import { useState } from "react";

interface TipoFiscalizacionPros {
    isTipoFiscalizacionOpen: boolean;
    onClose: () => void;
    selectedTipoFiscalizacion: (value: string) => void;
}
const TipoFiscalizacion: React.FC<TipoFiscalizacionPros> = ({ isTipoFiscalizacionOpen, onClose , selectedTipoFiscalizacion }) => {

    const [tipoFiscalizacion, setTipoFiscalizacion] = React.useState<string>('');
    const [subTipoFiscalizacion, setSubTipoFiscalizacion] = React.useState<string>('');

    const handleClick = () => {
        if(tipoFiscalizacion === '' ){
            alert('Seleccione un tipo de verificacion');
            return;
        }
        console.log(tipoFiscalizacion);
        selectedTipoFiscalizacion(tipoFiscalizacion);
        
        onClose();
    }
    if (!isTipoFiscalizacionOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        Tipo de Fiscalización
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
                            <label className="block text-sm font-medium text-black mb-1">Tipo de fiscalización</label>
                        </div>
                        <div className="flex flex-col">
                            <select
                                onChange={(e) => {
                                    setTipoFiscalizacion(e.target.options[e.target.selectedIndex].text)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                <option value="" >Seleccione</option>
                                <option value="1">SDG</option>
                                <option value="2">WEB</option>
                            </select>
                        </div>

                        {tipoFiscalizacion === '2' ? (
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-black mb-1">Pagina Web</label>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-black mb-1">Tipo documento</label>
                            </div>
                        )}
                        {tipoFiscalizacion === '2' ? (
                            <div className="flex flex-col">
                                <select
                                    onChange={
                                        (e) => setSubTipoFiscalizacion(e.target.options[e.target.selectedIndex].text)
                                        
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="1">SUNEDU</option>
                                    <option value="2">MINEDU</option>
                                    <option value="3">OTRO</option>
                                </select>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <select
                                    onChange={
                                        (e) => setSubTipoFiscalizacion(e.target.options[e.target.selectedIndex].text)
                                        
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="4">CARTA</option>
                                    <option value="5">OFICIO</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center space-x-3 mt-6">
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

export default TipoFiscalizacion;