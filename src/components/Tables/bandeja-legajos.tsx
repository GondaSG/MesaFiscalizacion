import React, { useState } from 'react';
import { Search, Filter, RefreshCw, Plus, Calendar, X } from 'lucide-react';
import DocumentosModal from '../Modal/documentos';
interface BandejaLegajosProps {
  selectedMenuItem: string;
}

const BandejaLegajos: React.FC<BandejaLegajosProps> = ({ selectedMenuItem }) => {
  const [fechaInicio, setFechaInicio] = useState('27/07/2025');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fechaFin, setFechaFin] = useState('31/07/2025');
  const [empleado, setEmpleado] = useState('');
  const [dependencia, setDependencia] = useState('OFICINA RECURSOS HUMANOS');

  const [Legajo,setLegajo] = useState(''); 

  const Legajos = [
    {
      fechaIngreso: '08/07/2025',
      legajo: '20250701',
      registro: 'CAS',
      doc: 'DNI',
      documento: '47526959',
      empleado: 'GUERRERO VARGAS WILMAN ANDRÉ',
      dependencia: 'UND VERIF SERV EDUC SUP UNIV',
      tipoEmpleado: 'SERV CIVIL',
      fiscalizacionInicio: '08/07/2025',
      fiscalizacionFin: '08/07/2025',
      cargo: 'ANALISTA I-EVALUADOR'
    },{
      fechaIngreso: '07/07/2025',
      legajo: '20250701',
      registro: 'CAS',
      doc: 'DNI',
      documento: '40654847',
      empleado: 'MELENDEZ ESCAMILLO CLOTILDE ELVA',
      dependencia: 'OFICINA RECURSOS HUMANOS',
      tipoEmpleado: 'SERV CIVIL',
      fiscalizacionInicio: '07/07/2025',
      fiscalizacionFin: '07/07/2025',
      cargo: 'ANALISTA I-EVALUADOR'
    },{
      fechaIngreso: '23/06/2025',
      legajo: '20250601',
      registro: 'CAS',
      doc: 'DNI',
      documento: '73061605',
      empleado: 'OSCCO MENDOCILLA JOSE LEONARDO',
      dependencia: 'OFICINA RECURSOS HUMANOS',
      tipoEmpleado: 'SERV CIVIL',
      fiscalizacionInicio: '23/06/2025',
      fiscalizacionFin: '23/06/2025',
      cargo: 'ANALISTA I-EVALUADOR'
    },{
      fechaIngreso: '17/02/2025',
      legajo: '20250201',
      registro: 'SERV CIV',
      doc: 'DNI',
      documento: '18897679',
      empleado: 'MUÑOZ PRETELL JUAN JULIO',
      dependencia: 'OFICINA DE TECNOLOGIAS DE LA IMFORMACIÓN',
      tipoEmpleado: 'FUNCIONARIO',
      fiscalizacionInicio: '17/02/2025',
      fiscalizacionFin: '12/02/2025',
      cargo: 'ANALISTA I-EVALUADOR'
    }
  ];

  const openModal = (item :any) => {
    setLegajo(item);
    setIsOpenModal(true);
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
          <h3 className="text-sm font-semibold text-black mb-4">Filtros de búsqueda2</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-black mb-1">Fec. Ing.</label>
              <input
                type="text"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">al</label>
              <input
                type="text"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">N° Legajo</label>
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
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fec. Ing.</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">N° Legajo</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Reg. Lab.</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tip Doc.</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Doc.</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Empleado</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Dependencia</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Tipo Empleado</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fiscalización Inicio</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Fiscalización Fin</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-black">Seleccione Documentos</th>
                </tr>
              </thead>
              <tbody>
                {Legajos.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fechaIngreso}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.legajo}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.registro}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.doc}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.documento}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.empleado}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.dependencia}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.tipoEmpleado}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fiscalizacionInicio}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">{item.fiscalizacionFin}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs text-black">
                      <button
                        onClick={() => openModal(item)}
                        className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DocumentosModal isModelOpen={isOpenModal} item={Legajo} onClose={() => setIsOpenModal(false)} />    
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

export default BandejaLegajos;