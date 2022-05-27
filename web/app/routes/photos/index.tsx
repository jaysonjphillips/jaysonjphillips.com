import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import sanityClient from "~/lib/sanityClient";
import { motion } from "framer-motion"
import PhotoCardHeader from "~/components/PhotoCard/PhotoCardHeader";
import PhotoCardBody from "~/components/PhotoCard/PhotoCardBody";

export const loader: LoaderFunction = async () => {
    return await sanityClient.fetch(
        `*[_type == "galleryPost"] | order(_createdAt desc)`
      );
}

const transition = { duration: 0.5, ease: "easeInOut" };

const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition }
}; 

export default function BlogIndex() {
    const data = useLoaderData().slice(0, 5);
    return (
        <motion.div 
        initial="initial"
        animate="enter"
        exit="exit"
        variants={postVariants}>
            <h1 className="title">All things photos.</h1>
            {data.map((post: any, idx: number) => (
                <div key={idx} className="py-6">
                    <PhotoCardHeader {...post} />
                    <PhotoCardBody {...post} />
                </div>
            ))}
        </motion.div>
    )
}
