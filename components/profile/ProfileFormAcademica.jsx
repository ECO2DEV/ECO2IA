import { useState } from "react";
import { updateUserById } from "../../util/api/user";
import { DataProfile } from "../../data/profile";
import { toast } from "react-hot-toast";


export function ProfileFormAcademica({ user }) {
  const [formData, setFormData] = useState({
    titulo_academico: user?.titulo_academico,
    universidad: user.universidad,
    fecha_ini_academica: user.fecha_ini_academica,
    fecha_fin_academica: user.fecha_fin_academica,
    ciudad_uni: user.ciudad_uni,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (
      formData.titulo_academico === "" ||
      formData.universidad === "" ||
      formData.ciudad_uni === ""
    ) {
      toast.error(DataProfile.PleaseFill);

      return;
    }

    try {
      const response = await updateUserById({
        formData: formData,
        id: user?.id,
      });
      toast.success(DataProfile.ProfileUpdated);
      // router.push('/profile');
      console.log("thhis is the response", response);
    } catch (error) {
      toast.error(DataProfile.ErrorUpdating);
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Formación Académica
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
          Aqui va tu información académica
        </p>
      </div>

      <form
        onSubmit={handleSubmitForm}
        className="bg-white dark:bg-lightColor shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="max-w-2xl space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Información académica
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative">
                  <label
                    htmlFor="titulo_academico"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Título
                  </label>
                  <input
                    id="titulo_academico"
                    name="titulo_academico"
                    type="text"
                    onChange={(e) => handleProfileChange(e)}
                    value={
                      formData.titulo_academico ? formData.titulo_academico : ""
                    }
                    autoComplete="off"
                    aria-autocomplete="none"
                    placeholder="Desarrollador web"
                    
                    className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                  />
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex-1">
                    <label
                      htmlFor="universidad"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Universidad
                    </label>
                    <input
                      id="universidad"
                      name="universidad"
                      onChange={(e) => handleProfileChange(e)}
                      value={formData.universidad ? formData.universidad : ""}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="none"
                      placeholder="UniDev"
                      className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="ciudad_uni"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Ciudad
                    </label>
                    <input
                      id="ciudad_uni"
                      name="ciudad_uni"
                      onChange={(e) => handleProfileChange(e)}
                      value={formData.ciudad_uni ? formData.ciudad_uni : ""}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="none"
                      placeholder="Ciudad Tech"
                      className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex-1">
                    <label
                      htmlFor="fecha_ini_academica"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Fecha de inicio
                    </label>
                    <input
                      id="fecha_ini_academica"
                      name="fecha_ini_academica"
                      onChange={(e) => handleProfileChange(e)}
                      value={
                        formData.fecha_ini_academica
                          ? formData.fecha_ini_academica
                          : ""
                      }
                      type="date"
                      autoComplete="off"
                      aria-autocomplete="none"
                      placeholder="2021-01-01"
                      className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="fecha_fin_academica"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Fecha de finalizacion
                    </label>
                    <input
                      id="fecha_fin_academica"
                      name="fecha_fin_academica"
                      onChange={(e) => handleProfileChange(e)}
                      value={
                        formData.fecha_fin_academica
                          ? formData.fecha_fin_academica
                          : ""
                      }
                      type="date"
                      autoComplete="off"
                      aria-autocomplete="none"
                      placeholder="2023-07-29"
                      className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
