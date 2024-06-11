
import {useDropzone} from 'react-dropzone';
import {  DownloadICon, MagicAiIcon } from '../icons/icons';
import Loader  from '../loader/loader';
import { ConvertDocToPlainText } from '../../util/helpers/ConvertDocToPlainText';
import { toast } from 'react-hot-toast';


export const DropfileDiagnose = ({setFormData, formData}) => {




  const handleDrop = async (acceptedFiles) => {
    setFormData({ ...formData, isLoading: true});

    try {
      if (!acceptedFiles.length) {
        throw new Error("No file uploaded.");
      }
      if (acceptedFiles.length === 0) {
        throw new Error("No file uploaded.");
      }

      const file = acceptedFiles[0];
      const isValidDocx = /\.docx$/i.test(file.name);
      if (!isValidDocx) {
        throw new Error("Invalid file type. Please upload a .docx file.");
      }
      if (
        file.type !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        throw new Error("Invalid file type. Please upload a .docx file.");
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await ConvertDocToPlainText(arrayBuffer);

        // console.log("result", result)
        setFormData({ ...formData, file: result });
      };
      toast.success("Archivo cargado correctamente");
      

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error("Error: " + error.message);
    } finally {
      setFormData({ ...formData, isLoading: false});
    }
  }

  const { getRootProps, getInputProps} = useDropzone({
    onDrop: handleDrop,
    disabled: formData.isLoading,
    accept: {
      'application/msword': ['.docx', '.doc']
    }
  });
 
  // console.log("formData", formData.file)

  return (
    <>
      <h3 className="text-xl text-left my-4">{
        formData.file ? 'Archivo cargado con éxito👍' : 'Cargar archivo (.docx, .doc) '
      }</h3>
      <div
        className="flex flex-col items-center cursor-pointer  border border-dashed border-gray-900 dark:border-gray-100 hover:border-eco2HoverColor dark:hover:border-eco2MainColor h-20 rounded-lg  focus:outline-none transition-all duration-300 px-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <DownloadICon />
        <p className="text-zinc-800 dark:text-white">
          Arrastra y suelta el archivo aquí o
        </p>
        <p className="text-zinc-800 dark:text-white">
          haz click para seleccionar un archivo
        </p>
      </div>
      {formData?.file && (
        <button
          disabled={formData.isLoading}
          className="mt-4 p-2 rounded-full bg-eco2MainColor w-full flex justify-center hover:opacity-75 transition-opacity duration-200"
          type="submit"
        >
          {formData.isLoading ? <Loader /> : <MagicAiIcon />}
        </button>
      )}
    </>
  );
}
