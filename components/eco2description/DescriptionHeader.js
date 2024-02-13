import Typewriter from 'typewriter-effect';
import { DataEco2Description } from "../../data/eco2description"
export const DescriptionHeader = ({ setShowMatDescription }) => {
  return (
    <header className="text-start mt-20">
      <h1 className="text-2xl sm:text-4xl xl:text-6xl font-bold mb-8">
        {DataEco2Description.Our} {' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">
          {DataEco2Description.MattDescriptionIA}
        </span>
        <br />
        {DataEco2Description.PlatformEnable}
      </h1>

      <div className="text-xl">
        {DataEco2Description.Captivanting}
        <Typewriter
          options={{
            strings: [
              (DataEco2Description.TargetAudience),
              (DataEco2Description.Conversions),
              (DataEco2Description.Leads),
              (DataEco2Description.Revenue)
            ],
            autoStart: true,
            cursor: '|',
            loop: true,
            delay: 35,
            wrapperClassName:
              'text-transparent bg-clip-text bg-gradient-to-r text-xl from-indigo-900 to-indigo-600'
          }}
        />
        {DataEco2Description.EnjoyShare}
      </div>

      <button
        onClick={() => setShowMatDescription((prev) => !prev)}
        className="w-full md:w-10/12 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full mt-8"
      >
        {DataEco2Description.Start}
      </button>
    </header>
  );
};