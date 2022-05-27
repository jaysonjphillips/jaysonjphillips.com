import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProgressiveSanityImage from "./ProgressiveSanityImage";

export default function Lightbox({mainImage, hf, width, alt, caption}: any) {
  
  const [currentImage, setCurrentImage] = useState("");
  const [ lightbox, showLightbox] = useState(false);

  const openLightbox = (image: string) => {
    setCurrentImage(image);
    showLightbox(true);
  }

  const closeLightbox = () => {
      showLightbox(false);
      setCurrentImage("")
  }

  const transition = { duration: 0.5, ease: "easeInOut" };

    const postVariants = {
        initial: { scaleY: 0, scaleX: 0, opacity: 0 },
        enter: { scaleY: 1, scaleX: 1, opacity: 1, transition },
        exit: { scaleY: 0, scaleX: 0, opacity: 0, transition }
    }; 

    const finalWidth = width > 1264 ? 1264 : width;
    const finalHF = width > 1000 ? 13 : 18;

  return (
      <>
        <ProgressiveSanityImage mainImage={mainImage} width={390} hf={13} action={openLightbox} />
        <AnimatePresence exitBeforeEnter>

        {lightbox && (
            <motion.div
                key={`${mainImage.asset._id}-motion`}
                initial="exit"
                animate="enter"
                exit="exit"
                variants={postVariants} className="lightbox"  onClick={() => closeLightbox()}>
                
                <div style={{width: "auto"}}>
                    <ProgressiveSanityImage mainImage={mainImage} width={finalWidth} hf={finalHF} action={openLightbox} classNames={"lightbox-image block mx-auto"} />
                    <p className="lightbox-caption block work-sans font-semibold text-center">Caption: {caption || alt}</p>
                    <button onClick={closeLightbox} className="lightbox-close block mx-auto px-4 py-2 rounded-lg border-red-800 border-2 text-white font-semibold">Close</button>
                </div>
                
            </motion.div>
        )}
        </AnimatePresence>
      </>
  )
}