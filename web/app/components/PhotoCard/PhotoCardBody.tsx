import { Link } from "@remix-run/react";

export default function PhotoCardBody({mainImage, galleryImages}: any) {
    return (
        <p className="space-y-12 mt-2 pb-8 max-w-lg text-lg text-white sm:max-w-3xl">
            {mainImage && mainImage.caption} | {galleryImages && galleryImages.length} photos | <Link to={''}>View Gallery</Link>
        </p>
    )
}