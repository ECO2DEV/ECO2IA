const strapiUrl = process.env.STRAPI_URL;

export const EditAvatar = ({
  onSubmit,
  onChange,
  uploadImage,
  user,
  selectFile
}) => {
  // console.log('see the url image in avatar', user);

  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="profile_avatar"
        className={`flex flex-col items-center w-24 h-24 mx-auto border-2 ${
          selectFile
            ? 'border-solid border-green-600'
            : 'border-dashed hover:border-gray-500 '
        }  rounded-full cursor-pointer`}
      >
        <img
          src={user.avatar ? strapiUrl + user.avatar.url : '/empty_avatar.png'}
          alt="Avatar preview"
          className={`w-full h-full ${
            selectFile ? 'opacity-60' : ''
          } object-cover rounded-full align-middle border-none shadow-lg `}
        />
        <input
          id="profile_avatar"
          name="profile_avatar"
          type="file"
          className="sr-only"
          onChange={onChange}
        />
        <span className=" text-sm font-medium text-gray-600">
          {selectFile ? selectFile + '✅' : 'Select file'}
        </span>
      </label>
      <button
        type="submit"
        className="bg-gray-800 text-gray-100 rounded-md px-3 py-2 mt-6 disabled:opacity-50 flex justify-center items-center mx-auto"
        disabled={!uploadImage}
      >
        Update
      </button>
    </form>
  );
};
