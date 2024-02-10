import { useState, useContext, useEffect } from "react";
import { PromptContext } from "../../context/prompts/PromptContext";
import { UserContext } from "../../context/user/UserContext";
import { useDalle } from "../../hooks/useDalle";
import { DalleResponse } from "../../util/api/dalleResponse";
import { WelcomeDalle } from "./welcomedalle";
import { ButtonHelper } from "../welcome/buttonHelper";

import { toast } from "react-hot-toast";
import { Carousel } from "./carousel";
import { DropdownDalle } from "./dropdown_dalle";
import { ButtonLatestImg } from "./buttonLatestImg";
import SearchTextboxDalle from "../searchTextbox/searchTextboxDalle";
import { DataEco2Image } from "../../data/eco2image";

export default function DalleIA() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [imageSrc, setImageSrc] = useState({
    firstImage: "",
    secondImage: "",
  });
  const [openHelpers, setOpenHelpers] = useState(false);
  const [openLastestImages, setOpenLastestImages] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { user } = useContext(UserContext);
  const {
    prompt,
    setPrompt,
    setPromptTokens,
    setResponse,
    activeAI,
    setActiveAI,
    plan,
  } = useContext(PromptContext);

  const { data, mutate } = useDalle(user?.id);
  console.log('data:', data)

  useEffect(() => {
    if (activeAI !== "") {
      console.log('activeAI:', activeAI)
      setPrompt("");
    }
    setActiveAI("DalleIA");
    console.log("setActiveAI:", setActiveAI)
  }, []);

  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === "") {
      setPromptTokens(0);
    }
  };
  const FetchData = async (e) => {
    e.preventDefault();
    if (plan.max_imagens <= 0) {
      toast.error(DataEco2Image.YouHaveReachedLimit);
      return;
    }
    if (!prompt) {
      setIsError("Please type something before submit");
    } else {
      setIsLoading(true);
      try {
        const response = await DalleResponse({ prompt: prompt, user: user });
        const decodedFirstImage = response?.data?.data[0]?.b64_json;
        const decodedSecondImage = response?.data?.data[1]?.b64_json;
        setImageSrc({
          firstImage: decodedFirstImage,
          secondImage: decodedSecondImage,
        });
        mutate({ data: [...data.data, response?.data], ...data });
        setResponse(response?.data?.data);
        console.log('setResponse:', setResponse)
      } catch (error) {
        setIsError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
        setPrompt("");
        setOpenHelpers(false);
      }
    }
  };

  return (
    <section>
      {imageSrc.firstImage === "" ? (
        <WelcomeDalle />
      ) : openHelpers ? (
        <WelcomeDalle />
      ) : (
        <div className=" flex flex-col items-center my-10 gap-2">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <div className="flex-1 relative">
              {imageSrc !== "" ? (
                <>
                  <img
                    src={
                      imageSrc.firstImage &&
                      `data:image/jpeg;base64,${imageSrc.firstImage}`
                    }
                    onLoad={() => setShowDropdown(true)}
                    alt="dalle image"
                    className="w-[380px] h-[380px]"
                  />
                  <div
                    className={`${
                      showDropdown ? "absolute  top-10 " : "hidden"
                    }`}
                  >
                    <DropdownDalle imageSrc={imageSrc.firstImage} />
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex-1 relative">
              {imageSrc.secondImage !== "" ? (
                <>
                  <img
                    src={
                      imageSrc.secondImage &&
                      `data:image/jpeg;base64,${imageSrc.secondImage}`
                    }
                    onLoad={() => setShowDropdown(true)}
                    alt="dalle image"
                    className="w-[380px] h-[380px]"
                  />
                  <div
                    className={`${
                      showDropdown ? "absolute  top-10 " : "hidden"
                    }`}
                  >
                    <DropdownDalle imageSrc={imageSrc.secondImage} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        {data?.data.length > 0 && openLastestImages ? (
          <div className="w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem] mb-32 sm:mb-10">
            <Carousel setImageSrc={setImageSrc} />
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-3 w-full">
        <div className="flex justify-center  w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
            <SearchTextboxDalle
              OnChange={handleChange}
              Fetch={FetchData}
              loading={loading}
              prompt={prompt ? prompt : ''}
            />

          <div className="flex justify-center items-center gap-2 mb-4">
            <ButtonHelper onClick={() => setOpenHelpers((prev) => !prev)} />
            <ButtonLatestImg
              onClick={() => setOpenLastestImages((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
