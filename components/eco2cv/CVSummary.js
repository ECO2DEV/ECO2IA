import { useContext, Fragment, useRef, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { PromptContext } from '../../context/prompts/PromptContext';
import { Dialog, Transition } from '@headlessui/react';
import { Eco2CVResponse } from '../../util/api/Eco2CVResponse';
import { toast } from 'react-hot-toast';

import TagsInput from './TagsInput';

import { DataEco2CV } from '../../data/eco2cv';

export default function CVSummary({ onClose, setTextProfile }) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, language } = useContext(UserContext);
  const { setResponse } = useContext(PromptContext);
  const [formProfile, setFormProfile] = useState({
    role: '',
    market: '',
    keywords: tags
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formProfile.role || !formProfile.market) {
      toast.error(DataEco2CV.PleaseFill);
      return;
    }
    if (tags.length === 0) {
      toast.error(DataEco2CV.PleaseAdd);
      return;
    }
    if (formProfile.role.length < 3 || formProfile.market.length < 3) {
      toast.error(DataEco2CV.PleaseFill);
      return;
    }
    try {
      setLoading(true);
      const result = await Eco2CVResponse({
        role: formProfile.role,
        market: formProfile.market,
        keywords: formProfile.keywords,
        language: language,
        user: user
      });
      setTextProfile(result?.data?.data);
      setResponse(result?.data?.data);

      setLoading(false);
      // console.log('result is:', result.data);
      toast.success(DataEco2CV.CVGenerated);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.error(DataEco2CV.ErrorGenerating);
    } finally {
      setLoading(false);
      setTags([]);
    }
  }
  function handleChange(e) {
    setFormProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
                      {DataEco2CV.ProfessionalSummary}
                    </Dialog.Title>
                  </div>
                  <div>
                    <h3 className='dark:text-black'>{DataEco2CV.ProffesionalSummaryText}</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="flex space-x-2 mt-2">
                        <input
                          type="text"
                          className="w-1/2 px-4 py-2 border  rounded-lg custom-input dark:text-black"
                          placeholder={DataEco2CV.Role}
                          value={formProfile.role ? formProfile.role : ''}
                          name="role"
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="market"
                          className="w-1/2 px-4 py-2 border rounded-lg custom-input dark:text-black"
                          placeholder={DataEco2CV.Market}
                          value={formProfile.market ? formProfile.market : ''}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <input
                        type="text"
                        name="keywords"
                        className="w-full px-4 py-2 my-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        placeholder="Keywords"
                        value={formProfile.keywords ? formProfile.keywords : ''}
                        onChange={handleChange}
                      /> */}
                      <TagsInput tags={tags} setTags={setTags} />
                      <div className="flex justify-end items-center gap-2 m-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-eco2MainColor hover:bg-eco2HoverColor text-white rounded-lg "
                        >
                          {loading ? DataEco2CV.Loading : DataEco2CV.Generate}
                        </button>
                        <button
                          onClick={onClose}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          {DataEco2CV.Cancel}
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
