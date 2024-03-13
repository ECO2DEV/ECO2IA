import { useState } from 'react';
import { useRouter } from 'next/router';
import { FadeLoader } from 'react-spinners';
import Image from 'next/image';
import { DataProfile } from '../../data/profile';
import { toast } from 'react-hot-toast';
import { uploadUserImage, updateUserImage } from '../../util/api/user';
import { useSession } from 'next-auth/react';

export const EditAvatar = ({ user }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

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

    console.log('response from avatar', formData);
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
    <form
      className="col-span-full flex items-center gap-x-8 mb-10 mt-[20px]"
      onSubmit={handleImageUpload}
    >
      <label
        htmlFor="profile_avatar"
        className={`col-span-full flex items-center transition-all duration-500  w-28 h-w-28 gap-x-8 border-2 dark:bg-lightColor ${
          selectFile
            ? 'border-solid border-eco2MainColor'
            : 'border-dashed border-darkColor dark:border-gray-100 hover:border-eco2MainColor '
        }   cursor-pointer`}
      >
        {selectFile ? (
          <Image
            width={200}
            height={200}
            src={imagePreview ? imagePreview : '/empty_avatar.webp'}
            alt="Avatar preview"
            className={` w-full h-full mx-auto object-cover  align-middle border-none shadow-lg `}
          />
        ) : (
          <Image
            width={200}
            height={200}
            src={
              user?.avatar
                ? user?.avatar?.url
                : session?.picture
                ? session?.picture
                : '/empty_avatar.webp'
            }
            alt="Avatar preview"
            className={`w-full h-full mx-auto object-cover  align-middle border-none shadow-lg `}
          />
        )}

        <input
          id="profile_avatar"
          name="profile_avatar"
          type="file"
          className="sr-only"
          onChange={handleImageChange}
        />
      </label>

      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <div>
          <button
            type="submit"
            className={`rounded-md bg-eco2MainColor text-black hover:bg-eco2HoverColor dark:bg-white/10 px-3 py-2 text-sm font-semibold dark:text-white shadow-sm ${
              !uploadImage ? '' : 'dark:hover:bg-white/20'
            } `}
            disabled={!uploadImage}
          >
            {uploadImage ? DataProfile.Update : '👈 Seleccione imagen'}
          </button>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            {uploadImage ? '' : 'JPG, GIF or PNG. 1MB max.'}
          </p>
        </div>
      )}
    </form>
  );
};
