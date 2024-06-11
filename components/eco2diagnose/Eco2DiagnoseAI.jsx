import StepHeader from './StepHeader';
import { useState } from 'react';
import { stepsDiagnose } from '../../constants/constans';
import { Eco2diagnoseRequest } from '../../util/api/Eco2diagnoseRequest';
import { toast } from 'react-hot-toast';

export const Eco2DiagnoseAI = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    consultation: '',
    file: '',
    result: '',
    isLoading: false,

  });
  const StepComponent = stepsDiagnose[currentStep - 1].component;

  function handleNext (){
    if (currentStep < stepsDiagnose.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function onHandleSubmit(e) {
    e.preventDefault();
    if(formData.consultation === '' || formData.file === ''){
      toast.error('Por favor complete todos los campos');
      return;
    }
    try {
      setFormData(prevFormData => ({ ...prevFormData, isLoading: true }));
      const resp = await Eco2diagnoseRequest({
        consultation: formData.consultation,
        file: formData.file,
        user: props.user
      });

      
      setFormData(prevFormData => ({ ...prevFormData, result: resp.data.result}));

      if(resp.status === 200){
        toast.success('Resultado obtenido correctamente');
        setTimeout(() => {
        handleNext();
      }, 1000);
      }
     
    } catch (error) {
      console.error(`Error getting prompt for ${strapiUrl}:`, error);
      toast.error('Error al obtener el resultado');
    } finally {
      setFormData(prevFormData => ({ ...prevFormData, isLoading: false }));
    }
  }




  return (
    <section className="flex justify-center items-center h-screen w-full">
      <div className='sm:min-w-[60%]'>
        <StepHeader currentStep={currentStep} handleNext={handleNext} handleBack={handleBack} />
        <form onSubmit={onHandleSubmit} 
        className='w-full'
          >
          <StepComponent
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </form>
      </div>
    </section>
  );
};
