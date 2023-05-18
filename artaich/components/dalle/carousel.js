import { useContext, useState } from 'react';
import Image from 'next/image';
import { UserContext } from '../../context/user/UserContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDalle } from '../../hooks/useDalle';

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

export const Carousel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(UserContext);
  const { data, isLoading, isError: error } = useDalle(user?.id);

  // const handleImageClick = (index) => {
  //   setSelectedImage(images[index]);
  // };
  console.log('data is:', data?.data);

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
    <div>
      <div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image"
            className="w-80 h-40 rounded-lg object-cover"
          />
        )}
      </div>
      {data?.data && (
        <Slider {...settings}>
          {data?.data.map((image, index) => (
            <div key={image?.id}>
              <div
                className=" flex justify-center items-center gap-2"
                // onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image?.attributes?.payload_out?.resp[0]?.url}
                  alt={`Image ${index}`}
                  className=" rounded-lg object-cover"
                  width={150}
                  height={90}
                />
                <Image
                  src={image?.attributes?.payload_out?.resp[1]?.url}
                  alt={`Image ${index}`}
                  className=" rounded-lg object-cover"
                  width={150}
                  height={90}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
