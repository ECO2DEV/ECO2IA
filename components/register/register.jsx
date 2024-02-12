import { Fragment, useRef, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Textbox from "./textboxt";
import DropDownText from "./dropdowntextboxt";
import DropdownCountry from "./dropdownCountry";
import { createUser, setTrialPlan } from "../../util/api/user";
import { signIn } from "next-auth/react";
import { DataRegister } from "../../data/register";
import { toast, Toaster } from "react-hot-toast";
import { isValidEmail } from "../../util/helpers/valid_email";
import Loader from "../loader/loader";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Name: "",
    LastName: "",
    numberTelephone: "",
  });

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      toast.error("Email invalido");
      return;
    }
    setLoading(true);
    try {
      const responsePlan = await setTrialPlan();

      const newPlanId = responsePlan.data.data.id;

      // Update the formData with the newPlanId
      let updatedFormData = {
        ...formData,
        plan: {
          id: newPlanId,
        },
      };

      const response = await createUser(updatedFormData);

      if (response.status == 200) {
        // SignIn after successfully acccount creation

        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/dashboard",
          //maxAge: 300
        });
      } else {
        //Something went wrong
        setError(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex -z-10 flex-col md:flex-row w-auto items-center justify-center h-[100vh] dark:bg-zinc-900 bg-image"
        style={{
          backgroundImage: 'url("/bg-image.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "brightness(70%)"
        }}
      >
        <div className="bg-zinc-200 bg-opacity-50 blur-0 border-2 border-spacing-16 border-green-900 p-5 backdrop-blur-lg absolute backdrop-filter shadow-md rounded flex flex-col justify-center pb-8 px-4 sm:px-6 lg:px-8 xl:px-10 md:flex-row lg:flex-none flex-none">
          <div className="mx-auto w-full max-w-md md:w-96 lg:w-96">
            <header className="flex items-center justify-center gap-4 my-8 text-[#21c284]">
              <UserPlusIcon className="h-6 w-6" aria-hidden="true" />
              <h3 className="text-base font-semibold leading-6">
                Creación de usuarios
              </h3>
            </header>
            <div className="mt-2">
              <form>
                <Textbox
                  id={"username"}
                  nametx={"username"}
                  placeholder={"JaneSmith22"}
                  libelle={DataRegister.RegisterNickName}
                  type={"text"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.username}
                />
                <Textbox
                  id={"email"}
                  nametx={"email"}
                  placeholder={"JaneSmith22@mattech.com"}
                  libelle={DataRegister.RegisterEmail}
                  type={"email"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.email}
                />
                <Textbox
                  id={"password"}
                  nametx={"password"}
                  placeholder={"*******"}
                  libelle={DataRegister.RegisterPassword}
                  type={"password"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.password}
                />
                <Textbox
                  id={"LastName"}
                  nametx={"LastName"}
                  placeholder={"Jane Lauren"}
                  libelle={DataRegister.RegisterLastName}
                  type={"text"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.Lastname}
                />
                <Textbox
                  id={"Name"}
                  nametx={"Name"}
                  placeholder={"Smith"}
                  libelle={DataRegister.RegisterName}
                  type={"text"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.Name}
                />
                <DropDownText
                  id={"numberTelephone"}
                  nametx={"numberTelephone"}
                  placeholder={"+33 06 98 66 91"}
                  libelle={DataRegister.RegisterPhone}
                  type={"text"}
                  onChange={(e) => handleUsernameChange(e)}
                  value={formData.num_tel}
                />
                <DropdownCountry />
              </form>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="mx-auto w-full mt-8 relative border hover:border-emerald-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden rounded-md bg-emerald-800 p-2 flex justify-center items-center font-extrabold"
            >
              <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-900 delay-150 group-hover:delay-75"></div>
              <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-100"></div>
              <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-150"></div>
              <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-200"></div>
              <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-300"></div>
              <div className="z-10 bg-transparent">
                {loading ? (
                  <Loader />
                ) : (
                  <span>{DataRegister.RegisterCreate}</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
