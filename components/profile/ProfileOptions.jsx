import { useState } from 'react';
import { useRouter } from 'next/router';
import { DataProfile } from '../../data/profile';
import { isValidEmail } from '../../util/helpers/valid_email';
import {
  updateUserById,
  uploadUserImage,
  updateUserImage
} from '../../util/api/user';
import { toast } from 'react-hot-toast';
import {
  domainSelect,
  sportSelect,
  nacionalitySelect
} from '../../constants/constans';
import { EditAvatar } from './editAvatar';
export const ProfileOptions = ({ user }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: user?.Name,
    LastName: user.LastName,
    email: user.email,
    numberTelephone: user.numberTelephone,
    country: user.country,
    sex: user.sex,
    domainofstudy: user.domainofstudy,
    educationallevel: user.educationallevel,
    activityarea: user.activityarea,
    sport: user.sport,
    transport: user.transport,
    nacionality: user.nacionality,
    age: user.age,
    height: user.height,
    weight: user.weight
  });

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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      formData.Name === '' ||
      formData.LastName === '' ||
      formData.email === '' ||
      formData.numberTelephone === '' ||
      formData.country === ''
    ) {
      toast.error(DataProfile.PleaseFill);

      return;
    }

    if (
      formData.Name.length < 3 ||
      formData.Name.length > 50 ||
      formData.LastName.length < 3 ||
      formData.LastName.length > 50
    ) {
      toast.error(DataProfile.NameMustBe);

      return;
    }

    // Valid email with regex
    if (!isValidEmail(formData.email)) {
      toast.error(DataProfile.InvalidEmail);
      return;
    }

    try {
      const response = await updateUserById({
        formData: formData,
        id: user.id
      });
      toast.success(DataProfile.ProfileUpdated);
      // router.push('/profile');
      console.log('thhis is the response', response);
    } catch (error) {
      toast.error(DataProfile.ErrorUpdating);
      console.error('Error:', error);
    }
  };

  return (
    <section className=" flex justify-center items-center w-full h-screen">
      <div className="py-10 h-screen">
        <EditAvatar
          onChange={handleImageChange}
          onSubmit={handleImageUpload}
          uploadImage={uploadImage}
          user={user}
          selectFile={selectFile}
          imagePreview={imagePreview}
          loading={loading}
        />
        <form
          autoComplete="off"
          onSubmit={handleSubmitForm}
          className="grid grid-cols-1 gap-x-2 gap-y-4 w-full sm:max-w-4xl lg:max-w-6xl sm:grid-cols-6 pb-10"
        >
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 dark:text-white"
            >
              {DataProfile.Name}
            </label>
            <div className="mt-2">
              <input
       
                onChange={(e) => handleProfileChange(e)}
                value={formData.Name ? formData.Name : ''}
                type="text"
                name="Name"
                id="Name"
                autoComplete="off"
                aria-autocomplete="none"
                placeholder='Maria'
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.LastName}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.LastName ? formData.LastName : ''}
                type="text"
                name="LastName"
                id="LastName"
                autoComplete="off"
                placeholder='Perez'
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
            />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Email}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.email ? formData.email : ''}
                type="email"
                name="email"
                id="email"
                placeholder='mariaritificial@hotmail.com '
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
                         />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="numberTelephone"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Telephone}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.numberTelephone ? formData.numberTelephone : ''}
                type="number"
                name="numberTelephone"
                id="numberTelephone"
                placeholder='3154785123'
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
            />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Country}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.country ? formData.country : ''}
                type="text"
                name="country"
                id="country"
                placeholder='Colombia'
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
               />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="nacionality"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Nationality}
            </label>
            <div className="mt-2">
              <select
                onChange={(e) => handleProfileChange(e)}
                value={formData.nacionality ? formData.nacionality : ''}
                name="nacionality"
                id="nacionality"
             
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
               >
                {nacionalitySelect}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="sex"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Sex}
            </label>
            <div className="mt-2">
              <select
                onChange={(e) => handleProfileChange(e)}
                value={formData.sex ? formData.sex : ''}
                name="sex"
                id="sex"
              
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
            >
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="age"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Age}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.age ? formData.age : ''}
                type="number"
                name="age"
                id="age"
                placeholder='25'
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
                   />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="height"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Height} (M)
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.height ? formData.height : ''}
                type="number"
                name="height"
                id="height"
              
                autoComplete="off"
                aria-autocomplete="none"
                placeholder='1.70'
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
                   />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="weight"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.Weight} (KG)
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleProfileChange(e)}
                value={formData.weight ? formData.weight : ''}
                type="number"
                name="weight"
                id="weight"
                autoComplete="off"
                aria-autocomplete="none"
                placeholder='70'
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
                     />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="domainofstudy"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.DomainofStudy}
            </label>
            <div className="mt-2">
              <select
                onChange={(e) => handleProfileChange(e)}
                value={formData.domainofstudy ? formData.domainofstudy : ''}
                name="domainofstudy"
                id="domainofstudy"
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
                  >
                {domainSelect}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="sport"
              className="block text-sm font-medium leading-6  dark:text-white"
            >
              {DataProfile.DomainofStudy}
            </label>
            <div className="mt-2">
              <select
                onChange={(e) => handleProfileChange(e)}
                value={formData.sport ? formData.sport : ''}
                name="sport"
                id="sport"
                autoComplete="off"
                aria-autocomplete="none"
                className="block w-full rounded-md py-1.5 focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none dark:border dark:border-white  dark:bg-white/5 focus:bg-darkColor dark:focus:border-white dark:hover:border-white "
               >
                {sportSelect}
              </select>
            </div>
          </div>
          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-eco2MainColor px-3 py-2 text-sm font-semibold  dark:text-white shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
