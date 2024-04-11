import { useContext } from "react";
import { PromptContext } from "../../context/prompts/PromptContext";
import { SunIcon, ZapIcon, WarningIcon } from "../icons/icons";
import {
  DataSportHelpExample,
  DataSportHelpCapabilities,
  DataSportHelpLimitation,
} from "../../data/sporthelper";
import { SportCoachIA } from "./Eco2SportCoachIA";

export const WelcomeSportCoach = (props) => {
  const { setPrompt } = useContext(PromptContext);

  // flex flex-col gap-1 w-full sm:max-w-md m-auto

  return (
<div className="p-6 md:p-10 lg:p-14 bg-darkBg"> {/* Consider adding a background class if necessary */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
  {/* Each column container */}
  <div className="space-y-6">
    <h2 className="text-xl text-gray-900 dark:text-white font-semibold mb-4 flex justify-center items-center gap-2">
      <SunIcon /> Pasos
    </h2>
    {/* Steps list */}
    {DataSportHelpExample.map((step, index) => (
      <p key={index} className="text-sm text-center md:text-base p-3 rounded-md bg-eco2MainColor">
        {step} →
      </p>
    ))}
  </div>
  <div className="space-y-6">
    <h2 className="text-xl text-gray-900 dark:text-white font-semibold mb-4 flex justify-center items-center gap-2">
      <ZapIcon /> Capacidades
    </h2>
    {/* Capabilities list */}
    {DataSportHelpCapabilities.map((capability, index) => (
      <p key={index} className="text-sm text-center md:text-base p-3 rounded-md bg-eco2MainColor">
        {capability}
      </p>
    ))}
  </div>
  <div className="space-y-6">
    <h2 className="text-xl text-gray-900 dark:text-white font-semibold mb-4 flex justify-center items-center gap-2">
      <WarningIcon /> Limitaciones
    </h2>
    {/* Limitations list */}
    {DataSportHelpLimitation.map((limitation, index) => (
      <p key={index} className="text-sm text-center md:text-base p-3 rounded-md bg-eco2MainColor">
        {limitation}
      </p>
    ))}
  </div>
</div>
</div>
  );
};


