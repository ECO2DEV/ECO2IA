import { useState } from 'react';
import { updateUserById } from '../../util/api/user';
import { DataProfile } from '../../data/profile';
import { toast } from 'react-hot-toast';
import { domainSelect, nacionalitySelect, sportSelect } from '../../constants/constans';
import {domain, nationality, sport  } from "../../constants/profilecollection"
import { isValidEmail } from '../../util/helpers/valid_email';

export function ProfileForm({ user }) {


  const [formData, setFormData] = useState({
    Name: user?.Name,
    LastName: user.LastName,
    email: user.email,
    numberTelephone: user.numberTelephone,
    country: user.country,
    sex: user.sex,
    domainofstudy: user.domainofstudy,
    sport: user.sport,
    nacionality: user.nacionality,
    age: user.age,
    height: user.height,
    weight: user.weight
  });

  // console.log("this is the user", formData)
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
    if(formData.nacionality == nationality[0] || formData.domainofstudy == domain[0] || formData.sport == sport[0]){
      toast.error("Por favor seleccione una opción valida, en el campo de nacionalidad, deporte y campo de estudio");
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
        id: user?.id,
      });
      toast.success(DataProfile.ProfileUpdated);
      // router.push('/profile');
      // console.log('thhis is the response', response);
    } catch (error) {
      toast.error(DataProfile.ErrorUpdating);
      console.error('Error:', error);
    }
  };
  return (
     <form
  onSubmit={handleSubmitForm}
  className="bg-white dark:bg-lightColor  shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
>
  <div className="px-4 py-6 sm:p-8">
    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-black"
        >
          {DataProfile.Name}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.Name ? formData.Name : ''}
            type="text"
            name="Name"
            id="first-name"
            autoComplete="off"
            aria-autocomplete="none"
            placeholder="Maria"
            className="block w-full rounded-md py-1.5 focus:outline-none bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white custom-input"
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.LastName}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.LastName ? formData.LastName : ''}
            type="text"
            name="LastName"
            id="last-name"
            autoComplete="off"
            placeholder="Perez"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Email}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.email ? formData.email : ''}
            type="email"
            name="email"
            id="email"
            placeholder="mariaritificial@hotmail.com "
            autoComplete="off"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="numberTelephone"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Telephone}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={
              formData.numberTelephone ? formData.numberTelephone : ''
            }
            type="number"
            name="numberTelephone"
            id="numberTelephone"
            placeholder="3154785123"
            autoComplete="off"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Country}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.country ? formData.country : ''}
            type="text"
            name="country"
            id="country"
            placeholder="Colombia"
            autoComplete="off"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="nacionality"
          className="block text-sm font-medium leading-6 text-black "
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
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          >
            {nacionalitySelect}
          </select>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="sex"
          className="block text-sm font-medium leading-6 text-black "
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
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          >
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="age"
          className="block text-sm font-medium leading-6 text-black"
        >
          {DataProfile.Age}
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.age ? formData.age : ''}
            type="number"
            name="age"
            id="age"
            placeholder="25"
            autoComplete="off"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="height"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Height} (M)
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.height ? formData.height : ''}
            type="number"
            name="height"
            id="height"
            autoComplete="off"
            aria-autocomplete="none"
            placeholder="1.70"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="weight"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Weight} (KG)
        </label>
        <div className="mt-2">
          <input
            required
            onChange={(e) => handleProfileChange(e)}
            value={formData.weight ? formData.weight : ''}
            type="number"
            name="weight"
            id="weight"
            autoComplete="off"
            aria-autocomplete="none"
            placeholder="70"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="domainofstudy"
          className="block text-sm font-medium leading-6 text-black "
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
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          >
            {domainSelect}
          </select>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="sport"
          className="block text-sm font-medium leading-6 text-black "
        >
          {DataProfile.Sport}
        </label>
        <div className="mt-2">
          <select
            onChange={(e) => handleProfileChange(e)}
            value={formData.sport ? formData.sport : ''}
            name="sport"
            id="sport"
            autoComplete="off"
            aria-autocomplete="none"
            className="block w-full rounded-md py-1.5 focus:outline-none custom-input bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white "
          >
            {sportSelect}
          </select>
        </div>
      </div>
     
    </div>
  </div>
  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
    <button
      type="button"
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md bg-eco2MainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-eco2HoverColor transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  </div>
</form>
  )
 
}
