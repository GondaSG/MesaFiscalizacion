import React from 'react';
import { X } from 'lucide-react';
import { ProcesoFiscalizado } from '../../Interfaces/ProcesoFiscalizado';
import { MdArticle } from "react-icons/md";
import { saveInformeNoConforme ,obtenerDocumento,saveInformeConforme } from '../../api/procesoFiscalizadoApi';
import Convocatoria from './convocatoria';
interface RespuestaProps {
    isRespuestaModal: boolean;
    onClose: () => void;
    row: ProcesoFiscalizado;
    isEdit: boolean;
    // You can add more props as needed
}
const Respuesta: React.FC<RespuestaProps> = ({ isRespuestaModal, onClose, row, isEdit }) => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    const [estadoRespuesta, setEstadoRespuesta] = React.useState<string>('');
    const [documentoInforme, setDocumentoInforme] = React.useState<string>('');
    const [fechaInforme, setFechaInforme] = React.useState<string>(fechaFormateada);
    const [observacion, setObservacion] = React.useState<string>('');
    const [file, setFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [rutaDocumento, setRutaDocumento] = React.useState<string>('');
    const handleFileChange = (e:any) => {
        setFile(e.target.files[0]);
        setMessage("");
    };
    const uploadingClick = async (item:ProcesoFiscalizado) => {
         const response =await obtenerDocumento(item.id)
         const url = URL.createObjectURL(response);
         setIsModalOpen(true);
         setRutaDocumento(url);
    };
    const cleanControls = ()=> {
        setEstadoRespuesta('');
        setObservacion('');
        setFechaInforme('');
        setDocumentoInforme('');
        setFile(null);
        setMessage(""); 
    }
    const onCloseModal = () => {
        cleanControls();
        onClose();
    };
    console.log(estadoRespuesta);
    const handleClick = async (item: ProcesoFiscalizado) => {
        if (estadoRespuesta === '') {
            setMessage("Por favor, seleccione un estado de respuesta.");
            return;
        }
        if (estadoRespuesta === 'NO CONFORME') {
            if (!file) {
                setMessage("Por favor, selecciona un archivo primero.");
                return;
            }
            const resp = {
                id: item.id,
                resultadoId: estadoRespuesta,
                fechaInforme: fechaInforme,
                observacion: observacion
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("metadata", JSON.stringify(resp));
            try {
                setUploading(true);
                const response = await saveInformeNoConforme(formData)
                console.log(`✅ Archivo subido correctamente: ${response?.data?.fileName}`);
                return
            } catch (error) {
                console.error(error);
                setMessage("❌ Error al subir el archivo.");
            } finally {
                setUploading(false);
            }
        }else {
            const resp = {
                id: item.id,
                resultadoId: estadoRespuesta,
                observacion: observacion
            }
            const response = await saveInformeConforme(resp) 
            console.log(`✅ Archivo subido correctamente: ${response?.mensaje}`);
        }
        cleanControls();
        onClose();
    };
    const styles = {
  container: {
    border: "2px dashed #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "350px",
    margin: "30px auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
  },
};
    if (!isRespuestaModal) return null;
    //console.log(compareDateToDate(row.fecha));
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        Respuesta de Documento
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
                            <label className="block text-sm font-medium text-black mb-1">Documento</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.descripciondocumento}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Entidad</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.emisor}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Plazo de Espera</label>

                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.fechaInicio}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">¿Recibió Respuesta?</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={'SI'}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Fecha de Respuesta</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.fechaFin}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Tipo Documento</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.subtipoverificacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="blocks text-sm font-medium text-black mb-1">Documento Respuesta</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={row.documentoRecibido}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="blocks text-sm font-medium text-black mb-1">Resultado</label>
                        </div>
                        {isEdit ? (
                            <div className="flex flex-col">
                                <select
                                    onChange={(e) => {
                                        setEstadoRespuesta(e.target.options[e.target.selectedIndex].text)
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option value="" >Seleccione</option>
                                    <option value="1">CONFORME</option>
                                    <option value="2">NO CONFORME</option>
                                </select>
                            </div>
                        ):(
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={estadoRespuesta || row.estado}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    disabled={true}
                                />
                            </div>
                        )
                        
                        }

                    </div>
                        {(isEdit && estadoRespuesta === 'NO CONFORME') && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium text-black mb-1">Fecha de Informe</label>
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="date"
                                            value={fechaInforme}
                                            onChange={(e) => setFechaInforme(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                        )}
                        {!isEdit && row.estado === 'NO CONFORME' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                            <label className="block text-sm font-medium text-black mb-1">Fecha de Informe</label>
                                        </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        value={row.fechaInforme}
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        )}
                        {(isEdit && estadoRespuesta === 'NO CONFORME') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Documento Informe</label>
                                </div>  
                                <div className="flex flex-col">
                                    <input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={styles.input}
                                    accept=".csv,.pdf,.jpg,.png,.docx"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}
                        {!isEdit && row.estado === 'NO CONFORME' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-black mb-1">Documento Informe</label>
                                </div>
                                <div className="flex flex-col">
                                    <div className="grid grid-cols-1 md:grid-cols-11">
                                        <div className="grid col-span-10 place-items-center  ">
                                                <input
                                                type="text"
                                                value={row.documentoCargado || documentoInforme}
                                                onChange={(e) => setDocumentoInforme(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                disabled={true}
                                                />
                                        </div>
                                        <div className="grid col-span-1">
                                            <button 
                                                onClick={()=> uploadingClick(row)}
                                                disabled={uploading}
                                            >
                                            <MdArticle color="orange" size={30} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-1">Observaciones</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                onChange={(e) => setObservacion(e.target.value)}
                                value={observacion || row.observacion}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                disabled={!isEdit}
                            />
                        </div>
                    </div>
                    <Convocatoria isConvocatoriaOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pdfUrl={rutaDocumento} />
                    <div className="flex justify-center space-x-3 mt-6">
                        <button
                            onClick={onCloseModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            Cancelar
                        </button>
                        <button
                            onClick={()=>handleClick(row)}
                            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Respuesta;