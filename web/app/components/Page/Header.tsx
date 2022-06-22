import React from 'react'
import { buildImageObj, imageUrlFor } from '~/lib/images';
import ProgressiveSanityImage from '../Images/ProgressiveSanityImage';

function PageHeader(props: any) {
    const {title, mainImage} = props

    return (
        <div className="mb-8">
            <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gray-100 rounded-xl" />
                <div className="max-w-6xl mx-auto sm:px-2">
                    <div className="shadow-xl sm:overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                            <ProgressiveSanityImage mainImage={mainImage} hf={7} width={1264} />
                            <div className="absolute inset-0 bg-gray-500" style={{mixBlendMode: 'multiply'}} />
                        </div>
                        <div className="relative px-2 sm:px-0 pt-64 pb-8 sm:pt-28 sm:pb-2 lg:pt-16 lg:mt-16 mx-auto">
                            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl">
                                <span className="text-slate-50 title poppins">{title.toLowerCase()}</span>
                                <span className="block text-2xl text-white">{''}</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <p className="space-y-12 mt-2 pb-8 max-w-lg text-sm text-white sm:max-w-3xl">
                {mainImage && mainImage.caption}
            </p>
        </div>    
    )
}
export default PageHeader;