import React, { useState, useEffect } from 'react';
import { MdArticle, MdCircleNotifications, MdFactCheck } from "react-icons/md";
import Envio from '../Modal/Envio';
import Notificacion from '../Modal/Notificacion';
import Respuesta from '../Modal/Respuesta';
import { searchForEmpleado, searchForNumeroLegajo, searchForNumeroDocumento, searchFiscalizadorForEmpleado } from '../../api/procesoFiscalizadoApi';
import { ProcesoFiscalizado } from '../../Interfaces/ProcesoFiscalizado';
import { ProcesoFiscalizadoHistorico } from '../../Interfaces/ProcesoFiscalizadoHistorico';
import {Ingresante} from '../../Interfaces/Ingresantes';
import { compareDateToDate } from '../Help/helper';
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
  const [empleado, setEmpleado] = useState('');
  const [numeroLegajo, setNumeroLegajo] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [idCheck, setIdCheck] = useState('1');
  const [isEmpleado, setIsEmpleado] = useState<boolean>(false);
  const [isNumeroLegajo, setIsNumeroLegajo] = useState<boolean>(true);
  const [isNumeroDocumento, setIsNumeroDocumento] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10);



  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [empleadoCargo, setEmpleadoCargo] = useState('');
  const [empleadoDependencia, setEmpleadoDependencia] = useState('');
  const [empleadoFechaIngreso, setEmpleadoFechaIngreso] = useState('');



  const [verTodosAnios, setVerTodosAnios] = useState(true);
  const [reingresante, setReingresante] = useState('si');
  const [isEnvioModal, setIsEnvioModal] = useState(false);
  const [isNotificacionModal, setIsNotificacionModal] = useState(false);
  const [isRespuestaModal, setIsRespuestaModal] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<ProcesoFiscalizado | null>(null);
  const [selectEnvio, setSelectEnvio] = useState<ProcesoFiscalizadoHistorico | ProcesoFiscalizado | null>(null);
  const [selectNotificacion, setSelectNotificacion] = useState<ProcesoFiscalizadoHistorico | ProcesoFiscalizado | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditNotificacion, setIsEditNotificacion] = useState<boolean>(false);

  const [documentos, setDocumentos] = useState<ProcesoFiscalizado[]>([]);

  const handleEnvioRowClick = (row: ProcesoFiscalizado) => {
    setSelectedDocumento(row);
    if(['ENVIADO', 'EN PROYECTO','PENDIENTE'].includes(row.estado))
      setSelectEnvio(row);
    else
      setSelectEnvio(row?.historico.find(t => ['ENVIADO', 'EN PROYECTO'].includes(t?.estado)) || null);
    setIsEnvioModal(true);
  }
  const handleNotificacionRowClick = (row: ProcesoFiscalizado) => {
    setSelectedDocumento(row);
    console.log(row);
    if(['NOTIFICADO'].includes(row.estado))
      if (row.fechaFin != '' && row.fechaFin != null) {
        setIsEditNotificacion(compareDateToDate(row.fechaFin));
      }
    if (['OBSERVADO','NOTIFICADO'].includes(row.estado))
      setSelectNotificacion(row || null);
    else
      setSelectNotificacion(row?.historico.find(t => ['NOTIFICADO', 'OBSERVADO'].includes(t?.estado)) || null);
    setIsNotificacionModal(true);
  }
  const handleRespuestaRowClick = (row: ProcesoFiscalizado) => {
    setSelectedDocumento(row);
    setIsEdit(row.estado == 'VINCULADO');
    setIsRespuestaModal(true);
  }
  const selectedDatosEnvio = (estado: string, date: string) => {
    console.log("Estado seleccionado: ", estado);
    console.log("Fecha seleccionada: ", date);
    const updatedDocumentos = [...documentos];
    updatedDocumentos.forEach((doc, index) => {
      if (doc.id == selectedDocumento?.id) {
        doc.fechaInicio = date;
        doc.estado = estado;
      }
    });
    setDocumentos(updatedDocumentos);
  }
  const handleClickLimpiar = () => {
    setEmpleado('');
    setNumeroLegajo('');
    setNumeroDocumento('');
  }
  useEffect(() => {
      const fetchDocumento = async () => {
      try {
          if(documentos.length != 0)
              await handleClickConsultar();
      } catch (error) {
          console.error("Error cargando Documento:", error);
      }
      };
      fetchDocumento();
  }, [page]);
  const handleClickConsultar = async () => {
    let response: any;
    if (idCheck == '1')
      response = await searchForEmpleado(empleado)
    if (idCheck == '2')
      response = await searchForNumeroLegajo(numeroLegajo)
    if (idCheck == '3')
      response = await searchForNumeroDocumento(numeroDocumento)

    if (response.success) {
      const empleado: Ingresante = response.data[0];
      setEmpleadoNombre(empleado.entrevistado);
      setEmpleadoCargo(empleado.cargo);
      setEmpleadoDependencia(empleado.dependencia);
      setEmpleadoFechaIngreso(empleado.fechaIngreso);
      const procesoFiscalizadoResponse: any = await searchFiscalizadorForEmpleado(empleado.id, page, pageSize);
      if (procesoFiscalizadoResponse.success) {
        setDocumentos(procesoFiscalizadoResponse.data);
        setTotalPages(procesoFiscalizadoResponse.totalPages);
        setPage(procesoFiscalizadoResponse.page);
      } else {
        alert(response.menssage);
      }
    } else {
      alert(response.menssage);
    }
  }
  const onCloneNotificacion = () => {
    setIsEditNotificacion(false)
    setIsNotificacionModal(false);
    handleClickConsultar();
  }
    const onCloneRespuesta = () => {
    setIsEditNotificacion(false)
    setIsNotificacionModal(false);
    handleClickConsultar();
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                                <div className="grid col-span-1 place-items-center">
                                    <input 
                                        type="radio" 
                                        name="activaFiltro" 
                                        value='1' 
                                        onChange={(e) => setIdCheck(e.target.value)}
                                        checked={idCheck === '1'}
                                        />
                                </div>
                                <div className="col-span-10">
                                    <label className="block text-sm text-black mb-1">Empleado</label>
                                    <input
                                    type="text"
                                    value={empleado}
                                    onChange={(e) => setEmpleado(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={!(idCheck === '1')}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                                <div className="grid col-span-1 place-items-center">
                                    <input 
                                        type="radio" 
                                        name="activaFiltro" 
                                        value="2" 
                                        onChange={(e) => setIdCheck(e.target.value)}
                                        checked={idCheck === '2'}
                                        />
                                </div>
                                <div className="col-span-10">
                                    <div>
                                        <label className="block text-sm text-black mb-1">N° Legajo</label>
                                        <input
                                            type="text"
                                            value={numeroLegajo}
                                            onChange={(e) => setNumeroLegajo(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                            disabled={!(idCheck === '2')}
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
                                        onChange={(e) => setIdCheck(e.target.value)}
                                        checked={idCheck === '3'} 
                                        />
                                </div>
                                <div className="col-span-10">
                                    <div>
                                        <label className="block text-sm text-black mb-1">Documento Identidad</label>
                                        <input
                                            type="text"
                                            value={numeroDocumento}
                                            onChange={(e) => setNumeroDocumento(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                            disabled={!(idCheck === '3')}
                                        />
                                    </div>
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

        {/* Listado de Documentos */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-black mb-4">Listado de Documentos</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-black mb-1">Empleado</label>
              <input
                type="text"
                value={empleadoNombre}
                onChange={(e) => setEmpleadoNombre(e.target.value)}
                disabled={true}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Cargo</label>
              <input
                type="text"
                value={empleadoCargo}
                onChange={(e) => setEmpleadoCargo(e.target.value)}
                disabled={true}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Dependencia</label>
              <input
                type="text"
                value={empleadoDependencia}
                onChange={(e) => setEmpleadoDependencia(e.target.value)}
                disabled={true}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Fecha Ingreso</label>
              <div className="relative">
                <input
                  type="text"
                  value={empleadoFechaIngreso}
                  onChange={(e) => setEmpleadoFechaIngreso(e.target.value)}
                  disabled={true}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  
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
                  <th className="border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-black">Repuesta</th>
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
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.requisitoFiscalizado}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.tipodocumentofoleo}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.descripciondocumento}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.emisor}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.sectorempresa}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.tipoverificacion}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.estado}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.fechaInicio}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{item.fechaFin}</td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{
                        <button 
                        onClick={() => handleEnvioRowClick(item)}
                        >
                          <MdArticle color="blue" size={30} />
                        </button>
                      }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">{
                        item.esnotificacion === '1' &&
                        <button
                        >
                          <MdCircleNotifications color="gray" size={30} />
                        </button>
                      }
                        {item.esnotificacion === '2' &&
                          <button
                          onClick={() => handleNotificacionRowClick(item)}
                          >
                            <MdCircleNotifications color="orange" size={30} />
                          </button>
                        }
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-xs text-black">
                        {
                          item.esrespuesta === '1' &&
                          <button
                          >
                            <MdFactCheck color="gray" size={30} />
                          </button>
                        }
                        {item.esrespuesta === '2' &&
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
          <Envio isEnvioModal={isEnvioModal} onClose={() => setIsEnvioModal(false)} row={selectedDocumento} historico={selectEnvio} selectedDatos={selectedDatosEnvio} />      
          <Notificacion isNotificacionModal={isNotificacionModal} onClose={onCloneNotificacion} row={selectedDocumento} historico={selectNotificacion} isEdit={isEditNotificacion} />      
          <Respuesta isRespuestaModal={isRespuestaModal} onClose={() => setIsRespuestaModal(false)} row={selectedDocumento} isEdit={isEdit} />      
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

export default BandejaDocumentos;