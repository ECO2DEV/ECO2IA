import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EditProfile from './editProfile';
import { PencilIcon } from '../icons/icons';
import { EditAvatar } from './editAvatar';
import { uploadUserImage, updateUserImage } from '../../util/api/user';
import { toast } from 'react-hot-toast';
import { DataProfile } from '../../data/profile';

export default function Profile({ user }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleModalEdit = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleImageChange = (e) => {
    setUploadImage(e.target.files[0]);
    const file = e.target.files[0];
    setSelectFile(file ? file.name : null);

    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    toast.success(DataProfile.ImageSelected);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', uploadImage, uploadImage.name);
    setLoading(true);

    try {
      const response = await uploadUserImage({ formData: formData });
      if (response) {
        // usar la funcion para actualizar el usuario

        const updatedUser = await updateUserImage({
          formData: { avatar: response.data[0] },
          id: user.id
        });
        if (updatedUser) {
          // console.log('updated user', updatedUser);
          router.reload();
        }
        toast.success(DataProfile.ImageUploaded);
        // console.log('avatar response in profile', response.data[0]);
      }
    } catch (error) {
      console.error('error upload image', error);
      toast.error(DataProfile.ErrorUploadingImage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link rel="eco2 icon" href="/eco2it_logo.jpeg" />
        <title>Editar Perfil</title>
      </Head>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <EditAvatar
          onChange={handleImageChange}
          onSubmit={handleImageUpload}
          uploadImage={uploadImage}
          user={user}
          selectFile={selectFile}
          imagePreview={imagePreview}
          loading={loading}
        />
      </div>
      <div className="flex">
        <div className="flex-grow">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {DataProfile.ProfileInformation}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
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
            <span> {DataProfile.EditProfile} </span>
          </button>
        </div>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.FullName}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {user.Name} {user.LastName}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Sex}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.sex}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Email}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.email}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {DataProfile.Telephone}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.numberTelephone}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Nationality}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.nacionality}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Country}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.country}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Age}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.age}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Weight}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.weight}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {DataProfile.DomainofStudy}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.domainofstudy}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {DataProfile.EducationLevel}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.educationallevel}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.ActivityArea}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.activityarea}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Sport}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.sport}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              {DataProfile.Transport}{' '}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.transport}</span>
            </dd>
          </div>
        </dl>
        {isModalOpen && <EditProfile onClose={handleModalEdit} user={user} />}
      </div>
    </>
  );
}
