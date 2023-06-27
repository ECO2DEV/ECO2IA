import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// Página del componente TextSummarizerPage
function TextSummarizerPage() {
  // Estado para el texto de entrada
  const [inputText, setInputText] = useState("");
  // Estado para el texto del resumen
  const [summaryText, setSummaryText] = useState("");
  // Estado para indicar si se está cargando un archivo
  const [isUploading, setIsUploading] = useState(false);
  // Estado para el contenido del archivo
  const [fileContent, setFileContent] = useState("");

  // Maneja el cambio de texto
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  // Maneja el evento de arrastrar y soltar archivos
  const handleDrop = (acceptedFiles) => {
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      setIsUploading(false);
    };

    reader.readAsText(acceptedFiles[0]);
  };

  // Maneja la solicitud de resumen
  const handleRequestSummary = () => {
    // Lógica para enviar la solicitud de resumen
  };

  // Maneja la copia del resumen al portapapeles
  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
  };

  // Configuración del hook useDropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Textarea para ingresar el texto */}
      <textarea
        className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={fileContent || inputText}
        onChange={handleTextChange}
        placeholder="Escribe tu texto aquí"
      />
      {/* Área para arrastrar y soltar archivos */}
      <div
        className={`w-full h-40 flex items-center justify-center border border-dashed rounded mt-4 ${
          isUploading ? "bg-gray-200" : ""
        }`}
        {...getRootProps()}
      >
        {isUploading ? (
          <p className="text-gray-500">Cargando archivo...</p>
        ) : (
          <p className="text-gray-500">Arrastra y suelta archivos aquí</p>
        )}
      </div>
      {/* Botón para enviar la solicitud de resumen */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleRequestSummary}
      >
        Enviar solicitud
      </button>
      {/* Textarea para mostrar el resultado del resumen */}
      <textarea
        className="w-full p-4 rounded border mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={summaryText}
        readOnly
        placeholder="Resultado del resumen"
      />
      {/* Botón para copiar el resumen al portapapeles */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleCopySummary}
      >
        Copiar
      </button>
    </div>
  );
}

export default TextSummarizerPage;
