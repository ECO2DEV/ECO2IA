import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

import { createIAContactMessage } from "../../util/api/iaContact";
import Loader from "../loader/loader";
import { DataNosIA } from "../../data/nosia";
import { FileUpload } from "../files/FileUpload";

Modal.setAppElement("#__next");

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     border: "1px solid #66BB6A",
//     width: "90%",
//     maxWidth: "600px",
//   },
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//   },
// };

const modalBackdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalContent = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const animationDuration = 1000;

const modalVariants = {
  hidden: {
    y: -50,
    opacity: 0,
    transition: { duration: 1000 / 2000 },
  },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function LandingPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    ImageIAS: [],
    IADetail: "",
  });
  const [files, setFiles] = useState([]);

  const openModal = async () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleIAContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData.name === "" ||
      formData.Email === "" ||
      formData.IADetail === ""
    ) {
      toast.error(DataNosIA.NosIAPleaseFill);
      setLoading(false);
      return;
    }

    if (!formData.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }
    if (!formData.Email) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append(
        "data",
        JSON.stringify({
          name: formData.name,
          Email: formData.Email,
          IADetail: formData.IADetail,
        })
      );

      console.log(formPayload);

      files.forEach((file) => {
        formPayload.append("file.ImageIAS", file, file.name);
      });

      const response = await createIAContactMessage({ formData: formData });

      console.log(response);
      if (response.status === 200) {
        toast.success(DataNosIA.NosIAMessageSent);
        setConfirmationMessage(
          "Info enviada, nos pondremos en contacto contigo en breve."
        );
        setFormData({
          name: "",
          Email: "",
          ImageIAS: [],
          IADetail: "",
        });
        setFiles([]);
      } else {
        toast.error("Hubo un problema al enviar los datos.");
      }
    } catch (error) {
      console.error(error);
      toast.error(DataNosIA.NosIASomethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div
              className="absolute w-full max-w-xl mx-auto rounded-3xl bg-purple-500 shadow-2xl"
              style={{ transform: "rotate(-5deg)" }}
            ></div>
            <motion.div
              className="absolute w-[42%] h-[90%] p-10 transform bg-[#bb08e8] rounded-3xl sm:max-w-xl sm:mx-auto -rotate-2"
              initial={{ scale: 0 }}
              animate={{ rotate: 8, scale: 1 }}
              exit={{ rotate: 8, scale: 0 }}
              transition={{ delay: 0.1 }}
            />

            <motion.div
              className="absolute w-[42%]  h-[90%] p-10 transform bg-[#8d2100] rounded-3xl shadow-xl"
              initial={{ scale: 0 }}
              animate={{ rotate: -8, scale: 1 }}
              exit={{ rotate: -8, scale: 0 }}
              transition={{ delay: 0.1 }}
            />

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              closeTimeoutMS={animationDuration}
              className="mt-6 relative z-10 rounded-lg  sm:max-w-xl sm:mx-auto"
              overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
              <motion.div
                className="relative px-4 py-10 modalBackground  sm:rounded-3xl sm:p-20"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <button onClick={closeModal} className="absolute top-2 right-2">
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>

                <div className="text-center">
                  <h1 className="mt-2 text-2xl font-bold animate-text-gradient bg-gradient-to-r from-[#21C284] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent">
                    Únete a ECO2 IA's 🍃
                  </h1>
                  <p className="mt-2 text-sm text-gray-100">
                    Únete a nuestro ecosistema de IA y comparte tu inteligencia
                    artificial con miles de usuarios. Completa el formulario y
                    nos pondremos en contacto contigo.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-1/2 px-2">
                      <label className="font-bold text-white" htmlFor="name">
                        Nombre
                      </label>
                      <input
                        onChange={(e) => handleIAContactChange(e)}
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        required
                        className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-2">
                      <label className="font-bold text-white" htmlFor="Email">
                        Email
                      </label>
                      <input
                        onChange={(e) => handleIAContactChange(e)}
                        type="email"
                        name="Email"
                        id="Email"
                        value={formData.Email}
                        required
                        className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="font-bold py-2 text-white"
                      htmlFor="ImageIAS"
                    >
                      Imagenes
                    </label>
                    <FileUpload files={files} setFiles={setFiles} />
                  </div>

                  <div>
                    <label className="font-bold text-white" htmlFor="IADetail">
                      Detalle de la IA
                    </label>
                    <textarea
                      onChange={(e) => handleIAContactChange(e)}
                      name="IADetail"
                      id="IADetail"
                      value={formData.IADetail}
                      required
                      className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                    {loading ? (
                      <Loader />
                    ) : (
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        className="inline-flex h-full w-32 cursor-pointer items-center justify-center rounded-full border border-white bg-[#21C284] px-4 py-2 font-semibold text-white hover:bg-green-700 transition-colors duration-300"
                      >
                        Enviar 🍃
                      </motion.button>
                    )}
                  </div>
                </form>
                {confirmationMessage && (
                  <div className="text-center mt-4 text-green-800">
                    {confirmationMessage}
                  </div>
                )}
              </motion.div>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={openModal}
        className="bg-green-600 mt-3 text-white font-semibold border-white py-1 px-2 rounded-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Click, Aquí!
      </motion.button>
    </section>
  );
}

export default LandingPage;


{/* <motion.div
className="fixed inset-0 flex items-center justify-center"
variants={modalBackdrop}
initial="hidden"
animate="visible"
exit="hidden"
>
<div
  className="absolute w-full max-w-xl mx-auto rounded-3xl bg-purple-500 shadow-2xl"
  style={{ transform: "rotate(-5deg)" }}
></div>
<motion.div
  className="absolute w-[40%] h-[90%] p-10 transform bg-[#bb08e8] rounded-3xl shadow-xl -rotate-2"
  initial={{ scale: 0 }}
  animate={{ rotate: 8, scale: 1 }}
  exit={{ rotate: 8, scale: 0 }}
  transition={{ delay: 0.1 }}
/>

<motion.div
  className="absolute w-[42%]  h-[90%] p-10 transform bg-[#08e810] rounded-3xl shadow-xl"
  initial={{ scale: 0 }}
  animate={{ rotate: 0, scale: 1 }}
  exit={{ rotate: 0, scale: 0 }}
  transition={{ delay: 0.1 }}
/>

<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  closeTimeoutMS={animationDuration}
  className="mt-6 relative z-10 modalBackground rounded-lg  sm:max-w-xl sm:mx-auto"
  overlayClassName="fixed inset-0 bg-black bg-opacity-75"
>
  <motion.div
    className="relative px-4 py-10 modalBackground  sm:rounded-3xl sm:p-20"
    variants={modalVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    <button onClick={closeModal} className="absolute top-2 right-2">
      <XMarkIcon className="h-6 w-6 text-white" />
    </button>

    <div className="text-center">
      <h1 className="mt-2 text-2xl font-bold animate-text-gradient bg-gradient-to-r from-[#21C284] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent">
        Únete a ECO2 IA's 🍃
      </h1>
      <p className="mt-2 text-sm text-gray-100">
        Únete a nuestro ecosistema de IA y comparte tu inteligencia
        artificial con miles de usuarios. Completa el formulario y
        nos pondremos en contacto contigo.
      </p>
    </div>
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 px-2">
          <label className="font-bold text-white" htmlFor="name">
            Nombre
          </label>
          <input
            onChange={(e) => handleIAContactChange(e)}
            type="text"
            name="name"
            id="name"
            value={formData.name}
            required
            className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
          />
        </div>
        <div className="w-full sm:w-1/2 px-2">
          <label className="font-bold text-white" htmlFor="Email">
            Email
          </label>
          <input
            onChange={(e) => handleIAContactChange(e)}
            type="email"
            name="Email"
            id="Email"
            value={formData.Email}
            required
            className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
          />
        </div>
      </div>

      <div>
        <label
          className="font-bold py-2 text-white"
          htmlFor="ImageIAS"
        >
          Imagenes
        </label>
        <FileUpload files={files} setFiles={setFiles} />
      </div>

      <div>
        <label className="font-bold text-white" htmlFor="IADetail">
          Detalle de la IA
        </label>
        <textarea
          onChange={(e) => handleIAContactChange(e)}
          name="IADetail"
          id="IADetail"
          value={formData.IADetail}
          required
          className="rounded-md bg-white text-gray-700 border-gray-300 w-full"
        ></textarea>
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loader />
        ) : (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="inline-flex h-full w-32 cursor-pointer items-center justify-center rounded-full border border-white bg-[#21C284] px-4 py-2 font-semibold text-white hover:bg-green-700 transition-colors duration-300"
          >
            Enviar 🍃
          </motion.button>
        )}
      </div>
    </form>
    {confirmationMessage && (
      <div className="text-center mt-4 text-green-800">
        {confirmationMessage}
      </div>
    )}
  </motion.div>
</Modal>
</motion.div> */}