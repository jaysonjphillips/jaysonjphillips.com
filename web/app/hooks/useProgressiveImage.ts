import React from "react";
const useProgressiveImg = (lowQualitySrc: string, highQualitySrc: string) => {
  const [src, setSrc] = React.useState<string>(lowQualitySrc);
  
  React.useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  let shouldBlur = src === lowQualitySrc;
  return {
    src, 
    shouldBlur
  };
};
export default useProgressiveImg;