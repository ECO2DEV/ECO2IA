import { useState, useEffect } from 'react';

import { sendTrainingPlanRequest } from '../../util/api/sendTrainingPlanRequest';
import { SportCoachResults } from './Eco2SportCoachResults';

import { toast } from 'react-hot-toast';

import { fetchDataExerciseDB } from '../../util/api/SportFetch';
import { exerciseUrl } from '../../util/api/SportFetch';

import { useLocalStorageWithExpiration } from '../../hooks/useLocalStorageWithExpiration';
import StepGym from './StepGym';
import { stepsGym } from '../../constants/constans';
import { RightSection } from './steps/RightSection';
import { LeftSimpleIcon } from '../icons/icons';

export const SportCoachIA = (props) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    trainingDays: '1',
    goal: '',
    submitting: false,
    error: ''
  });

  const user = props.user;

  const [storedValue, setStoredValue] = useLocalStorageWithExpiration({
    key: 'exercises',
    initialValue: null
  });

  const [localStoreValue, setLocalStoreValue] = useLocalStorageWithExpiration({
    key: 'execResponse',
    initialValue: null
  });

  const [userDetails, setUserDetails] = useLocalStorageWithExpiration({
    key: 'userDetails',
    initialValue: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const StepComponent = stepsGym[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 1) {
      stepsGym[0].status = 'complete';
      stepsGym[1].status = 'current';
    }
    if (currentStep === 2) {
      stepsGym[1].status = 'complete';
      stepsGym[2].status = 'current';
    }
    if (currentStep === 3) {
      stepsGym[2].status = 'complete';
      stepsGym[3].status = 'current';
    }
    if (currentStep === 4) {
      stepsGym[3].status = 'complete';
      stepsGym[4].status = 'current';
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    if (currentStep === 2) {
      stepsGym[0].status = 'current';
      stepsGym[1].status = 'upcoming';
    }
    if (currentStep === 3) {
      stepsGym[1].status = 'current';
      stepsGym[2].status = 'upcoming';
    }
    if (currentStep === 4) {
      stepsGym[2].status = 'current';
      stepsGym[3].status = 'upcoming';
    }
    if (currentStep === 5) {
      stepsGym[3].status = 'current';
      stepsGym[4].status = 'upcoming';
    }
  };

  const [responseObj, setResponseObj] = useState(null);

  useEffect(() => {
    if (localStoreValue) {
      setResponseObj(localStoreValue);
    }
  }, [localStoreValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchData();

    if (!storedValue) {
      const respo = await fetchDataExerciseDB(
        `${exerciseUrl}/exercises?limit=1300`
      );
      setStoredValue(respo);
    }
  };

  async function fetchData() {
    if (
      !formData.goal ||
      !formData.weight ||
      !formData.height ||
      !formData.age
    ) {
      setFormData({
        ...formData,
        error: 'Por favor, complete todos los campos'
      });
      toast.error('Por favor, complete todos los campos');
    } else {
      setFormData({ ...formData, submitting: true });
      setUserDetails({
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        goal: formData.goal,
        trainingDays: formData.trainingDays
      });
      sendTrainingPlanRequest({
        weight: formData.weight,
        age: formData.age,
        height: formData.height,
        goal: formData.goal,
        trainingDays: formData.trainingDays,
        language: 'Spanish',
        user
      })
        .then((response) => {
          setResponseObj(response?.data?.data);
          if (response?.data?.data) {
            setLocalStoreValue(response?.data?.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setFormData({
            ...formData,
            error: 'Se produjo un error al recuperar los datos'
          });
        })
        .finally(() => {
          setFormData({ ...formData, submitting: false });
        });
    }
  }

  return (
    <>
      <div className="relative mt-4 md:mt-8 lg:max-w-[60rem] xl:max-w-[90rem] mx-auto p-6  rounded-lg ">
        <h1 className="text-5xl text-center mb-[40px] font-semibold dark:text-white">
          María: Tu entrenadora personal
        </h1>
        {!responseObj ? (
          <StepGym setCurrentStep={setCurrentStep} />
        ) : (
          <div className="flex justify-center h-fit">
            <div className="md:mt-8 w-full h-fit">
              <SportCoachResults user={user} responseObj={responseObj} />
              {userDetails?.goal && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2  items-center pl-6 [&>p]:bg-darkColor [&>p]:dark:bg-opacity-0 [&>p]:dark:border [&>p]:dark:border-lightColor [&>p]:text-white [&>p]:rounded-2xl [&>p]:p-2">
                  <h2 className="uppercase p-2 rounded-xl text-left bg-eco2MainColor">
                    Datos de usuario
                  </h2>
                  <p>
                    Peso: <span>{userDetails.height}</span>
                  </p>
                  <p>
                    Altura: <span>{userDetails.weight}</span>
                  </p>
                  <p>
                    Edad: <span>{userDetails.age}</span>
                  </p>
                  <p>
                    Días de entrenamiento:{' '}
                    <span>{userDetails.trainingDays}</span>
                  </p>
                  <p>
                    <span>{userDetails.goal}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-lg  p-4 mt-10 max-w-4xl w-full mx-auto">
          <section className="flex flex-col sm:flex-row  sm:justify-center gap-8 relative">
            <form
              onSubmit={handleSubmit}
              className="w-full  flex justify-center"
            >
              <StepComponent
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                currentStep={currentStep}
              />
            </form>

            <RightSection currentStep={currentStep} handleNext={handleNext} />
            <div
              className="absolute top-10 left-0 sm:top-0"
              onClick={handleBack}
            >
              <LeftSimpleIcon
                className={`w-10 h-10 hover:animate-pulse cursor-pointer hover:scale-125 transition-all duration-200 ${
                  currentStep === 1 && 'hidden'
                }`}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
