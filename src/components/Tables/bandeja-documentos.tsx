import React, { useState } from 'react';
import { MdArticle, MdCircleNotifications, MdFactCheck } from "react-icons/md";
import Envio from '../Modal/Envio';
import Notificacion from '../Modal/Notificacion';
import Respuesta from '../Modal/Respuesta';

interface BandejaDocumentosProps {
  selectedMenuItem: string;
}
interface BandejaDocumento {
  id: number;
  fechaIngreso: string;
  requisito: string;
  tipoDocumento: string;
  descripcionDocumento: string;
  emisor: string;
  sectorEmpresa: string;
  tipoVerificacion: string;
  subTipoVerificacion: string;
  medioNotificacion: string;
  documentoEnviado: string;
  documentoRespuesta: string;
  documentoInforme: string;
  estadoActual: string;
  fechaEstadoActual: string;
  fechaPlazoEspera: string;
  fechaInforme: string;
  observaciones: string;
  envio: boolean;
  notificacion: number;
  respuesta: number;
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
  const [isEnvioModal, setIsEnvioModal] = useState(false);
  const [isNotificacionModal, setIsNotificacionModal] = useState(false);
  const [isRespuestaModal, setIsRespuestaModal] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<BandejaDocumento | null>(null);


  const [documentos,setDocumentos] = useState<BandejaDocumento[]>([
    {
      id : 1,
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'DIPLOMA',
      descripcionDocumento: 'GRADO BACHILLER',
      emisor: 'UNIVERSIDAD DE PIURA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'WEB',
      subTipoVerificacion: 'MINEDU',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'SOLICITUD 1',
      documentoRespuesta: 'SOLICITUD 1 respuesta',
      documentoInforme: 'SOLICITUD 1 informe',
      estadoActual: 'PENDIENTE',
      fechaEstadoActual: '',
      fechaPlazoEspera: '',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: false,
      notificacion: 0,
      respuesta: 0
    },
    {
      id : 2,
      fechaIngreso: '2025/07/08',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'DIPLOMA',
      descripcionDocumento: 'GRADO TÉCNICO',
      emisor: 'I.S.T. IDAT',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'WEB',
      subTipoVerificacion: 'MINEDU',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'SOLICITUD 2',
      documentoRespuesta: 'SOLICITUD 2 respuesta',
      documentoInforme: 'SOLICITUD 2 informe',
      estadoActual: 'CONFORME',
      fechaEstadoActual: '2025-07-13',
      fechaPlazoEspera: '',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 0,
      respuesta: 0
    },
    {
      id : 3,
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'CURSO EXCEL AVANZADO',
      emisor: 'UNIVERSIDAD FEDERICO VILLARREAL',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'CARTA',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'SOLICITUD 3',
      documentoRespuesta: 'SOLICITUD 3 respuesta',
      documentoInforme: 'SOLICITUD 3 informe',
      estadoActual: 'EN PROCESO',
      fechaEstadoActual: '',
      fechaPlazoEspera: '',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 1,
      respuesta: 1
    },
    {
      id : 4,
      fechaIngreso: '08/07/2025',
      requisito: 'CAPACITACIÓN',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'CURSO POWER BI',
      emisor: 'UNIVERSIDAD RICARDO PALMA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'SOLICITUD 4',
      documentoRespuesta: 'SOLICITUD 4 respuesta',
      documentoInforme: 'SOLICITUD 4 informe',
      estadoActual: 'ENVIADO',
      fechaEstadoActual: '13/07/2025',
      fechaPlazoEspera: '',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 1,
      respuesta: 1
    },
    {
      id : 5,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'AGILE QUALITY',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CERTIFICADO 1',
      documentoRespuesta: 'CERTIFICADO 1 respuesta',
      documentoInforme: 'CERTIFICADO 1 informe',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '14/07/2025',
      fechaPlazoEspera: '21/07/2025',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      id : 6,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'PRESTACIÓN DE SERVICIO',
      emisor: 'MINISTERIO DE CULTURA',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CONSTANCIA 1',
      documentoRespuesta: 'CONSTANCIA 1 respuesta',
      documentoInforme: 'CONSTANCIA 1 informe',
      estadoActual: 'OBSERVADO',
      fechaEstadoActual: '15/07/2025',
      fechaPlazoEspera: '22/07/2025',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      id : 7,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CONSTANCIA',
      descripcionDocumento: 'PRESTACIÓN DE SERVICIO',
      emisor: 'MINISTERIO DE RELACIONES EXTERIORES',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CONSTANCIA 2',
      documentoRespuesta: 'CONSTANCIA 2 respuesta',
      documentoInforme: 'CONSTANCIA 2 informe',
      estadoActual: 'CONFORME',
      fechaEstadoActual: '16/07/2025',
      fechaPlazoEspera: '23/07/2025',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 2
    },
    {
      id : 8,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'T-GESTIONA',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CERTIFICADO 2',
      documentoRespuesta: 'CERTIFICADO 2 respuesta',
      documentoInforme: 'CERTIFICADO 2 informe',
      estadoActual: 'NO CONFORME',
      fechaEstadoActual: '18/07/2025',
      fechaPlazoEspera: '24/07/2025',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 2
    },
    {
      id : 9,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'CONSULTORIA TORRES & TORRES',
      sectorEmpresa: 'PRIVADO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CERTIFICADO 3',
      documentoRespuesta: 'CERTIFICADO 3 respuesta',
      documentoInforme: 'CERTIFICADO 3 informe',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '14/07/2025',
      fechaPlazoEspera: '21/07/2025',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 1
    },
    {
      id : 10,
      fechaIngreso: '08/07/2025',
      requisito: 'EXPERIENCIA LABORAL',
      tipoDocumento: 'CERTIFICADO',
      descripcionDocumento: 'CERTIFICADO DE TRABAJO',
      emisor: 'MINISTERIO DE AGRICULTURA',
      sectorEmpresa: 'PÚBLICO',
      tipoVerificacion: 'SGD',
      subTipoVerificacion: 'OFICIO',
      medioNotificacion: 'MPV - MESA DE PARTES VIRTUAL',
      documentoEnviado: 'CERTIFICADO 4',
      documentoRespuesta: 'CERTIFICADO 4 respuesta',
      documentoInforme: 'CERTIFICADO 4 informe',
      estadoActual: 'NOTIFICADO',
      fechaEstadoActual: '2025-07-14',
      fechaPlazoEspera: '2025-07-21',
      fechaInforme: '',
      observaciones: 'FALTA INFORMACIÓN',
      envio: true,
      notificacion: 2,
      respuesta: 2
    }
  ]);


  const handleEnvioRowClick = (row : BandejaDocumento)=> {
    setSelectedDocumento(row);
    setIsEnvioModal(true);
  }
  const handleNotificacionRowClick = (row : BandejaDocumento)=> {
    setSelectedDocumento(row);
    setIsNotificacionModal(true);
  }
  const handleRespuestaRowClick = (row : BandejaDocumento)=> {
    setSelectedDocumento(row);
    setIsRespuestaModal(true);
  }
  const selectedDatosEnvio = (estado: string, date:string) => {
    console.log("Estado seleccionado: ", estado);
    console.log("Fecha seleccionada: ", date);
    const updatedDocumentos = [...documentos];
    updatedDocumentos.forEach((doc, index) => {
        if (doc.id == selectedDocumento?.id) {
            doc.fechaEstadoActual = date;
            doc.estadoActual = estado;
        }
    });
    setDocumentos(updatedDocumentos);
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
                        <button 
                        onClick={() => handleEnvioRowClick(item)}
                        >
                          <MdArticle color="blue" size={30} />
                        </button>
                      }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{
                        item.notificacion === 1 &&
                        <button
                        >
                          <MdCircleNotifications color="gray" size={30} />
                        </button>
                      }
                        {item.notificacion === 2 &&
                          <button
                          onClick={() => handleNotificacionRowClick(item)}
                          >
                            <MdCircleNotifications color="orange" size={30} />
                          </button>
                        }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">
                        {
                          item.respuesta === 1 &&
                          <button
                          >
                            <MdFactCheck color="gray" size={30} />
                          </button>
                        }
                        {item.respuesta === 2 &&
                          <button
                          onClick={() => handleRespuestaRowClick(item)}
                          >
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
          <Envio isEnvioModal={isEnvioModal} onClose={() => setIsEnvioModal(false)} row={selectedDocumento} selectedDatos={selectedDatosEnvio} />      
          <Notificacion isNotificacionModal={isNotificacionModal} onClose={() => setIsNotificacionModal(false)} row={selectedDocumento} />      
          <Respuesta isRespuestaModal={isRespuestaModal} onClose={() => setIsRespuestaModal(false)} row={selectedDocumento} />      
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