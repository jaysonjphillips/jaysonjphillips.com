import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import imageUrlBuilder from "@sanity/image-url";
import { config } from "./sanityClient";

export type SanityImageAsset = {
  alt?: string;
  _id?: string;
  _ref?: string;
};

export type SanityRawImage = {
  hotspot?: { [index: string]: string };
  crop?: { [index: string]: string };
  asset: SanityImageAsset;
};

export type SanityMainImage = {
  asset?: {
    _id: string;
    _type?: string;
    url: string;
  };
  alt: string;
  caption?: string;
};

export type ResponsiveImageDimensions = {
  height: number;
  width: number;
  lowResWidth: number;
  lowResHeight: number;
}

const builder = imageUrlBuilder(config);

export function imageUrlFor(source: any) {
  return builder.image(source);
}

export function buildImageObj(source: SanityRawImage = { asset: { alt: "" } }) {
  const imageObj: SanityRawImage = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export const defaultImageUrl =
  "https://cdn.sanity.io/images/p6sl7ohb/production/025dbbdda584fd1815965c6dc71770d7795acd78-1920x1282.jpg?w=1440&h=962&fit=crop&fm=webp";

export function getDefaultImageUrlByDimensions(
  width: number,
  height: number
): string {
  return `https://cdn.sanity.io/images/p6sl7ohb/production/025dbbdda584fd1815965c6dc71770d7795acd78-1920x1282.jpg?w=${width}&h=${height}&fit=crop&fm=webp`;
}

export const calculateResponsiveImageDimensions = (hf: number, width: number): ResponsiveImageDimensions => {
    const ratio: any = ((hf / 23) * width / width).toFixed(2);

    return {
        height: Math.floor((hf / 23) * width),
        width: width,
        lowResHeight: Math.floor(Math.floor((hf / 23) * width) / (ratio * 100)),
        lowResWidth: Math.floor(width / (ratio * 100))
    }
}

export const getHeaderImageUrl = (
  image: SanityRawImage,
  heightFactor = 16,
  width = 1080
) => {

  const url = (image &&  image.asset)
    ? imageUrlFor(buildImageObj(image))
        .width(width)
        .height(Math.floor((heightFactor / 23) * width))
        .fit("crop")
        .auto("format")
        .url()
    : getDefaultImageUrlByDimensions(
        1080,
        Math.floor((heightFactor / 23) * width)
      );

      return url;
};

export const generateSanityImageUrl = (mainImage: any, height: number, width: number): string => {
    return (mainImage &&  mainImage.asset) ? 
        imageUrlFor(buildImageObj(mainImage))
        .width(width)
        .height(height)
        .fit("crop")
        .auto("format")
        .url() :
        getDefaultImageUrlByDimensions(width, height);
}

export const getProgressiveSanityImageUrls = ({mainImage, dimensions}: {mainImage: SanityMainImage, dimensions: ResponsiveImageDimensions}): {low: string, high: string} => {
        const highResUrl = generateSanityImageUrl(mainImage, dimensions.height, dimensions.width);
        const lowResUrl = generateSanityImageUrl(mainImage, dimensions.lowResHeight, dimensions.lowResWidth);

        return {
            low: lowResUrl,
            high: highResUrl
        }
    }
