
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

export const InputsImage = ({ formData }) => {
 
  return (
    <CardAnimation>
      <article className="relative bg-image hidden lg:flex justify-center w-full h-[80vh] md:w-[35rem] gap-4 rounded-lg ">
        <h1 className="absolute top-10 left-[%] xl:top-20 text-white text-3xl">
          RENOVHOME
        </h1>
        <TimeLine />
      </article>
      <div className="w-full md:w-[35rem] flex flex-col gap-10 px-4 md:mx-auto">
        <OverlappingInput
          type="select"
          name="Room type"
          id="roomType"
          placeholder="Living room"
          options={roomOptions}
        />

        <OverlappingInput
          type="select"
          name="AI Intervention Type"
          id="aiIntervention"
          placeholder="Medium Intervention"
          options={aiInterventionOptions}
        />

        <OverlappingInput
          type="select"
          name="AI Mode"
          id="mode"
          placeholder="Beautiful Redesign"
          options={aiModeOptions}
        />

        <OverlappingInput
          type="select"
          name="Design Style"
          id="designStyle"
          placeholder="Eclectic"
          options={designStyleOptions}
        />

        <OverlappingInput
          type="select"
          name="Number of designs"
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
              'Generate'
            )}
          </Button>
        </div>
      </div>
    </CardAnimation>
  );
};
