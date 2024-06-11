import { toast } from 'react-hot-toast';

export const Consult = ({ formData, setFormData, handleNext }) => {


  function onHandleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      consultation: e.target.value
    }));
    if (e.target.value !== 'select option') {
      toast.success('Consulta seleccionada correctamente');
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  }
  return (
    <>    
    <fieldset className="flex flex-col">
      <label
        htmlFor="consultation"
        className="mb-2 text-gray-900 dark:text-white font-semibold"
      >
        Consulta a realizar
      </label>
      <select
        id="consultation"
        name="consultation"
        defaultValue={formData.consultation}
        onChange={onHandleChange
        }
        className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
      >
        <option value="select option">Seleccione una opción</option>
        <option value="medical consultation">Empezar consulta médica</option>
        <option value="prescription">Entender prescripción médica</option>
        <option value="medical letter">Entender carta medica</option>
      </select>
    </fieldset>
  
    </>

  );
};
