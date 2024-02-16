

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import axios from 'axios';
import { steps, classNames, strapiUrl, header } from '../../constants/constans';


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
      <nav className="mb-10">
        <ol
          role="list"
          className="flex items-center mt-8 py-4 min-h-full justify-center pt-10"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'pr-20 sm:pr-40' : '',
                'relative'
              )}
            >
              {step.status === 'complete' ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-neutral-600" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-500"
                  >
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-gray-200" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-800 bg-white"
                    aria-current="step"
                  >
                    <motion.span
                      layoutId="underline"
                      className=" underline h-2.5 w-2.5 rounded-full bg-neutral-800"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
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
