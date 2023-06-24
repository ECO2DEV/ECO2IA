import { useState, useContext, use } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { MatDescriptionResp } from '../../util/api/MatDescriptionResp';
import { PromptContext } from '../../context/prompts/PromptContext';
// import { useMatDescription } from '../../hooks/useMatDescription';
import Loader from '../loader/loader';

const DescriptionForm = () => {
  const { user } = useContext(UserContext);
  const { setResponse } = useContext(PromptContext);
  // const { mutate, data: descriptionData } = useMatDescription(user?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    product: '',
    company: '',
    field: '',
    ageRange: 30,
    socialMedia: [],
    language: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // For checkboxes, create an array of selected options
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsLoading(true);
    MatDescriptionResp({
      productDescription: formData.product,
      company: formData.company,
      field: formData.field,
      ageRange: formData.ageRange,
      socialMedia: formData.socialMedia,
      language: formData.language,
      user: user
    })
      .then((result) => {
        console.log('result is:', result);
        setResponse(result?.data?.data);
        // mutate({
        //   ...descriptionData,
        //   data: [...descriptionData.data, result?.data?.data]
        // });
        console.log('result?.data is:', data);
      })
      .catch((error) => {
        setError('An error occurred while fetching data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Company Name"
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
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Field of Business"
          required
        />
      </div>
      <div className="mb-4">
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="italian">Italian</option>
        </select>
      </div>
      <div className="mb-4">
        <textarea
          rows={4}
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:ring-0"
          placeholder="Tell us about the product, example: X-Boost, The solution to your low battery worries, keeping you connected anytime, anywhere."
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ageRange">Average customers age</label>
        <input
          type="range"
          id="ageRange"
          name="ageRange"
          min="18"
          max="50"
          step="1"
          value={formData.ageRange}
          onChange={handleChange}
          className="appearance-none w-full h-2 rounded bg-gray-300 outline-none"
        />
        <div className="flex justify-between">
          <span>Under 18</span>
          <span>Over 50</span>
        </div>
      </div>
      <div className="mb-4">
        <div className=" shrink [&>label]:text-xs">
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
        disabled={isLoading || !formData.product}
        type="submit"
        className={`${
          isLoading || !formData.product
            ? 'text-white bg-gray-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
            : 'w-full  bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full mt-8'
        } w-full mt-4 px-4 py-2 `}
      >
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default DescriptionForm;
