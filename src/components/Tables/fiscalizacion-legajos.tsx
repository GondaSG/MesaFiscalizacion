import { BandejaDocumentosProps } from '../../Interfaces/BandejaDocumentosProps';
import { useState } from 'react';
const FiscalizacionLegajos: React.FC<BandejaDocumentosProps> = ({selectedMenuItem}) => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;

    const [optionChecked,setOptionChecked] = useState('1');
    const [fechaInicio, setFechaInicio] = useState(fechaFormateada);
    const [fechaFin, setFechaFin] = useState(fechaFormateada);
    const [empleado, setEmpleado] = useState('');
    const [numeroLegajo,setNumeroLegajo] = useState('')
    const [tipoDocumento,setTipoDocumento] = useState('')
    const [numeroDocumento,setNumeroDocumento] = useState('')
      
    
    
    
    
    return (
        <main className="flex-1 p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow">
                {/* Header de la sección */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-black">
                        Consultas <span className="text-blue-600">&gt;&gt; {selectedMenuItem}</span>
                    </h2>
                </div>

                {/* Filtros */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-sm font-semibold text-black mb-4">Filtros de búsqueda</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid grid-cols-4 md:grid-cols-11 gap-4">
                            <div className="grid col-span-1 place-items-center  ">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="1"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '1'}
                                />
                            </div>
                            <div className="col-span-5">
                                <label className="block text-sm text-black mb-1">Fecha Notificación. desde</label>
                                <input
                                    type="date"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={!(optionChecked === '1')}
                                />
                            </div>
                            <div className="col-span-5">
                                <label className="block text-sm text-black mb-1">al</label>
                                <input
                                    type="date"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={!(optionChecked === '1')}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                            <div className="grid col-span-1 place-items-center">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="2"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '2'}
                                />
                            </div>
                            <div className="col-span-10">
                                <div>
                                    <label className="block text-sm text-black mb-1">N° Empleado</label>
                                    <input
                                        type="text"
                                        value={empleado}
                                        onChange={(e) => setEmpleado(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        disabled={!(optionChecked === '2')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                            <div className="grid col-span-1 place-items-center">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="3"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '3'}
                                />
                            </div>
                            <div className="col-span-10">
                                <label className="block text-sm text-black mb-1">N° Legajo</label>
                                <input
                                    type="text"
                                    value={numeroLegajo}
                                    onChange={(e) => setNumeroLegajo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={!(optionChecked === '3')}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-11 gap-4">
                          
                            <div className="grid col-span-1 place-items-center">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="4"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '4'}
                                />
                            </div>
                           <div className="col-span-5">
                                <label className="block text-sm text-black mb-1">Tipo Documento</label>
                                <select 
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    disabled={!(optionChecked === '4')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  
                                >
                                    <option value="">Seleccione</option>
                                    <option value="DNI">DNI</option>
                                    <option value="CUIL">CUIL</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                            </div>
                            <div className="col-span-5">
                                <label className="block text-sm text-black mb-1">N° documento</label>
                                <input
                                    type="text"
                                    value={numeroDocumento}
                                    onChange={(e) => setNumeroDocumento(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={!(optionChecked === '4')}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-11 gap-4">
                            <div className="grid col-span-1 place-items-center">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="5"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '5'}
                                />
                            </div>
                           <div className="col-span-10">
                                <label className="block text-sm text-black mb-1">Estado Fiscalización</label>
                                <select 
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    disabled={!(optionChecked === '5')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  
                                >
                                    <option value="">Seleccione</option>
                                    <option value="DNI">DNI</option>
                                    <option value="CUIL">CUIL</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-11 gap-4">
                            <div className="grid col-span-1 place-items-center">
                                <input
                                    type="radio"
                                    name="activaFiltro"
                                    value="6"
                                    onChange={(e) => setOptionChecked(e.target.value)}
                                    checked={optionChecked === '6'}
                                />
                            </div>
                         <div className="col-span-10">
                                <label className="block text-sm text-black mb-1">Tipo Empleado</label>
                                <select 
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    disabled={!(optionChecked === '6')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  
                                >
                                    <option value="">Seleccione</option>
                                    <option value="ABIERTO">ABIERTO</option>
                                    <option value="CERRADO SATISFACTORIAMENTE">CERRADO SATISFACTORIAMENTE</option>
                                    <option value="CERRADO DE OFICIO">CERRADO DE OFICIO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                                //onClick={() => handleClickLimpiar()}
                            >
                                Limpiar
                            </button>
                            <button
                                //onClick={() => handleClickConsultar()}
                                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Consultar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Listado de Ingresantes */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-black">Listado de Ingresantes</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            //onClick={() => handleAgregarLegajoClick()}
                        >
                            
                            <span>Agregar Legajo</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Legajo</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Empleado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fecha de Ingreso</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Régimen Laboral</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tipo Empleado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Cargo</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Dependencia</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Estado Fiscalización</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Responsable</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex items-center justify-center mt-4 space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            //disabled={page === 1}
                            //onClick={() => setPage(page - 1)}
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-sm text-black">{1}</span>
                        <span className="px-3 py-1 text-sm text-black">de</span>
                        <span className="px-3 py-1 text-sm text-black">{1}</span>
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            //disabled={page === totalPages}
                            //onClick={() => setPage(page + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FiscalizacionLegajos;