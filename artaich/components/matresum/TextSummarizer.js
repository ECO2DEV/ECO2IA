import { useContext, useEffect, useState } from "react";
import { AUTO_LANGUAGE } from "../../constants/constans";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { PromptContext } from "../../context/prompts/PromptContext";
import { UserContext } from "../../context/user/UserContext";
import { DataMattResume } from "../../data/mattresume";
import { MattResumResp } from "../../util/api/MattResumResp";
import { ClipboardIcon } from "../icons/icons";
import { ButtonHistory } from "./ButtonHistory";
import HistoryResum from "./HistoryResum";
import ExportPDF from "./ExportPDF";
import mammoth from "mammoth";
import ShareModal from "./ShareModal";

import {
  DocumentArrowDownIcon,
  // DocumentIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
import { Popover, Transition } from "@headlessui/react";

// Import PDFDownloadLink separately before the component definition
const PDFDownloadLink = dynamic(
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
  const [fileContent, setFileContent] = useState(null); // Contenido del archivo cargado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga de la solicitud
  const [modalOpen, setModalOpen] = useState(false); // Estado de abrir el modal de historial
  const [showShare, setShowShare] = useState(false);

  // Contextos utilizados
  const {
    setPrompt,
    prompt,
    setResponse,
    setPromptTokens,
    promptTokens,
    activeAI,
    setActiveAI,
  } = useContext(PromptContext);
  const { user } = useContext(UserContext); // Contexto del usuario

  // Handler para cambiar el estado de showShare
  const toggleShare = () => {
    setShowShare(!showShare);
  };

  useEffect(() => {
    if (activeAI !== "TextSummarizerAI") {
      setPrompt("");
      setPromptTokens(0);
    }
    setActiveAI("TextSummarizerAI");
  }, []);

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
      if (!acceptedFiles.length) {
        throw new Error("No se ha seleccionado ningun archivo.");
      }
      if (acceptedFiles.length === 0) {
        throw new Error(DataMattResume.NoFileSelected);
      }

      const file = acceptedFiles[0];
      const isValidDocx = /\.docx$/i.test(file.name);
      if (!isValidDocx) {
        throw new Error("File must be .docx");
      }
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        throw new Error(DataMattResume.FileDoc);
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await convertDocToPlainText(arrayBuffer);
        setFileContent(result);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("El archivo debe ser de tipo Docx");
    } finally {
      setIsUploading(false);
    }
  };

  // extraer el texto plano del archivo .doc
  const convertDocToPlainText = async (arrayBuffer) => {
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
      toast.error("Veuillez taper quelque chose avant de soumettre"); // Verifica que se haya ingresado texto antes de enviar la solicitud
      toast.error(DataMattResume.PleaseTypeSomething); // Verifica que se haya ingresado texto antes de enviar la solicitud
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
        toast.error(DataMattResume.AnErrorOcurred);
        console.error("Error:", error);
        toast.error(DataMattResume.AnErrorOcurred);
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
          toast.success(DataMattResume.CopiedSuccess);
        })
        .catch(() => {
          toast.error(DataMattResume.CopiedFailed);
        });
    } else {
      toast.error(DataMattResume.NoText);
    }
  };

  // Configuración del useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/msword": [".docx", ".doc"],
    },
  });

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-6/12 h-full flex-grow -mr-1">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
          <textarea
            className="w-full p-4 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            value={fileContent || inputText}
            onChange={handleTextChange}
            placeholder={DataMattResume.WriteText}
            style={{
              overflow: "hidden",
            }}
          />
          <div
            className="w-full h-40 flex flex-col items-center justify-center text-blue-400 px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 hover:bg-blue-500 cursor-pointer hover:text-white"
            {...getRootProps()}
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <p>{DataMattResume.DropField}</p>
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
              <option value={AUTO_LANGUAGE}>
                {DataMattResume.SelectLanguage}
              </option>
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
          <div className="flex justify-center items-center my-2 text-gray-900">
            <span>
              Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12 px-4 mt-4 md:mt-0">
        <div className="bg-white rounded-lg shadow-lg p-4 relative">
          <textarea
            className="w-full text-justify p-4 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400"
            style={{ minHeight: "44rem" }}
            value={summaryText}
            readOnly
            placeholder={DataMattResume.ResumeHere}
          />
          {summaryText && (
            <div className="absolute bottom-[1rem] right-[1.5rem]">
              <button className="text-white rounded" onClick={handleCopy}>
                <ClipboardIcon />
              </button>
            </div>
          )}
        </div>
        <div className="my-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol
              role="list"
              className="flex w-full justify-around rounded-md bg-gray-50 shadow"
            >
              <li onClick={handleModalHistory} className="flex items-center text-gray-500 hover:text-gray-800 sm:hover:text-gray-500 cursor-pointer">
                <ButtonHistory
                  className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents" title="Historique">
                  {DataMattResume.History}
                </span>
              </li>
              <PDFDownloadLink
                className={!summaryText ? "opacity-50 pointer-events-none" : ""}
                document={<ExportPDF summaryText={summaryText} />}
                fileName="MATTRESUME.pdf"
              >
                <li className="flex items-center">
                  <svg
                    className="h-full text-xs w-5 flex-shrink-0 text-gray-500"
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
                      <span className="hidden sm:contents">
                        {DataMattResume.PDFButton}
                      </span>
                    </div>
                  </button>
                </li>
              </PDFDownloadLink>
              {/* <li className="flex items-center">
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
                        <span className="hidden sm:contents">
                          {' '}
                          {DataMattResume.WordButton}{' '}
                        </span>
                      </div>
                    </button>
                  </li> */}
              <li className="flex items-center">
                <svg
                  className="h-full text-xs w-5 flex-shrink-0 text-gray-500"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        onClick={toggleShare}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800"
                      >
                        <div className="flex justify-center items-center">
                          <ShareIcon
                            className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="hidden sm:contents">
                            {DataMattResume.ShareButton}
                          </span>
                        </div>
                      </Popover.Button>
                      <Transition
                        show={showShare}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                      >
                        <Popover.Panel className="absolute bottom-8 right-0 flex items-center z-10 p-4 w-14 bg-white rounded-lg shadow-lg">
                          {showShare && (
                            <ShareModal summaryText={summaryText} />
                          )}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {modalOpen && <HistoryResum onClose={handleModalHistory} />}
    </div>
  );
}

export default TextSummarizerPage;
