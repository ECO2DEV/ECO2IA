import { useContext, useState } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import {useDropzone} from 'react-dropzone';
import {  ClipIcon } from '../icons/icons';
import { ConvertDocToPlainText } from '../../util/helpers/ConvertDocToPlainText';
import { toast } from 'react-hot-toast';

import { DataEco2Resume } from '../../data/eco2resume';

export const Dropfile = () => {

  const { setPrompt } = useContext(PromptContext);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    setIsUploading(true);

    try {
      if (!acceptedFiles.length) {
        throw new Error(DataEco2Resume.PickError);
      }
      if (acceptedFiles.length === 0) {
        throw new Error(DataEco2Resume.NoFileSelected);
      }

      const file = acceptedFiles[0];
      const isValidDocx = /\.docx$/i.test(file.name);
      if (!isValidDocx) {
        throw new Error(DataEco2Resume.MustBeFileError);
      }
      if (
        file.type !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        throw new Error(DataEco2Resume.FileDoc);
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await ConvertDocToPlainText(arrayBuffer);
        setPrompt(result);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(DataEco2Resume.MustBeFileError);
    } finally {
      setIsUploading(false);
    }
  }

  const { getRootProps, getInputProps} = useDropzone({
    onDrop: handleDrop,
    accept: {
      'application/msword': ['.docx', '.doc']
    }
  });
 


  return (

      <div className=" cursor-pointer  absolute bottom-4 right-20 focus:outline-none" {...getRootProps()}>
        <input {...getInputProps()} />
        <ClipIcon className='text-white hover:text-eco2MainColor transition-all duration-200' />
      </div>
     

  );
}
