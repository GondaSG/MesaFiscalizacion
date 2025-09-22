import React, { useState } from 'react';
import { MdArticle, MdCircleNotifications, MdFactCheck } from "react-icons/md";

interface BandejaDocumentosProps {
  selectedMenuItem: string;
}

const BandejaDocumentos: React.FC<BandejaDocumentosProps> = ({ selectedMenuItem }) => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const fechaFormateada = `${año}-${mes}-${dia}`;

  const [fechaIngreso, setFechaIngreso] = useState(fechaFormateada);
  const [dependenciaDoc, setDependenciaDoc] = useState('');
  const [empleadoDoc, setEmpleadoDoc] = useState('');
  const [numeroLegajo, setNumeroLegajo] = useState('');
  const [documentoIdent, setDocumentoIdent] = useState('');
  const [empleadoDocList, setEmpleadoDocList] = useState('');
  const [cargoDoc, setCargoDoc] = useState('');
  const [verTodosAnios, setVerTodosAnios] = useState(true);
  const [reingresante, setReingresante] = useState('si');


  const documentos = [
    {
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'DIPLOMA',
      descripcionDocumento: 'GRADO BACHILLER',
      emisor: 'UNIVERSIDAD DE PIURA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'WEB',
      estadoActual: 'PENDIENTE',
      fechaEstadoActual: '',
      fechaPlazoEspera: '',
      envio: false,
      notificacion: 0,
      respuesta: 0
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'DIPLOMA',
      descripcionDocumento: 'GRADO TÉCNICO',
      emisor: 'I.S.T. IDAT',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'WEB',
      estadoActual: 'CONFORME',
      fechaEstadoActual: '13/07/2025',
      fechaPlazoEspera: '',
      envio: true,
      notificacion: 0,
      respuesta: 0
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'CURSO EXCEL AVANZADO',
      emisor: 'UNIVERSIDAD FEDERICO VILLARREAL',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      estadoActual: 'EN PROCESO',
      fechaEstadoActual: '',
      fechaPlazoEspera: '',
      envio: true,
      notificacion: 1,
      respuesta: 1
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'CURSO POWER BI',
      emisor: 'UNIVERSIDAD RICARDO PALMA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      estadoActual: 'ENVIADO',
      fechaEstadoActual: '13/07/2025',
      fechaPlazoEspera: '',
      envio: true,
      notificacion: 1,
      respuesta: 1
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'AGILE QUALITY',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '14/07/2025',
      fechaPlazoEspera: '21/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'PRESTACIÓN DE SERVICIO',
      emisor: 'MINISTERIO DE CULTURA',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      estadoActual: 'OBSERVADO',
      fechaEstadoActual: '15/07/2025',
      fechaPlazoEspera: '22/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'PRESTACIÓN DE SERVICIO',
      emisor: 'MINISTERIO DE RELACIONES EXTERIORES',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      estadoActual: 'CONFORME',
      fechaEstadoActual: '16/07/2025',
      fechaPlazoEspera: '23/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 2
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'T-GESTIONA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      estadoActual: 'NO CONFORME',
      fechaEstadoActual: '18/07/2025',
      fechaPlazoEspera: '24/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 2
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'CONSULTORIA TORRES & TORRES',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '14/07/2025',
      fechaPlazoEspera: '21/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'MINISTERIO DE AGRICULTURA',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '14/07/2025',
      fechaPlazoEspera: '21/07/2025',
      envio: true,
      notificacion: 2,
      respuesta: 2
    }
  ];

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow">
        {/* Header de la sección */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">
            Fiscalización Posterior <span className="text-blue-600">&gt;&gt; {selectedMenuItem}</span>
          </h2>
        </div>

        {/* Filtros de búsqueda */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-black mb-4">Filtros de búsqueda</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-black mb-1">Empleado</label>
              <input
                type="text"
                value={empleadoDoc}
                onChange={(e) => setEmpleadoDoc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">N° Legajo</label>
              <input
                type="text"
                value={numeroLegajo}
                onChange={(e) => setNumeroLegajo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Documento Identificaci</label>
              <input
                type="text"
                value={documentoIdent}
                onChange={(e) => setDocumentoIdent(e.target.value)}
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
        </div>

        {/* Listado de Documentos */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-black mb-4">Listado de Documentos</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-black mb-1">Empleado</label>
              <input
                type="text"
                value={empleadoDocList}
                onChange={(e) => setEmpleadoDocList(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Cargo</label>
              <input
                type="text"
                value={cargoDoc}
                onChange={(e) => setCargoDoc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Dependencia</label>
              <input
                type="text"
                value={dependenciaDoc}
                onChange={(e) => setDependenciaDoc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Fecha Ingreso</label>
              <div className="relative">
                <input
                  type="date"
                  value={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-black">Reingresante:</span>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reingresante"
                  value="si"
                  checked={reingresante === 'si'}
                  onChange={(e) => setReingresante(e.target.value)}
                  className="mr-1"
                />
                <span className="text-sm text-black">Si</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reingresante"
                  value="no"
                  checked={reingresante === 'no'}
                  onChange={(e) => setReingresante(e.target.value)}
                  className="mr-1"
                />
                <span className="text-sm text-black">No</span>
              </label>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={verTodosAnios}
                onChange={(e) => setVerTodosAnios(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-black">Ver todos los años</span>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Fecha Ingreso</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Requisito Fiscalizado</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Tipo Documento</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Descripción Documento</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Entidad Emisora</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Sector Empresas</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Tipo Verificación</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Estado Actual</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Fecha Estado Actual</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Plazo Expreso</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Envío</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Notificación</th>
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Responsables</th>
                </tr>
              </thead>
              <tbody>
                {documentos.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="border border-gray-200 px-3 py-8 text-center text-sm text-gray-500">
                      No hay documentos para mostrar
                    </td>
                  </tr>
                ) : (
                  documentos.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.fechaIngreso}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.requisito}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.tipoDocumento}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.descripcionDocumento}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.emisor}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.sectorEmpresa}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.tipoVerificacion}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.estadoActual}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.fechaEstadoActual}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.fechaPlazoEspera}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{
                        <button >
                          <MdArticle color="blue" size={30} />
                        </button>
                      }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{
                        item.notificacion === 1 &&
                        <button>
                          <MdCircleNotifications color="gray" size={30} />
                        </button>
                      }
                        {item.notificacion === 2 &&
                          <button>
                            <MdCircleNotifications color="orange" size={30} />
                          </button>
                        }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">
                        {
                          item.respuesta === 1 &&
                          <button>
                            <MdFactCheck color="gray" size={30} />
                          </button>
                        }
                        {item.respuesta === 2 &&
                          <button>
                            <MdFactCheck color="green" size={30} />
                          </button>
                        }
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <span className="text-sm text-black">Anterior &lt;</span>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">1</span>
            <span className="px-3 py-1 text-sm text-black">de</span>
            <span className="px-3 py-1 text-sm text-black">1</span>
            <span className="text-sm text-black">Siguiente &gt;&gt;</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BandejaDocumentos;