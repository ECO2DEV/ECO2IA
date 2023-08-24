import { useContext, Fragment, useRef, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { MatCVResponseXP } from '../../util/api/MatCVResponseXP';

import TagsInput from './TagsInput';

import { DataMattCV } from '../../data/mattcv';

export default function CVExperience({
  onClose,
  handleAddExperience,
  setTextExperience,
  formExperienceFields
}) {
  const cancelButtonRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [formProfile, setFormProfile] = useState({
    role: '',
    market: '',
    keywords: tags
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formExperienceFields.jobTitleXp ||
      !formExperienceFields.employer ||
      !formExperienceFields.startDate ||
      !formExperienceFields.endDate ||
      !formExperienceFields.cityXp
    ) {
      toast.error('Please fill all the formation fields');
      onClose();
      return;
    }
    if (!formProfile.role || !formProfile.market) {
      toast.error(DataMattCV.PleaseFill);
      return;
    }
    if (formProfile.role.length < 3 || formProfile.market.length < 3) {
      toast.error(DataMattCV.PleaseFill);
      return;
    }
    if (tags.length === 0) {
      toast.error(DataMattCV.PleaseAdd);
      return;
    }
    try {
      setLoading(true);
      const result = await MatCVResponseXP({
        role: formProfile.role,
        market: formProfile.market,
        keywords: formProfile.keywords,
        user: user
      });
      const bulletPoints = result?.data?.data
        ? result.data.data.split('\n').map((item) => `• ${item.trim()}\n`)
        : '';
      setTextExperience(bulletPoints);
      handleAddExperience();

      console.log('result is:', result.data);
      setLoading(false);
      toast.success(DataMattCV.CVGenerated);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.error(DataMattCV.ErrorGenerating);
    } finally {
      setLoading(false);
      setTags([]);
    }
  }
  function handleChange(e) {
    setFormProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl p-6">
                <section>
                  <div className="mt-2 mb-4 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900"
                    >
                      {DataMattCV.WorkExperience}
                    </Dialog.Title>
                  </div>
                  <div>
                    <h3>{DataMattCV.WorkExperienceBox}</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="flex space-x-2 mt-2">
                        <input
                          type="text"
                          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                          placeholder={DataMattCV.Role}
                          value={formProfile.role ? formProfile.role : ''}
                          name="role"
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="market"
                          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                          placeholder={DataMattCV.Market}
                          value={formProfile.market ? formProfile.market : ''}
                          onChange={handleChange}
                        />
                      </div>
                      <TagsInput tags={tags} setTags={setTags} />
                      <div className="flex justify-end items-center gap-2 m-2">
                        <button
                          disabled={loading}
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                          {loading ? (DataMattCV.Loading) : (DataMattCV.Generate)}
                        </button>
                        <button
                          disabled={loading}
                          onClick={onClose}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          {DataMattCV.Cancel}
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}