import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/user/UserContext';
import {
  InstagramIconSVGCheck,
  FacebookIconSVGCheck,
  TwitterIconSVGCheck,
  TelegramIconSVGCheck,
  WhatsAppIconSVGCheck
} from '../icons/icons';
import { Eco2DescriptionResp } from '../../util/api/Eco2DescriptionResp';
import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';
import { toast } from 'react-hot-toast';
import { DataEco2Description } from '../../data/eco2description';

const DescriptionForm = () => {
  const { user } = useContext(UserContext);
  const {
    setResponse,
    setPrompt,
    setPromptTokens,
    activeAI,
    setActiveAI,
    prompt,
    promptTokens
  } = useContext(PromptContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    product: '',
    company: '',
    field: '',
    socialMedia: [],
    language: ''
  });

  useEffect(() => {
    if (activeAI !== 'Eco2DescriptionAI') {
      setPrompt('');
      setPromptTokens(0);
    }
    setActiveAI('Eco2DescriptionAI');
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // For checkboxes, create an array of selected options.

      const updatedSocialMedia = checked
        ? [...formData.socialMedia, value]
        : formData.socialMedia.filter((media) => media !== value);

      setFormData({
        ...formData,
        [name]: updatedSocialMedia
      });
    } else {
      // For other inputs, update the value normally
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === '') {
      setPromptTokens(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.socialMedia.length === 0) {
      setError(DataEco2Description.socialMedia);
      toast.error(DataEco2Description.socialMedia);
      return;
    }
    // Handle form submission here
    setIsLoading(true);
    Eco2DescriptionResp({
      productDescription: prompt,
      company: formData.company,
      field: formData.field,
      socialMedia: formData.socialMedia,
      language: formData.language,
      user: user
    })
      .then((result) => {
        // console.log('result is:', result?.data?.copywriting);
        setResponse(result.data.copywriting);
      })
      .catch((error) => {
        setError('An error occurred while fetching data.');
        toast.error(DataEco2Description.ConversationDeleted);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        // setPrompt('');
      });
  };

  return (
    <>
      {/* <h1 className="text-5xl text-center mt-[-30px]  font-semibold dark:text-white">
        {DataEco2Description.MattDescriptionIA}
      </h1> */}
      <form onSubmit={handleSubmit} className="w-full md:order-1 flex-1">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="text-black dark:text-eco2MainColor"
          >
            Nombre de la empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
            placeholder={DataEco2Description.CompanyName}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="text-black dark:text-eco2MainColor"
          >
            Actividad
          </label>
          <input
            type="text"
            id="field"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full p-2 border border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
            placeholder={DataEco2Description.FieldBusinnes}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="text-black dark:text-eco2MainColor"
          >
            Idioma del contenido
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-2 border border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
            required
          >
            <option value=""> {DataEco2Description.SelectLanguage} </option>
            <option value="english"> {DataEco2Description.English} </option>
            <option value="spanish"> {DataEco2Description.Spanish} </option>
            <option value="french"> {DataEco2Description.French} </option>
            <option value="german"> {DataEco2Description.Deutsch} </option>
            <option value="italian"> {DataEco2Description.Italian} </option>
            <option value="portuguese">
              {DataEco2Description.Portuguese}{' '}
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="text-black dark:text-eco2MainColor"
          >
            Cuéntenos sobre el producto
          </label>
          <textarea
            rows={4}
            type="text"
            id="prompt"
            name="prompt"
            value={prompt ? prompt : ''}
            onChange={handlePromptChange}
            className="w-full text-xs p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
            placeholder={DataEco2Description.ProductText}
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-center items-center space-x-4">
            <label htmlFor="socialMediaFacebook" className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaFacebook"
                name="socialMedia"
                value="facebook"
                checked={formData.socialMedia.includes('facebook')}
                onChange={handleChange}
                className="mx-2 text-eco2MainColor border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
              />
              <FacebookIconSVGCheck />
            </label>

            <label htmlFor="socialMediaInstagram" className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaInstagram"
                name="socialMedia"
                value="instagram"
                checked={formData.socialMedia.includes('instagram')}
                onChange={handleChange}
                className="mx-2 text-eco2MainColor border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
              />
              <InstagramIconSVGCheck />
            </label>

            <label htmlFor="socialMediaTwitter" className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaTwitter"
                name="socialMedia"
                value="twitter"
                checked={formData.socialMedia.includes('twitter')}
                onChange={handleChange}
                className="mx-2 text-eco2MainColor border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
              />
              <TwitterIconSVGCheck />
            </label>

            <label htmlFor="socialMediaTelegram" className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaTelegram"
                name="socialMedia"
                value="telegram"
                checked={formData.socialMedia.includes('telegram')}
                onChange={handleChange}
                className="mx-2 text-eco2MainColor border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
              />
              <TelegramIconSVGCheck />
            </label>

            <label htmlFor="socialMediaWhatsApp" className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaWhatsApp"
                name="socialMedia"
                value="whatsapp"
                checked={formData.socialMedia.includes('whatsapp')}
                onChange={handleChange}
                className="mx-2 text-eco2MainColor border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
              />
              <WhatsAppIconSVGCheck />
            </label>
          </div>
        </div>

        <button
          disabled={isLoading || !prompt}
          type="submit"
          className={`${
            isLoading || !prompt
              ? 'text-white bg-eco2HoverColor text-center custom-input py-2 px-4 rounded-full'
              : '  bg-eco2MainColor hover:bg-eco2HoverColor text-white font-semibold py-2 px-4 rounded-full my-8'
          } w-full mt-4 px-4 py-2 `}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            'Enviar'
          )}
        </button>
        {/* <span className=" flex justify-center items-center dark:text-gray-100 text-gray-900">
          Puntos utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
        </span> */}
      </form>
    </>
  );
};

export default DescriptionForm;
