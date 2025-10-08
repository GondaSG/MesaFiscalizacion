import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { searchForDates, searchForEmpleado, searchForDependency, searchForConvocatoria, guardarLegajos } from '../../api/ingresanteApi';
import DependenciaSelect from '../Elements/Select'
import { Toast } from 'bootstrap';
import { Ingresante } from "../../Interfaces/Ingresantes";
import { Response } from "../../Interfaces/Response";
interface BandejaIngresantesProps {
    selectedMenuItem: string;
}


interface Dependencia {
    id: string;
    name :string;
}
const BandejaIngresantes: React.FC<BandejaIngresantesProps> = ({ selectedMenuItem }) => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    const [fechaInicio, setFechaInicio] = useState(fechaFormateada);
    const [fechaFin, setFechaFin] = useState(fechaFormateada);
    const [empleado, setEmpleado] = useState('');
    const [convocatoria, setConvocatoria] = useState('');
    const [dependencia, setDependencia] = useState('0');

    const [idCheck,setIdCheck] = useState('1');
    const [isDisableFechas,setIsDisableFechas] = useState(false);
    const [isDisableConvocatoria,setIsDisableConvocatoria] = useState(true);
    const [isDisableEmpleado,setIsDisableEmpleado] = useState(true);
    const [isDisableDependencia,setIsDisableDependencia] = useState(true);

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const headerCheckboxRef = useRef<HTMLInputElement>(null);
    const [ingresantes, setIngresantes] = useState<Ingresante[]>([]);

    const [page, setPage] = useState(1);
    const [pagePrevia, setPagePrevia] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const handleChangeOption = (idOption:string) => {
        setIdCheck(idOption)
        switch (idOption) {
            case "1":
                setIsDisableFechas(false);
                setIsDisableConvocatoria(true);
                setIsDisableEmpleado(true);
                setIsDisableDependencia(true);
                break;
            case "2":
                setIsDisableFechas(true);
                setIsDisableConvocatoria(false);
                setIsDisableEmpleado(true);
                setIsDisableDependencia(true);
                break;
            case "3":
                setIsDisableFechas(true);
                setIsDisableConvocatoria(true);
                setIsDisableEmpleado(false);
                setIsDisableDependencia(true);
                break;
            case "4":
                setIsDisableFechas(true);
                setIsDisableConvocatoria(true);
                setIsDisableEmpleado(true);
                setIsDisableDependencia(false);
                break;
            default:
                break;
        }
    
    }

    useEffect(() => {

        if (!headerCheckboxRef.current) return;

        if (selectedRows.length === 0) {
            headerCheckboxRef.current.indeterminate = false;
            headerCheckboxRef.current.checked = false;
        } else if (selectedRows.length === ingresantes.length) {
            headerCheckboxRef.current.indeterminate = false;
            headerCheckboxRef.current.checked = true;
        } else {
            headerCheckboxRef.current.indeterminate = true;
        }
    }, [selectedRows, ingresantes.length,]);
    
    useEffect(() => {
        const fetchIngresantes = async () => {
        try {
            if(ingresantes.length != 0)
                await handleClickConsultar();
        } catch (error) {
            console.error("Error cargando Ingresantes:", error);
        }
        };
        fetchIngresantes();
    }, [page]);

    const selectValor = (optionId:string) =>{
        setDependencia(optionId)
    }
    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };
    const handleSelectAll = () => {
        if (selectedRows.length === ingresantes.length) {
            setSelectedRows([]); // deseleccionar todos
        } else {
            setSelectedRows(ingresantes.map((r) => r.id)); // seleccionar todos
        }
    };
    const handleClickLimpiar = ()=>{
        setFechaInicio(fechaFormateada);
        setFechaFin(fechaFormateada);
        setEmpleado('');
        setDependencia('0');
        setConvocatoria('');
    }
    const handleClickConsultar = async()=>{
        let response: any;
        if(idCheck == '1')
            response = await searchForDates(fechaInicio,fechaFin,page,pageSize)
        if(idCheck =='2')
            response = await searchForConvocatoria(convocatoria,page,pageSize)
        if(idCheck =='3')
            response = await searchForEmpleado(empleado,page,pageSize)
        if(idCheck =='4')
            response = await searchForDependency(dependencia,page,pageSize)
        
        if(response.success ){
            setIngresantes(response.data);
            setTotalPages(response.totalPages);
            setPage(response.page);
        }else {
            alert(response.menssage);
        }
    }
    const handleAgregarLegajoClick = async() =>{
        const result = await guardarLegajos(selectedRows);
        alert(result.menssage)
    }
    return (
        <main className="flex-1 p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow">
                {/* Header de la sección */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-black">
                        Fiscalización Posterior <span className="text-blue-600">&gt;&gt; {selectedMenuItem}</span>
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
                                        onChange={(e) => handleChangeOption(e.target.value)} 
                                        checked={!isDisableFechas}
                                        />
                                </div>
                                <div className="col-span-5">
                                    <label className="block text-sm text-black mb-1">Fec. Ing.</label>
                                    <input
                                        type="date"
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        disabled={isDisableFechas}
                                        />
                                </div>
                                <div className="col-span-5">
                                    <label className="block text-sm text-black mb-1">al</label>
                                    <input
                                        type="date"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        disabled={isDisableFechas}
                                        />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                                <div className="grid col-span-1 place-items-center">
                                    <input 
                                        type="radio" 
                                        name="activaFiltro" 
                                        value="2" 
                                        onChange={(e) => handleChangeOption(e.target.value)}
                                        />
                                </div>
                                <div className="col-span-10">
                                    <div>
                                        <label className="block text-sm text-black mb-1">N° Convocatoria</label>
                                        <input
                                            type="text"
                                            value={convocatoria}
                                            onChange={(e) => setConvocatoria(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                            disabled={isDisableConvocatoria}
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
                                        onChange={(e) => handleChangeOption(e.target.value)}
                                        />
                                </div>
                                <div className="col-span-10">
                                    <label className="block text-sm text-black mb-1">Empleado</label>
                                    <input
                                    type="text"
                                    value={empleado}
                                    onChange={(e) => setEmpleado(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={isDisableEmpleado}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                                <div className="grid col-span-1 place-items-center">
                                    <input 
                                        type="radio" 
                                        name="activaFiltro" 
                                        value="4" 
                                        onChange={(e) => handleChangeOption(e.target.value)}
                                        />
                                </div>
                                <div className="col-span-10">
                                    <label className="block text-sm text-black mb-1">Dependencia</label>
                                    <DependenciaSelect dependencia={dependencia} selectValor={selectValor} isDisableDependencia={isDisableDependencia}/>
                                </div>
                            </div>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4"> 
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                                onClick={()=> handleClickLimpiar()}
                            >
                                Limpiar
                            </button>
                            <button 
                            onClick={()=> handleClickConsultar()}
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
                            onClick={()=>handleAgregarLegajoClick()}
                        >
                            <Plus className="h-4 w-4" />
                            <span>Agregar Legajo</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">

                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">
                                        <input
                                            type="checkbox"
                                            ref={headerCheckboxRef}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fec. Ing.</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Convocatoria</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Reg. Lab.</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tip Doc.</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Doc.</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Entrevistado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Cargo</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Dependencia</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tipo Empleado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingresantes.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="border border-gray-200 px-3 py-8 text-center text-sm text-gray-500">
                                        No hay ingresantes para mostrar para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                ingresantes.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleSelectRow(item.id)}
                                            />
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fechaIngreso}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.convocatoria}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.registroLaboral}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.tipoDocumento}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.documento}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.entrevistado}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.cargo}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.dependencia}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.tipoEmpleado}</td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex items-center justify-center mt-4 space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            disabled={page === 1}
                            onClick={() => setPage(page -1)}        
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-sm text-black">{page}</span>
                        <span className="px-3 py-1 text-sm text-black">de</span>
                        <span className="px-3 py-1 text-sm text-black">{totalPages}</span>
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            disabled={page === totalPages}
                            onClick={() => setPage(page +1)}  
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BandejaIngresantes;