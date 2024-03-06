import { FadeLoader } from 'react-spinners';
import Image from 'next/image';
import { DataProfile } from '../../data/profile';

export const EditAvatar = ({
  onSubmit,
  onChange,
  uploadImage,
  user,
  selectFile,
  imagePreview,
  loading
}) => {
  return (
    <form
      className="col-span-full flex items-center gap-x-8 mb-10 mt-[20px]"
      onSubmit={onSubmit}
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
            className={` w-full h-full object-cover  align-middle border-none shadow-lg `}
          />
        ) : (
          <Image
            width={200}
            height={200}
            src={user.avatar ? user.avatar.url : '/empty_avatar.webp'}
            alt="Avatar preview"
            className={`w-full h-full object-cover  align-middle border-none shadow-lg `}
          />
        )}

        <input
          id="profile_avatar"
          name="profile_avatar"
          type="file"
          className="sr-only"
          onChange={onChange}
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
