
interface ConvocatoriaProps {
    isConvocatoriaOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
}
const Convocatoria: React.FC<ConvocatoriaProps> = ({ isConvocatoriaOpen, onClose, pdfUrl }) => {
  if (!isConvocatoriaOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          ✖
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full rounded"
        />
      </div>
    </div>
  );
};

export default Convocatoria;