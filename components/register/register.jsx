import {  useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Textbox from "./textboxt";
import DropDownText from "./dropdowntextboxt";
import DropdownCountry from "./dropdownCountry";
import { createUser, setFreemiumPlan } from "../../util/api/user";
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
      const responsePlan = await setFreemiumPlan();

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
      <div className="flex dark:bg-darkColor w-auto -z-10 flex-col items-center justify-center h-[100vh]">
        <div className="p-10 rounded flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-10 md:flex-row lg:flex-none flex-none">
          <div className="mx-auto w-full max-w-md md:w-96 lg:w-96">

            <header className="flex items-center justify-center my-8 text-eco2MainColor">
              <UserPlusIcon className="h-8 w-8" aria-hidden="true" />
              <h3 className="ml-4 text-3xl font-bold tracking-tight">
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
                  placeholder={"+57 310 760 4389"}
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
              onClick={handleSubmit}
              disabled={loading}
              className="bg-eco2MainColor w-full flex items-center justify-center mt-8 rounded-lg text-white px-6 py-3 text-base hover:bg-eco2HoverColor cursor-pointer transition"
            >
              {loading ? (
                <Loader />
              ) : (
                <span>{DataRegister.RegisterCreate}</span>
              )}
            </button>

          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
