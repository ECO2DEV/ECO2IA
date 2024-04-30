

import { useState } from 'react';
import axios from 'axios';
import { steps, strapiUrl, header } from '../../constants/constans';
import { RenovNavbar } from './RenovNavbar';
import { toast } from 'react-hot-toast';

export default function StepsLayout() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    isLoadingImg: false,
    aiImages: null,
    uploadImgState: null,
    selectFile: null,
    imagePreview: null,
    imageCropped: null,
    crop: null,
    imgSrc: '',
    imageWidth: 0,
    imageHeight: 0,
    aspect: 16 / 9,
    completedCrop: null,
    originalSize: null
  });

  const StepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileSizeInBytes = file.size;
      // Convertir bytes a kilobytes
      const fileSizeInKB = fileSizeInBytes / 1024;
      // Opcional: redondear el tamaño del archivo a 2 decimales
      const roundedFileSizeInKB = Math.round(fileSizeInKB * 100) / 100;

      // console.log('Tamaño de la imagen:', roundedFileSizeInKB, 'KB');
      // console.log('Formato de la imagen:', file.type);

      if (roundedFileSizeInKB > 4096) {
        toast.error('La imagen debe ser menor a 4MB');
        return;
      }

      if (file.type !== 'image/png') {
        toast.error('La imagen debe ser en formato PNG');
        return;
      }
      setFormData((prevState) => ({
        ...prevState,
        uploadImgState: e.target.files[0],
        crop: undefined,
        selectFile: e.target.files[0].name
      }));
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setFormData((prevState) => ({
          ...prevState,
          imgSrc: reader.result?.toString() || '',
          imagePreview: reader.result
        }));

        // Crear un nuevo objeto de imagen para obtener el ancho y el alto
        const img = new Image();
        img.onload = function () {
          setFormData((prevState) => ({
            ...prevState,
            originalSize: {
              ...prevState.originalSize,
              width: this.width,
              height: this.height
            }
          }));
        };
        img.src = reader.result;
      });

      reader.readAsDataURL(e.target.files[0]);
      // add a nextStep after image is uploaded with setTimout
      setTimeout(() => {
        steps[0].status = 'complete';
        steps[1].status = 'current';
        handleNext();
      }, 1000);
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, isLoadingImg: true }));
    const form = new FormData(e.target);
    const imageData = {
      originalImg: formData.imagePreview,
      maskImg: formData.imageCropped,
      numberDesigns: form.get('numberDesigns'),
      roomType: form.get('roomType'),
      aiInterventionType: form.get('aiIntervention'),
      mode: form.get('mode'),
      designStyle: form.get('designStyle')
    };

    try {
      const response = await axios.post(
        `${strapiUrl}/api/openai/renovhome`,
        {
          imageData
        },
        header
      );

      setFormData((prevState) => ({
        ...prevState,
        aiImages: response.data,
      }));

      setTimeout(() => {
        steps[2].status = 'complete';
        steps[3].status = 'current';
        setFormData((prevState) => ({ ...prevState, isLoadingImg: false }));
        handleNext();
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setFormData((prevState) => ({
        ...prevState,
        isLoadingImg: false
      }));
    }
  };

  return (
    <>
     <h1 className="text-5xl text-center  font-semibold dark:text-white">
        Renov Maria 
      </h1>
      <h2 className="text-xl text-center mt-2 font-medium dark:text-white">Tu Asistente de Transformación de Interiores</h2>
     <RenovNavbar setCurrentStep={setCurrentStep} />
      <form onSubmit={onHandleSubmit} className='py-10'>
        <StepComponent
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
          uploadImage={uploadImage}
        />
      </form>
    </>
  );
}
