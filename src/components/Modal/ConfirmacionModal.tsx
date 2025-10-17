import React from "react";
import { X } from "lucide-react";

interface EstadoProps {
    title: string;
    text: string;
    onClose: () => void;
}

const ConfirmacionModal: React.FC<EstadoProps> = ({ title, text, onClose  }) => {

    const onCloseModal = () => {
        onClose()
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-hidden">
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
                    <h3 className="text-lg font-semibold text-white">
                        {title}
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
                    <div className="gap-4 mb-6">
                        {text}
                        
                    </div>
                    <div className="flex justify-center space-x-3 mt-6">
                        <button 
                        onClick={onCloseModal}
                        className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionModal;