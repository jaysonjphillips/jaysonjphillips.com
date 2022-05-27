import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import CategoryPostIndex from "~/components/CategoryPostIndex";
import sanityClient from "~/lib/sanityClient";
import { motion } from "framer-motion"

export let loader: LoaderFunction = async ({ params }) => {
    return await sanityClient.fetch(
        `*[_type == "post" && lower(categories[0]->title) == "blog"] | order(publishedAt desc){_id, title, excerpt, slug, publishedAt, categories[0]->{title, description}, description, readingTime, author->{name, imageUrl}, "mainImage": {"asset": mainImage.asset->{_id, url}, "alt": mainImage.alt, "caption":mainImage.caption}}`
    );
  };
  
const transition = { duration: 0.75, ease: "easeInOut" };

const postVariants = {
    initial: { x: -500, opacity: 0 },
    enter: { x: 0, opacity: 1, transition },
    exit: { x: 500, opacity: 0, transition },
};

export default function BlogIndex() {
    const content = useLoaderData().slice(0, 5);
    return (
        <motion.div 
        initial="initial"
        animate="enter"
        exit="exit"
        variants={postVariants}
        key={"blog-index"}>
            <h1 className="title">All things blog.</h1>
            <CategoryPostIndex posts={content} />
            <Link to={`/blog/archive`} className="text-gray-500 poppins font-semibold text-xl">View all posts</Link>
        </motion.div>
    )
}