import Image from 'next/image';
import { Carousel } from '../../components/ui/CarouselRenovhome';

export const OutputImgStep = ({ formData }) => {

  return (
    <section className=" flex justify-center items-center">
      {formData.aiImages ? (
        <Carousel images={formData.aiImages.url} />
      ) : (
        <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <Image
            src={'/upload-icon.webp'}
            alt=" preview image"
            className={`lg:w-full lg:h-full object-cover  align-middle rounded-lg border border-dashed border-gray-800 opacity-80 hover:opacity-100 hover:shadow-lg opacity-70 transition-all duration-100`}
            width={600}
            height={600}
          />
        </div>
      )}
    </section>
  );
};
