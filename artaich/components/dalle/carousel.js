import { useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDalle } from '../../hooks/useDalle';
import { DataHistory } from '../../data/history';

const settings = {
  style: {},
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: 'black',
        borderRadius: '50%',
        textAlign: 'center',
        color: 'black',
        right: '1px'
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '50%',
        textAlign: 'center',
        color: 'black',
        left: '0',
        zIndex: '1'
      }}
      onClick={onClick}
    />
  );
}

export const Carousel = ({ setImageSrc }) => {
  const { user } = useContext(UserContext);
  const { data, isLoading, isError: error } = useDalle(user?.id);

  const handleImageClick = (firstImageSrc, secondImageSrc) => {
    console.log('image clicked');

    setImageSrc(() => ({
      firstImage: firstImageSrc,
      secondImage: secondImageSrc
    }));
  };
  // console.log('data is:', data?.data);

  if (isLoading)
    return (
      <div className=" shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse">
          <div className=" flex justify-center items-center gap-2">
            <div className="w-60 h-28 rounded-lg bg-slate-500"></div>
            <div className="w-60 h-28 rounded-lg bg-slate-500"></div>
          </div>
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="sm:mt-10 sm:mb-20 relative">
      <h2 className="absolute hidden sm:contents left-10 top-0 sm:text-xl lg:text-1xl text-gray-800">
        {DataHistory.LatestImages}
      </h2>
      {data?.data && (
        <Slider {...settings}>
          {data?.data.map((image) => (
            <div key={image?.id}>
              <div className=" flex justify-center items-center gap-2 ">
                <img
                  src={`data:image/jpeg;base64,${image?.attributes?.payload_out?.resp[0]?.b64_json}`}
                  alt={`Dalle Image `}
                  className=" rounded-lg object-cover cursor-pointer hover:opacity-80"
                  width={160}
                  height={100}
                  onClick={() =>
                    handleImageClick(
                      image?.attributes?.payload_out?.resp[0]?.b64_json,
                      image?.attributes?.payload_out?.resp[1]?.b64_json
                    )
                  }
                />
                <img
                  src={`data:image/jpeg;base64,${image?.attributes?.payload_out?.resp[1]?.b64_json}`}
                  alt={`Dalle Image `}
                  className=" rounded-lg object-cover cursor-pointer hover:opacity-80"
                  width={160}
                  height={100}
                  onClick={() =>
                    handleImageClick(
                      image?.attributes?.payload_out?.resp[0]?.b64_json,
                      image?.attributes?.payload_out?.resp[1]?.b64_json
                    )
                  }
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
