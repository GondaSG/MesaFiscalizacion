import { BandejaDocumentosProps } from '../../Interfaces/BandejaDocumentosProps';
import { useState } from 'react';
import {SearchConsultaDocumentosNotificacion} from '../../api/consultasApi';
import {DocumentosNotificacion} from '../../Interfaces/DocumentosNotificacion';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const DocumentoNotificado: React.FC<BandejaDocumentosProps> = ({selectedMenuItem}) => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;

    const [valueChecked, setValueChecked] = useState('3');
    const [fechaInicio, setFechaInicio] = useState(fechaFormateada);
    const [fechaFin, setFechaFin] = useState(fechaFormateada);
    const [empleado, setEmpleado] = useState('');
    const [numeroLegajo,setNumeroLegajo] = useState('')
    const [optionChecked,setOptionChecked] = useState('1');
      
const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10);

    const [data, setData] = useState<DocumentosNotificacion[]>([]);
    const obtenerfiltros = () => {
        switch (optionChecked) {
            case "1":
                return {
                    opcion: optionChecked,
                    parametro1: fechaInicio,
                    parametro2: fechaFin
                };
            case "2":
                return {
                    opcion: optionChecked,
                    parametro1: empleado,
                    parametro2: ''
                };
            case "3":
                return {
                    opcion: optionChecked,
                    parametro1: numeroLegajo,
                    parametro2: ''
                };
            default:
                return {};
        }
    }
    const exportar = () => {
        const headers = [["Empleado",
        "N° Legajo",
        "N° Expediente",
        "N° Documento Enviado",
        "Sector Empresa Emisora",
        "Emisor",
        "Requisito Fiscalizado",
        "Tipo Documento",
        "Descripción Documento",
        "Fecha Notificación",
        "Fecha Espera",
        "Respuesta"]];
        const worksheet = XLSX.utils.aoa_to_sheet(headers);

        XLSX.utils.sheet_add_json(worksheet, data, { origin: "A2", skipHeader: true });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `notificaciones_${fechaFormateada}.xlsx`);
    }
    const handleConsulta = async () => {
        let request: any = obtenerfiltros();
        const response = await SearchConsultaDocumentosNotificacion(request, page, pageSize);
        setData(response.data);
    }
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
                            
                            <div className="md:col-start-2 md:col-span-10  gap-4">
                                <label className="block text-sm text-black mb-1">¿Respuesta?</label>
                                <div className="md:col-span-1 md:col-span-1 gap-4">
                                    <input
                                        type="radio"
                                        name="respuesta"
                                        value="1"
                                        className="mr-2"
                                        checked={valueChecked === '1'}
                                        onChange={(e) => setValueChecked(e.target.value)}
                                    ></input>
                                    <span className="mr-4">SI</span>
                                                                    <input
                                        type="radio"
                                        name="respuesta"
                                        value="2"
                                        className="mr-2"
                                        checked={valueChecked === '2'}
                                        onChange={(e) => setValueChecked(e.target.value)}
                                    />
                                     <span className="mr-4">NO</span>
                                                                    <input
                                        type="radio"
                                        name="respuesta"
                                        value="3"
                                        className="mr-2"
                                        checked={valueChecked === '3'}
                                        onChange={(e) => setValueChecked(e.target.value)}
                                    />
                                     <span className="mr-4">TODOS</span>
                                </div>
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
                                onClick={() => handleConsulta()}
                                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Consultar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Listado de Ingresantes */}
                <div className="p-6">
                    <div className="flex items-center justify-start mb-4">
                        <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            onClick={() => exportar()}
                        >
                            <span>Exportar excel</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-start mb-4">
                        <h3 className="text-sm font-semibold text-black">Listado de Ingresantes</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Empleado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Legajo</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Expediente</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Documento Enviado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Sector Empresa Emisora</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Emisor</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Requisito Fiscalizado</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tipo Documento</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Descripción Documento</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fecha Notificación</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fecha Espera</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Respuesta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="border border-gray-200 px-3 py-8 text-center text-sm text-gray-500">
                                        No hay ingresantes para mostrar para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                data.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.entrevistado}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.numerolegajo}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.numeroexperiente}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.documentoenviado}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.sectorempresaemisora}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.emisor}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.requisitoFiscalizado}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.tipodocumentofoleo}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.descripciondocumento}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fechaInicio}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fechaFin}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.respuesta}</td>
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

export default DocumentoNotificado;