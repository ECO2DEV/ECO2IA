'use client'
import Image from "next/image";
import {  useRef, useState } from "react"
import { useDebounceEffect } from "../../hooks/useDebounceEffect";
import { canvasPreview } from "../../components/ui/canvasPreview";
import { steps } from "../../constants/constans";
import { Button } from "../ui/Button";
import ReactCrop, {
  centerCrop,
  makeAspectCrop
} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import SyncLoader from "react-spinners/SyncLoader";
import {motion} from "framer-motion";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function MaskImageStep({ formData, setFormData, handleNext }) {
 
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const [isCropLoading, setIsCropLoading] = useState(false);


  function onImageLoad(e) {
    if (formData.aspect) {
      // const { width, height } = e.currentTarget;
      setFormData((prev) => ({
        ...prev,
        crop: centerAspectCrop(formData.originalSize.width, formData.originalSize.height, formData.aspect)
      }));
    }
    setFormData((prev) => ({ ...prev, imageWidth: formData.originalSize.width, imageHeight: formData.originalSize.height }));
    
  }

  async function onDownloadCropClick(e) {
    e.preventDefault();
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;


    if (!image || !previewCanvas || !formData.completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    setIsCropLoading(true);

    // console.log('image', image, 'previewCanvas', previewCanvas, 'formData', formData.completedCrop);
    const offscreen = new OffscreenCanvas(formData.originalSize.width, formData.originalSize.height);
    const ctx = offscreen.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }
    // Draw the entire image onto the offscreen canvas
    ctx.drawImage(image, 0, 0);

    //  erasing the cropped region,
    ctx.clearRect(
      formData.completedCrop.x,
      formData.completedCrop.y,
      formData.originalSize.width,
      formData.originalSize.height
    );

    
    // const fileName = 'cropimage.png';  // Cambiar a tu nombre de archivo deseado
    const blob = await offscreen.convertToBlob({
      type: 'image/png'
    });

    // Supongamos que `blob` es el Blob que quieres convertir a base64.
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64data = reader.result;
      setFormData((prev) => ({ ...prev, imageCropped: base64data }));
      // Aquí puedes utilizar `base64data` como una cadena base64 de la imagen.
    };
    reader.readAsDataURL(blob);
    setTimeout(() => {
      steps[1].status = 'complete';
      steps[2].status = 'current';
      setIsCropLoading(false);
      handleNext();
    }, 1000);


    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current);
    // }

    // blobUrlRef.current = URL.createObjectURL(blob);

    // // No es necesario cambiar el atributo 'download' en este caso
    // hiddenAnchorRef.current.href = blobUrlRef.current;
    // hiddenAnchorRef.current.download = fileName;
    // hiddenAnchorRef.current.click();

  }

  useDebounceEffect(
    async () => {
      if (
        formData?.completedCrop?.width &&
        formData?.completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          formData.completedCrop,
      
        );
      }
    },
    100,
    [formData.completedCrop]
  );
  return (
    <motion.section
    className=" flex flex-col items-center px-4 gap-2"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
      scale: {
        type: 'spring',
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
      }
    }}
      
    >
      {!!formData.imgSrc && (
        <ReactCrop
          crop={formData.crop}
          onChange={(_, percentCrop) =>
            setFormData((prev) => ({ ...prev, crop: percentCrop }))
          }
          onComplete={(c) =>
            setFormData((prev) => ({ ...prev, completedCrop: c }))
          }
          aspect={formData.aspect}
          width={formData.originalSize.width}
          height={formData.originalSize.height}
          minHeight={100}
          
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={formData.imgSrc}
            // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
            // width={formData.originalSize.width}
            // height={formData.originalSize.height}
            className="md:w-[600px] lg:w-[700px] rounded-xl"
          />
        </ReactCrop>
      )}
      {!!formData.completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: formData.originalSize.width,
                height: formData.originalSize.height,
                display: 'none'
              }}
            />
          </div>
          <div className="w-full md:w-max flex justify-end">
            <div className="">
              <Button onClick={onDownloadCropClick}>
                {' '}
                {isCropLoading ? (
                  <div className="flex justify-between">
                    <p>Loading {'  '}</p>{' '}
                    <SyncLoader color="#36d7b7" size={6} />
                  </div>
                ) : (
                  'Crop Image'
                )}
              </Button>
            </div>
            
          </div>
        </>
      )}
    </motion.section>
  );
}
