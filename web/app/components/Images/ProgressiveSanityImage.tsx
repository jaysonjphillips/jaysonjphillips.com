import React from "react";
import useProgressiveImg from "~/hooks/useProgressiveImage";
import { calculateResponsiveImageDimensions, getProgressiveSanityImageUrls, SanityMainImage } from "~/lib/images";

export type ProgressiveSanityImageProps = {
  mainImage: SanityMainImage;
  hf: number;
  width: number;
  classNames?: string;
  action?: () => void;
}

export default function ProgressiveSanityImage({mainImage, hf, width, classNames, action = null}: any) {

  const dimensions = calculateResponsiveImageDimensions(hf, width);
  const urls = getProgressiveSanityImageUrls({mainImage, dimensions});
  const {src, shouldBlur} = useProgressiveImg(urls.low, urls.high);

  return (
    <img
      className={`object-cover rounded-lg ${classNames || ""}`}
      src={src}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        filter: shouldBlur ? "blur(20px)" : "none",
        transition: shouldBlur ? "none" : "filter 0.3s ease-out"
      }}
      onClick={action ? () => action(urls.high) : undefined }
      alt={mainImage.alt}
    />
  );
}