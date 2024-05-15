import { useState, useEffect } from "react";
import {
  createAcademicInformation,
  updateAcademicInformation,
  getAcademicInformation,
  deleteAcademicInformation,
} from "../../util/api/academicInformation";
import { DataProfile } from "../../data/profile";
import { toast } from "react-hot-toast";

export function ProfileFormAcademica({ user }) {
  const [formDatas, setFormDatas] = useState([
    {
      id: null,
      titulo_academico: "",
      universidad: "",
      fecha_ini_academica: "",
      fecha_fin_academica: "",
      ciudad_uni: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getAcademicInformation({ userId: user.id });
        console.log("Data received from API:", data);
        if (data && data.data.length > 0) {
          const formattedData = data.data.map((item) => ({
            id: item.id || null,
            titulo_academico: item.attributes.titulo_academico || "",
            universidad: item.attributes.universidad || "",
            fecha_ini_academica: item.attributes.fecha_ini_academica || "",
            fecha_fin_academica: item.attributes.fecha_fin_academica || "",
            ciudad_uni: item.attributes.ciudad_uni || "",
          }));
          setFormDatas(formattedData);
        } else {
          setFormDatas([
            {
              id: null,
              titulo_academico: "Ejemplo: Ingeniería de Sistemas",
              universidad: "Universidad de Ejemplo",
              fecha_ini_academica: "2010-01-01",
              fecha_fin_academica: "2014-01-01",
              ciudad_uni: "Ciudad Ejemplo",
            },
            {
              id: null,
              titulo_academico: "Ejemplo: Master en Ciencias de Datos",
              universidad: "Instituto de Tecnología de Ejemplo",
              fecha_ini_academica: "2015-01-01",
              fecha_fin_academica: "2017-01-01",
              ciudad_uni: "Ciudad Ejemplo",
            },
          ]);
        }
      }
    };
    fetchData();
  }, [user?.id]);

  const handleProfileChange = (e, index) => {
    const { name, value } = e.target;
    if (index >= 0 && index < formDatas.length) {
      const newFormDatas = [...formDatas];
      const newFormData = { ...newFormDatas[index], [name]: value };
      newFormDatas[index] = newFormData;
      setFormDatas(newFormDatas);
    }
  };

  const addMoreAcademicInfo = () => {
    const newAcademicInfo = {
      titulo_academico: "",
      universidad: "",
      fecha_ini_academica: "",
      fecha_fin_academica: "",
      ciudad_uni: "",
    };
    setFormDatas((formDatas) => [...formDatas, newAcademicInfo]);
  };

  const handleDelete = async (id, index) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este expediente académico?"
    );
    if (confirmed) {
      const result = await deleteAcademicInformation({ userId: user.id, id });
      if (result) {
        toast.success("¡Información académica eliminada exitosamente!");
        const updatedFormDatas = [...formDatas];
        updatedFormDatas.splice(index, 1);
        setFormDatas(updatedFormDatas);
      } else {
        toast.error("Failed to delete academic information.");
      }
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const promises = [];

    for (let formData of formDatas) {
      if (
        !formData.titulo_academico ||
        !formData.universidad ||
        !formData.ciudad_uni
      ) {
        toast.error(DataProfile.PleaseFill);
        return;
      }

      const isUpdate = formData.id != null;

      if (isUpdate) {
        const updatePromise = updateAcademicInformation({
          userId: user?.id,
          formData,
          id: formData.id,
        })
          .then((response) => {
            return {
              success: true,
              data: { ...formData, id: response.data.id },
            };
          })
          .catch((error) => {
            console.error(
              "Failed to update academic information:",
              error.response?.data?.error
            );
            return { success: false, error: error.response?.data };
          });

        promises.push(updatePromise);
      } else {
        const createPromise = createAcademicInformation({
          userId: user?.id,
          formData,
        })
          .then((response) => {
            return {
              success: true,
              data: { ...formData, id: response.data.id },
            };
          })
          .catch((error) => {
            console.error(
              "Failed to create academic information:",
              error.response?.data?.error
            );
            return { success: false, error: error.response?.data };
          });

        promises.push(createPromise);
      }
    }

    Promise.all(promises).then((results) => {
      let allSuccess = true;
      const newFormDatas = [...formDatas];

      results.forEach((result, index) => {
        if (result.success) {
          newFormDatas[index] = result.data;
        } else {
          allSuccess = false;
        }
      });

      if (allSuccess) {
        toast.success(DataProfile.ProfileUpdated);
        setFormDatas(newFormDatas);
      } else {
        toast.error("Some updates failed, please check the data.");
      }
    });
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
        {formDatas.map((formData, index) => (
          <div key={index} className="px-4 py-6 sm:p-8">
            <div className="max-w-2xl space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Información académica {index + 1}
                </legend>
                <button
                  onClick={() => handleDelete(formData.id, index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <i className="fas fa-trash">🗑️</i> Delete
                </button>
                <div className="mt-6 space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="titulo_academico"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Título
                    </label>
                    <input
                      id={`titulo_academico_${index}`}
                      name="titulo_academico"
                      type="text"
                      onChange={(e) => handleProfileChange(e, index)}
                      value={formData.titulo_academico}
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
                        id={`universidad_${index}`}
                        name="universidad"
                        onChange={(e) => handleProfileChange(e, index)}
                        value={formData.universidad}
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
                        id={`ciudad_uni_${index}`}
                        name="ciudad_uni"
                        onChange={(e) => handleProfileChange(e, index)}
                        value={formData.ciudad_uni}
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
                        id={`fecha_ini_academica_${index}`}
                        name="fecha_ini_academica"
                        onChange={(e) => handleProfileChange(e, index)}
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
                        id={`fecha_fin_academica_${index}`}
                        name="fecha_fin_academica"
                        onChange={(e) => handleProfileChange(e, index)}
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
        ))}
        <div className="px-4 py-4 border-t border-gray-900/10 sm:px-8">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addMoreAcademicInfo}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
            >
              Añadir Más Información Académica
            </button>
            <div className="flex items-center gap-x-6">
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
          </div>
        </div>
      </form>
    </div>
  );
}
