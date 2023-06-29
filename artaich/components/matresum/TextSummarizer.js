import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { MattResumResp } from "../../util/api/MattResumResp";
import { UserContext } from "../../context/user/UserContext";
import { PromptContext } from "../../context/prompts/PromptContext";
import { useMatResume } from "../../hooks/useMattResume";

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
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const { setPrompt, prompt, setResponse, setPromptTokens } =
    useContext(PromptContext);
  const { user } = useContext(UserContext);

  const { data, mutate } = useMatResume(user);

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

  const handleRequestSummary = async () => {
    if(!prompt) {
      setError('Please type something before submit');
    } else {
      setIsLoading(true);
      // Realiza la llamada a la API para obtener el resumen
    }
      MattResumResp({
        prompt: inputText,
        language: "english",
        user: user,
      })
        .then((response) => {
          setResponse(response?.data?.data);
        })
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <textarea
              className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fileContent || inputText}
              onChange={handleTextChange}
              placeholder="Escribe tu texto aquí"
            />
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
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleRequestSummary}
            >
              Enviar solicitud
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <textarea
              className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={summaryText}
              readOnly
              placeholder="Resultado del resumen"
            />
            {summaryText && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCopySummary}
              >
                Copiar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextSummarizerPage;
