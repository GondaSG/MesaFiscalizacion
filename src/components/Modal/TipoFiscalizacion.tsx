import React from "react";
import { X } from "lucide-react";
import { useState,useEffect } from "react";
import { useQuery } from '@tanstack/react-query'
import { list } from '../../api/tipoVerificacionApi';
import {TipoVerificacion} from '../../Interfaces/TipoVerificacion';

interface TipoFiscalizacionPros {
    rowSelected: any;
    onClose: () => void;
    selectedTipoFiscalizacion: (value: TipoVerificacion) => void;
}

const TipoFiscalizacion: React.FC<TipoFiscalizacionPros> = ({ rowSelected, onClose , selectedTipoFiscalizacion }) => {

    const [tipoFiscalizacion, setTipoFiscalizacion] = React.useState<string>('Seleccione');
    const [subTipoFiscalizacion, setSubTipoFiscalizacion] = React.useState<string>('Seleccione');
    const { data : response , isLoading } = useQuery({
        queryKey: ["tipoVerificacion"],
        queryFn: list,
        staleTime: Infinity,    // nunca se borra de la caché en la sesión
    });
    const [subTipoFiscalizacions, setSubTipoFiscalizacions] = React.useState<TipoVerificacion[]>([]);
    if (isLoading) return <p>Cargando...</p>;
    if(!response.success) {
        alert(response.menssage);
        return;
    }
    const data = response.data || [];
    const tipoVerificacionOptions = Array.from(
        new Map(data.map(item => [item.tipoVerificacionId, item])).values());
    
    const handleChangeTipoFiscalizacion = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        setTipoFiscalizacion(event.target.options[event.target.selectedIndex].text)
        if(tipoFiscalizacion !== ''){
            const datosFilter: TipoVerificacion[] = data.filter(item => item.tipoVerificacionId === event.target.value)
            setSubTipoFiscalizacions(datosFilter);
        }
    }

    const handleClick = () => {
        if(tipoFiscalizacion === 'Seleccione' ){
            alert('Seleccione un tipo de fiscalización');
            return;
        }
        if(subTipoFiscalizacion === 'Seleccione' ){
            alert('Seleccione un sub elemento de fiscalización');
            return;
        }
        const datosFilter: TipoVerificacion = data.find(item => item.subTipoVerificacion === subTipoFiscalizacion);
        console.log('row',rowSelected)
        datosFilter.id = rowSelected.id;
        selectedTipoFiscalizacion(datosFilter);
        setTipoFiscalizacion('Seleccione');
        setSubTipoFiscalizacion('Seleccione');
        onClose();
    }
    const onCloseModal = () => {
        setTipoFiscalizacion('Seleccione');
        setSubTipoFiscalizacion('Seleccione');
        onClose()
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        Tipo de Fiscalización
                    </h3>
                    <button
                        onClick={onCloseModal}
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
                                onChange={(e) => handleChangeTipoFiscalizacion(e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="" >Seleccione</option>
                                {tipoVerificacionOptions.map((item) => (
                                    <option value={item.tipoVerificacionId}>{item.tipoVerificacion}</option>
                                 ))}
                            </select>
                        </div>
                     
                            {tipoFiscalizacion === 'WEB' && 
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Pagina Web</label>
                                </div>
                            } 
                            {tipoFiscalizacion === 'SGD' && 
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Tipo documento</label>
                                </div>
                            }
                            {tipoFiscalizacion !== 'Seleccione' && 
                            <div className="flex flex-col">
                                <select
                                    onChange={
                                        (e) => setSubTipoFiscalizacion(e.target.options[e.target.selectedIndex].text)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="" >Seleccione</option>
                                    {subTipoFiscalizacions.map((item) => (
                                        <option value={item.subTipoVerificacionId}>{item.subTipoVerificacion}</option>
                                    ))}
                                </select>
                            </div>
                            }
                        
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