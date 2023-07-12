// components/matresum/TextSummarizer.js
import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { PromptContext } from "../../context/prompts/PromptContext";
import { UserContext } from "../../context/user/UserContext";
import { DataMattDescription } from "../../data/mattdescription";
import { useMatResume } from "../../hooks/useMattResume";
import { MattResumResp } from "../../util/api/MattResumResp";
import { ClipboardIcon } from "../icons/icons";
import mammoth from "mammoth";

function TextSummarizerPage() {
  // Estados del componente
  const [inputText, setInputText] = useState(""); // Texto de entrada
  const [language, setLanguage] = useState(""); // Estado del idioma seleccionado
  const [summaryText, setSummaryText] = useState(""); // Texto de resumen
  const [isUploading, setIsUploading] = useState(false); // Estado de carga de archivos
  const [fileContent, setFileContent] = useState(""); // Contenido del archivo cargado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga de la solicitud
  const [error, setError] = useState(""); // Mensaje de error

  // Contextos utilizados
  const { setPrompt, prompt, setResponse, setPromptTokens } =
    useContext(PromptContext);
  const { user } = useContext(UserContext); // Contexto del usuario

  // Custom hooks utilizados
  const { data, mutate } = useMatResume(user); // Custom hook para manejar datos relacionados con el usuario

  // Manejador de cambios en el texto de entrada
  const handleTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    const maxHeight = 400;
    if (event.target.scrollHeight > maxHeight) {
      event.target.style.height = `${maxHeight}px`;
      event.target.style.overflowY = "scroll";
    }
    setPrompt(text);
  };

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  // Manejador de eventos al soltar un archivo en la zona de carga
  const handleDrop = async (acceptedFiles) => {
    setIsUploading(true);

    try {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await convertDocToPlainText(arrayBuffer);
        setFileContent(result);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  // extraer el texto plano del archivo .doc
  const convertDocToPlainText = (arrayBuffer) => {
    return new Promise((resolve, reject) => {
      const options = {
        convertImage: mammoth.images.imgElement(function (image) {
          return image.read("base64");
        }),
      };

      mammoth
        .extractRawText({ arrayBuffer }, options)
        .then((result) => {
          resolve(result.value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Manejador de la solicitud de resumen
  const handleRequestSummary = async () => {
    if (!prompt && !fileContent) {
      setError("Please type something before submit"); // Verifica que se haya ingresado texto antes de enviar la solicitud
    } else {
      setIsLoading(true);
      try {
        const response = await MattResumResp({
          prompt: inputText || fileContent,
          language: language,
          user: user,
        });
        setResponse(response?.data?.data);
        console.log(response?.data?.data);
        setSummaryText(response?.data?.data); // Establece el resumen recibido en el estado summaryText
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Manejador de copia del resumen al portapapeles
  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          toast.success(DataMattDescription.CopiedSuccess);
        })
        .catch(() => {
          toast.error(DataMattDescription.CopiedFailed);
        });
    } else {
      toast.error(DataMattDescription.NoText);
      console.log(handleCopy);
    }
  };

  // Configuración del useDropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="container mx-auto py-5 h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-6/10 h-full flex-grow -mr-1">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <textarea
              className="w-full p-4 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              value={fileContent || inputText}
              onChange={handleTextChange}
              placeholder="Écrivez votre texte ici"
              style={{
                resize: "none",
                overflow: "hidden",
              }}
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
                <p className="text-gray-500">
                  Glissez et déposez les fichiers ici.
                </p>
              )}
            </div>
            <div className="mb-4">
              <select
                id="language"
                name="language"
                value={language}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value=""> {DataMattDescription.SelectLanguage} </option>
                <option value="english"> {DataMattDescription.English} </option>
                <option value="spanish"> {DataMattDescription.Spanish} </option>
                <option value="french"> {DataMattDescription.French} </option>
                <option value="german"> {DataMattDescription.Deutsch} </option>
                <option value="italian"> {DataMattDescription.Italian} </option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-auto w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleRequestSummary}
            >
              {isLoading ? "cargando" : "Créer un résumé"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {data && data.length > 0 && (
              <>
                {data.map((item) => (
                    <p className="text-center">
                      {item.summary}
                    </p>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-screen md:w-6/10 px-4 mt-4 md:mt-0 h-full flex-grow">
          <div className="bg-white rounded-lg shadow-lg p-4 h-full -ml-2 relative">
            <textarea
              className="w-full p-4 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ height: "calc(100% - 2.5rem)" }}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              placeholder="Votre résumé créé par MattResum apparaîtra ici."
            />
            {summaryText && (
              <button
                className="absolute bottom-2 right-2 px-4 text-white rounded"
                onClick={handleCopy}
              >
                <ClipboardIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextSummarizerPage;
