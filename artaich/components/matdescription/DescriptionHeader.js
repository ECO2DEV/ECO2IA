import Typed from 'react-typed';

export const DescriptionHeader = ({ setShowMatDescription }) => {
  return (
    <header className="text-start -mt-20">
      <h1 className="text-2xl sm:text-4xl xl:text-6xl font-bold mb-8">
        Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          MatDescription AI-powered
        </span>
        <br />
        platform enables you to
      </h1>
      <div className="text-xl">
        Effortlessly craft captivating
        <br /> content that {''}
        <Typed
          strings={[
            'hooks your target audience',
            'drives conversions',
            'generates leads',
            'increases revenue'
          ]}
          typeSpeed={70}
          backSpeed={70}
          loop
          style={{ color: '#572364', fontWeight: 'bold', fontSize: '1.25rem' }}
        />
        <br />
        Enjoy and Share !!
      </div>

      <button
        onClick={() => setShowMatDescription((prev) => !prev)}
        className="w-full md:w-10/12 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full mt-8"
      >
        Start
      </button>
    </header>
  );
};
