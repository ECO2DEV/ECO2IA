import React, { useContext, useState } from "react";
import { AUTO_LANGUAGE } from "../../constants/constans";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { PromptContext } from "../../context/prompts/PromptContext";
import { UserContext } from "../../context/user/UserContext";
import { DataMattResume } from "../../data/mattresume";
import { useMatResume } from "../../hooks/useMattResume";
import { MattResumResp } from "../../util/api/MattResumResp";
import { ClipboardIcon } from "../icons/icons";
import { ButtonHistory } from "./ButtonHistory";
import HistoryResum from "./HistoryResum";
import ExportPDF from "./ExportPDF";
import mammoth from "mammoth";
import {
  DocumentArrowDownIcon,
  DocumentIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";

// Import PDFDownloadLink separately before the component definition
const PDFDownloadLinkDynamic = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

function TextSummarizerPage() {
  // Estados del componente
  const [inputText, setInputText] = useState(""); // Texto de entrada
  const [language, setLanguage] = useState(""); // Estado del idioma seleccionado
  const [summaryText, setSummaryText] = useState(""); // Texto de resumen
  const [isUploading, setIsUploading] = useState(false); // Estado de carga de archivos
  const [fileContent, setFileContent] = useState(""); // Contenido del archivo cargado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga de la solicitud
  const [modalOpen, setModalOpen] = useState(false); // Estado de abrir el modal de historial

  // Contextos utilizados
  const { setPrompt, prompt, setResponse, setPromptTokens } =
    useContext(PromptContext);
  const { user } = useContext(UserContext); // Contexto del usuario

  // Custom hooks utilizados
  // const { data } = useMatResume(user); // Custom hook para manejar datos relacionados con el usuario

  // Manejador de cambios en el texto de entrada
  const handleTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    const maxHeight = 350; // Establece el valor máximo de altura deseado en píxeles
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
      toast.error("Please type something before submit"); // Verifica que se haya ingresado texto antes de enviar la solicitud
    } else {
      setIsLoading(true); // Activar el loader
      try {
        const response = await MattResumResp({
          prompt: inputText || fileContent,
          language: language,
          user: user,
        });
        setResponse(response?.data?.data);
        setSummaryText(response?.data?.data); // Establece el resumen recibido en el estado summaryText
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred");
      } finally {
        setIsLoading(false); // Desactivar el loader
      }
    }
  };

  const handleModalHistory = () => {
    setModalOpen((prev) => !prev);
  };

  // Manejador de copia del resumen al portapapeles
  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          toast.success("Copied successfully");
        })
        .catch(() => {
          toast.error("Copy failed");
        });
    } else {
      toast.error("No text to copy");
    }
  };

  // Configuración del useDropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="container mx-auto py-5 min-h-screen">
    <h1 className="text-2xl font-bold text-center mb-8">
        {DataMattResume.Title}
      </h1>
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-6/12 h-full flex-grow -mr-1">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <textarea
              className="w-full p-4 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              value={fileContent || inputText}
              onChange={handleTextChange}
              placeholder="Write your text here..."
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
                <p className="text-gray-500">{DataMattResume.LoadingField}</p>
              ) : (
                <p className="text-gray-500">{DataMattResume.DropField}</p>
              )}
            </div>
            <div className="my-4">
              <select
                id="language"
                name="language"
                value={language}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value={AUTO_LANGUAGE}>{DataMattResume.SelectLanguage}</option>
                <option value="english">{DataMattResume.English}</option>
                <option value="spanish">{DataMattResume.Spanish}</option>
                <option value="french">{DataMattResume.French}</option>
                <option value="german">{DataMattResume.Deutsch}</option>
                <option value="italian">{DataMattResume.Italian}</option>
              </select>
            </div>
            <button
              className="mt-auto w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 relative"
              onClick={handleRequestSummary}
              disabled={isLoading} // Deshabilita el botón mientras isLoading sea true
            >
              {isLoading ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6-3.309 0-6-2.691-6-6H6c0 4.411 3.589 8 8 8v-2.709z"
                    ></path>
                  </svg>
                </span>
              ) : null}
              {DataMattResume.CreateResume}
            </button>
          </div>
        </div>
        <div className="w-full md:w-6/12 px-4 mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-lg p-4 relative">
            <textarea
              className="w-full text-justify p-4 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400"
              style={{ minHeight: "44rem" }}
              value={summaryText}
              readOnly
              placeholder="Your summarized text will appear here..."
            />
            <div className="my-4">
              <nav className="flex" aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex w-full justify-around space-x-4 rounded-md bg-gray-50 px-6 shadow"
                >
                  <li className="flex items-center">
                    <ButtonHistory
                      className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                      aria-hidden="true"
                      onClick={handleModalHistory}
                    />
                    <span className="hidden sm:contents"> </span>
                  </li>
                  <PDFDownloadLinkDynamic
                    document={<ExportPDF summaryText={summaryText} />}
                    fileName="TextSumarizer.pdf"
                  >
                    <li className="flex items-center">
                      <svg
                        className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
                        <div className="flex justify-center items-center">
                          <DocumentArrowDownIcon
                            className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="hidden sm:contents"> PDF </span>
                        </div>
                      </button>
                    </li>
                  </PDFDownloadLinkDynamic>
                  <li className="flex items-center">
                    <svg
                      className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
                      viewBox="0 0 24 44"
                      preserveAspectRatio="none"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                    </svg>
                    <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
                      <div className="flex justify-center items-center">
                        <DocumentIcon
                          className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="hidden sm:contents"> Word </span>
                      </div>
                    </button>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
                      viewBox="0 0 24 44"
                      preserveAspectRatio="none"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                    </svg>
                    <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
                      <div className="flex justify-center items-center">
                        <ShareIcon
                          className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="hidden sm:contents"> Share </span>
                      </div>
                    </button>
                  </li>
                </ol>
              </nav>
            </div>
            {summaryText && (
              <div className="absolute bottom-[6rem] right-[1.5rem]">
                <button className="text-white rounded" onClick={handleCopy}>
                  <ClipboardIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalOpen && <HistoryResum onClose={handleModalHistory} />}
    </div>
  );
}

export default TextSummarizerPage;
