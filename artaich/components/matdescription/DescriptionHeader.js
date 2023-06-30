import Typewriter from 'typewriter-effect';
import { DataMattDescription } from "../../data/mattdescription"
export const DescriptionHeader = ({ setShowMatDescription }) => {
  return (
    <header className="text-start mt-20">
      <h1 className="text-2xl sm:text-4xl xl:text-6xl font-bold mb-8">
        {DataMattDescription.Our} {' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">
          {DataMattDescription.MattDescriptionIA}
        </span>
        <br />
        {DataMattDescription.PlatformEnable}
      </h1>

      <div className="text-xl">
        {DataMattDescription.Captivanting}
        <Typewriter
          options={{
            strings: [
              (DataMattDescription.TargetAudience),
              (DataMattDescription.Conversions),
              (DataMattDescription.Leads),
              (DataMattDescription.Revenue)
            ],
            autoStart: true,
            cursor: '|',
            loop: true,
            delay: 35,
            wrapperClassName:
              'text-transparent bg-clip-text bg-gradient-to-r text-xl from-indigo-900 to-indigo-600'
          }}
        />
        {DataMattDescription.EnjoyShare}
      </div>

      <button
        onClick={() => setShowMatDescription((prev) => !prev)}
        className="w-full md:w-10/12 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full mt-8"
      >
        {DataMattDescription.Start}
      </button>
    </header>
  );
};
