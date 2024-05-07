import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user/UserContext";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleProfileOpt({ setFormData }) {
  const { user } = useContext(UserContext);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (user && enabled) {
        setFormData((prev) => ({
            ...prev,
            fullName: user.Name + " " + user.LastName,
            jobTitle: user.activityarea,
            domainOfStudy: user.domainofstudy,
            nationality: user.nacionality,
            email: user.email,
            phone: user.numberTelephone,
            country: user.country,
            titulo_academico: user.titulo_academico,
            universidad: user.universidad,
            fecha_ini_academica: user.fecha_ini_academica,
            fecha_fin_academica: user.fecha_fin_academica,
            ciudad_uni: user.ciudad_uni
        }));
    }
}, [user, enabled, setFormData]);

  const handleToggle = () => {
    setEnabled((prev) => !prev);
    if (enabled === false) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.Name + " " + user.LastName,
        jobTitle: user.activityarea,
        domainOfStudy: user.domainofstudy,
        nationality: user.nacionality,
        email: user.email,
        phone: user.numberTelephone,
        country: user.country,
        titulo_academico: user?.titulo_academico,
        universidad: user.universidad,
        fecha_ini_academica: user.fecha_ini_academica,
        fecha_fin_academica: user.fecha_fin_academica,
        ciudad_uni: user.ciudad_uni,
        city: "",
      }));
    }
  };



  return (
    <Switch
      checked={enabled}
      onChange={handleToggle}
      className={classNames(
        enabled ? "bg-eco2MainColor" : "bg-[#808080]",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      )}
    >
      <span className="sr-only text-black">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
}
