import Typewriter from 'typewriter-effect';

export const DescriptionHeader = ({ setShowMatDescription }) => {
  return (
    <header className="text-start mt-20">
      <h1 className="text-2xl sm:text-4xl xl:text-6xl font-bold mb-8">
        Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">
          MatDescription AI-powered
        </span>
        <br />
        platform enables you to
      </h1>

      <div className="text-xl">
        Effortlessly craft captivating
        <Typewriter
          options={{
            strings: [
              'Content that hooks your target audience',
              'Content that drives conversions',
              'Content that generates leads',
              'Content that increases revenue'
            ],
            autoStart: true,
            cursor: '|',
            loop: true,
            delay: 35,
            wrapperClassName:
              'text-transparent bg-clip-text bg-gradient-to-r text-xl from-indigo-900 to-indigo-600'
          }}
        />
        Enjoy and Share !!
      </div>

      <button
        onClick={() => setShowMatDescription((prev) => !prev)}
        className="w-full md:w-10/12 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full mt-8"
      >
        Start
      </button>
    </header>
  );
};
