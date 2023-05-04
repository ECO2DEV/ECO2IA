import { useState } from 'react';
import { useRouter } from 'next/router';
import EditProfile from './editProfile';
import { PencilIcon } from '../icons/icons';
import { EditAvatar } from './editAvatar';
import { uploadUserImage, updateUserImage } from '../../util/api/user';

export default function Profile({ user }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);

  const handleModalEdit = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleImageChange = (e) => {
    setUploadImage(e.target.files[0]);
    const file = e.target.files[0];
    setSelectFile(file ? file.name : null);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', uploadImage, uploadImage.name);

    try {
      const response = await uploadUserImage({ formData: formData });
      if (response) {
        // usar la funcion para actualizar el usuario

        const updatedUser = await updateUserImage({
          formData: { avatar: response.data[0] },
          id: user.id
        });
        if (updatedUser) {
          console.log('updated user', updatedUser);
          router.reload();
        }
        console.log('avatar response in profile', response.data[0]);
      }
    } catch (error) {
      console.error('error upload image', error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <EditAvatar
          onChange={handleImageChange}
          onSubmit={handleImageUpload}
          uploadImage={uploadImage}
          user={user}
          selectFile={selectFile}
        />
      </div>
      <div className="flex">
        <div className="flex-grow">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 my-auto">
          <button
            type="button"
            onClick={handleModalEdit}
            className="flex justify-between rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>
              <PencilIcon />
            </span>
            <span>Edit profile</span>
          </button>
        </div>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {user.Name} {user.LastName}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.email}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              Numero de Telephone
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.numberTelephone}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Pays</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.country}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </span>
            </dd>
          </div>
        </dl>
        {isModalOpen && <EditProfile onClose={handleModalEdit} user={user} />}
      </div>
    </>
  );
}
