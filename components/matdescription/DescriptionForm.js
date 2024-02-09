import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { MatDescriptionResp } from '../../util/api/MatDescriptionResp';
import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';
import { toast } from 'react-hot-toast';
import { DataMattDescription } from '../../data/mattdescription';

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
    if (activeAI !== 'MatDescriptionAI') {
      setPrompt('');
      setPromptTokens(0);
    }
    setActiveAI('MatDescriptionAI');
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
      setError(DataMattDescription.socialMedia);
      toast.error(DataMattDescription.socialMedia);
      return;
    }
    // Handle form submission here
    setIsLoading(true);
    MatDescriptionResp({
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
        toast.error(DataMattDescription.ConversationDeleted);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        // setPrompt('');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:fixed sm:top-44 lg:top-32 sm:w-[40%] lg:w-[30%]"
    >
      <div className="mb-4">
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border border-emerald-900 rounded bg-[#21c284]"
          placeholder={DataMattDescription.CompanyName}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="field"
          name="field"
          value={formData.field}
          onChange={handleChange}
          className="w-full p-2 border border-emerald-900 rounded bg-[#21c284]"
          placeholder={DataMattDescription.FieldBusinnes}
          required
        />
      </div>
      <div className="mb-4">
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-2 border border-emerald-900 rounded bg-[#21c284]"
          required
        >
          <option value=""> {DataMattDescription.SelectLanguage} </option>
          <option value="english"> {DataMattDescription.English} </option>
          <option value="spanish"> {DataMattDescription.Spanish} </option>
          <option value="french"> {DataMattDescription.French} </option>
          <option value="german"> {DataMattDescription.Deutsch} </option>
          <option value="italian"> {DataMattDescription.Italian} </option>
          <option value="portuguese">{DataMattDescription.Portuguese} </option>
        </select>
      </div>
      <div className="mb-4">
        <textarea
          rows={4}
          type="text"
          id="prompt"
          name="prompt"
          value={prompt ? prompt : ''}
          onChange={handlePromptChange}
          className="w-full text-xs p-2 border border-emerald-900 rounded resize-none focus:ring-0 bg-[#21c284]"
          placeholder={DataMattDescription.ProductText}
          required
        />
      </div>
      <div className="mb-4">
        <div className=" shrink [&>label]:text-xs ">
          <input
            type="checkbox"
            id="socialMediaFacebook"
            name="socialMedia"
            value="facebook"
            checked={formData.socialMedia.includes('facebook')}
            onChange={handleChange}
            className="mr-1"
          />
          <label htmlFor="socialMediaFacebook">Facebook</label>

          <input
            type="checkbox"
            id="socialMediaInstagram"
            name="socialMedia"
            value="instagram"
            checked={formData.socialMedia.includes('instagram')}
            onChange={handleChange}
            className="mx-2"
          />
          <label htmlFor="socialMediaInstagram">Instagram</label>

          <input
            type="checkbox"
            id="socialMediaTwitter"
            name="socialMedia"
            value="twitter"
            checked={formData.socialMedia.includes('twitter')}
            onChange={handleChange}
            className="mx-2"
          />
          <label htmlFor="socialMediaTwitter">Twitter</label>

          <input
            type="checkbox"
            id="socialMediaTelegram"
            name="socialMedia"
            value="telegram"
            checked={formData.socialMedia.includes('telegram')}
            onChange={handleChange}
            className="mx-2"
          />
          <label htmlFor="socialMediaTelegram">Telegram</label>

          <input
            type="checkbox"
            id="socialMediaWhatsApp"
            name="socialMedia"
            value="whatsapp"
            checked={formData.socialMedia.includes('whatsapp')}
            onChange={handleChange}
            className="mx-2"
          />
          <label htmlFor="socialMediaWhatsApp">WhatsApp</label>
        </div>
      </div>

      <button
        disabled={isLoading || !prompt}
        type="submit"
        className={`${
          isLoading || !prompt
            ? 'text-white bg-gray-500  text-center focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-full'
            : '  bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full my-8'
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
      <span className=" flex justify-center items-center text-gray-900">
        Tokens utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
      </span>
    </form>
  );
};

export default DescriptionForm;
