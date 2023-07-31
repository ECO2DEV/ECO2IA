import Loader from '../loader/loader';
import { DataProfile } from '../../data/profile';
const strapiUrl = process.env.STRAPI_URL;

export const EditAvatar = ({
  onSubmit,
  onChange,
  uploadImage,
  user,
  selectFile,
  imagePreview,
  loading
}) => {
  // console.log('see the url image in avatar', user);
  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="profile_avatar"
        className={`flex flex-col items-center transition-all duration-500  w-28 h-w-28 mx-auto border-2 ${
          selectFile
            ? 'border-solid border-green-600'
            : 'border-dashed hover:border-gray-500 '
        }  rounded-full cursor-pointer`}
      >
        {selectFile ? (
          <img
            src={imagePreview}
            alt="Avatar preview"
            className={` w-full h-full object-cover rounded-full align-middle border-none shadow-lg `}
          />
        ) : (
          <img
            src={
              user.avatar ? strapiUrl + user.avatar.url : '/empty_avatar.png'
            }
            alt="Avatar preview"
            className={`w-full h-full object-cover rounded-full align-middle border-none shadow-lg `}
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
      <span
        className={`${
          selectFile ? ' hidden' : ''
        } text-xs font-medium text-gray-600 flex justify-center items-center mx-auto mt-2`}
      >
        {DataProfile.SelectFile}
      </span>
      {loading ? (
        <div className="flex justify-center items-center mx-auto px-3 py-2 mt-6">
          <Loader />
        </div>
      ) : (
        <button
          type="submit"
          className="bg-gray-800 text-gray-100 rounded-md px-3 py-2 mt-4 disabled:opacity-50 flex justify-center items-center mx-auto"
          disabled={!uploadImage}
        >
          {DataProfile.Update}
        </button>
      )}
    </form>
  );
};
