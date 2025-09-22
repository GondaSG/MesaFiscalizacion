import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface BandejaIngresantesProps {
    selectedMenuItem: string;
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
    const [dependencia, setDependencia] = useState('OFICINA RECURSOS HUMANOS');

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const headerCheckboxRef = useRef<HTMLInputElement>(null);
    
    const ingresantes = [
        {
            id: 1,
            fecha: '29/07/2025',
            convocatoria: '037-2025-SUNEDU',
            registro: 'CAI',
            doc: 'DNI',
            documento: '47525889',
            entrevistado: 'GUERRERO ANDOAS WILMAN ANDRÉ',
            cargo: 'ANALISTA EVALUADOR',
            dependencia: 'UND VERIF SERV EDUC SUP UNIV',
            tipoEmpleado: 'SERV CIVIL'
        },
        {
            id: 2,
            fecha: '27/07/2025',
            convocatoria: '037-2025-SUNEDU',
            registro: 'CAI',
            doc: 'DNI',
            documento: '45614487',
            entrevistado: 'MELENDEZ ESCAMILLO CLOTILDE ELVA',
            cargo: 'ASISTENTE LEGAJOS',
            dependencia: 'OFICINA RECURSOS HUMANOS',
            tipoEmpleado: 'SERV CIVIL'
        },
        {
            id: 3,
            fecha: '31/07/2025',
            convocatoria: '082-2025-SUNEDU',
            registro: 'OAIRHH',
            doc: 'DNI',
            documento: '72903496',
            entrevistado: 'RECAVARREN VILLAVICENCIO JORGE LUI',
            cargo: 'ANALISTA PROCEDIMIENTOS',
            dependencia: 'UND VERIF SERV EDUC SUP UNIV',
            tipoEmpleado: 'SERV CIVIL'
        },
        {
            id: 4,
            fecha: '25/06/2025',
            convocatoria: '037-2025-SUNEDU',
            registro: 'CAI',
            doc: 'DNI',
            documento: '73046066',
            entrevistado: 'CISCO MENDOCILLA JOSE LEONARDO',
            cargo: 'ANALISTA II PRODUCTO AUDITOP',
            dependencia: 'ORC DE COMUNICACIONES',
            tipoEmpleado: 'SERV CIVIL'
        },
        {
            id: 5,
            fecha: '27/08/2025',
            convocatoria: '037-2025-SUNEDU',
            registro: 'OAIRHH',
            doc: 'DNI',
            documento: '60047442',
            entrevistado: 'BRAVO CHAVEZ INGRID ISABEL',
            cargo: 'ANALISTA PRESUPUESTO',
            dependencia: 'UND VERIF SERV EDUC SUP UNIV',
            tipoEmpleado: 'SERV CIVIL'
        }
    ];

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
    }, [selectedRows, ingresantes.length]);
    const handleSelectRow = (id: number) => {
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

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-black mb-1">Fec. Ing.</label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-black mb-1">al</label>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-black mb-1">N° Convocatoria</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-end space-x-2">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                                Limpiar
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Consultar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-black mb-1">Empleado</label>
                            <input
                                type="text"
                                value={empleado}
                                onChange={(e) => setEmpleado(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-black mb-1">Dependencia</label>
                            <select
                                value={dependencia}
                                onChange={(e) => setDependencia(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            >
                                <option value="OFICINA RECURSOS HUMANOS">OFICINA RECURSOS HUMANOS</option>
                                <option value="UND VERIF SERV EDUC SUP UNIV">UND VERIF SERV EDUC SUP UNIV</option>
                                <option value="ORC DE COMUNICACIONES">ORC DE COMUNICACIONES</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Listado de Ingresantes */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-black">Listado de Ingresantes</h3>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2">
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
                                {ingresantes.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleSelectRow(item.id)}
                                            />
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fecha}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.convocatoria}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.registro}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.doc}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.documento}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.entrevistado}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.cargo}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.dependencia}</td>
                                        <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.tipoEmpleado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex items-center justify-center mt-4 space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-sm text-black">1</span>
                        <span className="px-3 py-1 text-sm text-black">de</span>
                        <span className="px-3 py-1 text-sm text-black">3</span>
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BandejaIngresantes;