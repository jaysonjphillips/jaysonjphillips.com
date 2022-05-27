import { Link } from "@remix-run/react";
import { getHeaderImageUrl } from "~/lib/images";
import ProgressiveSanityImage from "../Images/ProgressiveSanityImage";

export default function PhotoCardHeader({ mainImage, slug, title}: any) {
  return (
    <div className="relative" key={title}>
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gray-100 rounded-xl shadow-lg" />
            <div className="mx-auto sm:px-2">
                <div className="shadow-xl sm:overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <ProgressiveSanityImage hf={6} mainImage={mainImage} width={1264} className="object-cover" />                         {/* {mainImage && (<Img fluid={mainImage.asset.fluid} />)} */}
                        <div className="absolute inset-0 bg-gray-500" style={{mixBlendMode: 'multiply'}} />
                    </div>
                    <div className="relative px-2 sm:px-0 pt-48 pb-4 lg:mt-8 mx-auto">
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl">
                        <Link to={`/photos/${slug.current}`}><span className="text-slate-50 text-5xl poppins font-bold">{title.toLowerCase()}</span></Link>
                            <span className="block text-2xl text-white">{''}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
  );
}