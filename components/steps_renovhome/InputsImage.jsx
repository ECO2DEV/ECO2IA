
import { Button } from "../ui/Button";
import TimeLine from "./TimeLine";
import  OverlappingInput  from "../ui/OverlappingInput";
import { CardAnimation } from "../ui/CardAnimation";
import {
  roomOptions,
  aiInterventionOptions,
  aiModeOptions,
  designStyleOptions,
  numberDesignsOptions
} from '../../constants/constans';

import SyncLoader from 'react-spinners/SyncLoader';
import { MagicAiIcon } from "../icons/icons";

export const InputsImage = ({ formData }) => {
 
  return (
    <CardAnimation>
      <article className="relative bg-image hidden lg:flex justify-center w-full h-[80vh] md:w-[35rem] gap-4 rounded-lg ">
        <h1 className="absolute top-10 left-[%] xl:top-20 text-white text-3xl">
          RENOV MARIA
        </h1>
        <TimeLine />
      </article>
      <div className="w-full md:w-[35rem] flex flex-col gap-10 px-4 md:mx-auto">
        <OverlappingInput
          type="select"
          name="Zona"
          id="roomType"
          placeholder="Living room"
          options={roomOptions}
        />

        <OverlappingInput
          type="select"
          name="Nivel de intervención de IA"
          id="aiIntervention"
          placeholder="Medium Intervention"
          options={aiInterventionOptions}
        />

        <OverlappingInput
          type="select"
          name="Modo"
          id="mode"
          placeholder="Beautiful Redesign"
          options={aiModeOptions}
        />

        <OverlappingInput
          type="select"
          name="Estilo del diseño"
          id="designStyle"
          placeholder="Eclectic"
          options={designStyleOptions}
        />

        <OverlappingInput
          type="select"
          name="Cantidad de diseños"
          id="numberDesigns"
          placeholder="1"
          options={numberDesignsOptions}
        />

        <div className="flex justify-end">
          <Button
            
            className="bg-slate-900 hover:bg-slate-100 hover:text-gray-900 font-medium text-white py-4 rounded"
          >
            {formData.isLoadingImg ? (
              <div className="flex justify-between items-center gap-2">
                Loading <SyncLoader color="#36d7b7" size={6} />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">Generate <MagicAiIcon /></div>
              
            )}
          </Button>
        </div>
      </div>
    </CardAnimation>
  );
};
