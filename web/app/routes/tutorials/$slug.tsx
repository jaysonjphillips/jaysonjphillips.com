import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Portable from "~/components/PortableText";
import sanityClient from "../../lib/sanityClient";
import { motion } from "framer-motion";
import ProgressiveSanityImage from "~/components/Images/ProgressiveSanityImage";
import { format, parseISO } from "date-fns";
import { buildImageObj, imageUrlFor } from "~/lib/images";
import ByLine from "~/components/Author/ByLine";
import { getPostBySlug, Post } from "~/queries/posts";

export let loader: LoaderFunction = async ({ params }) => {
  return await getPostBySlug(params.slug || "")
};

export default function TutorialPost() {
  const data: Post = useLoaderData()[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.25, type: "tween" }}
    >
      <h1 className="title">{data.title}</h1>
      <section className="blog-post">
        <div className="relative inset-0 overflow-hidden rounded-lg pb-6">
          <ProgressiveSanityImage mainImage={data.mainImage} hf={5} width={1264} />
          {/* {mainImage && (<Img fluid={mainImage.asset.fluid} />)} */}
          <div
            className="absolute inset-0 bg-gray-500"
            style={{ mixBlendMode: "soft-light" }}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-8">
          <div className="col-span-2">
            <Portable blocks={data.body} />
          </div>
          <div>
            <p>This post was written by {data.author.name}. 
              It was published in <strong>{data.categories.title}</strong> 
              {` `} on {format(parseISO(data.publishedAt), "EEEE, MMMM do, yyyy")}
              {data._updatedAt
                ? ` and last updated on ${format(parseISO(data._updatedAt), "EEEE, MMMM do, yyyy")}`
                : ""}.
            </p>
          </div>
        </div>

        <ByLine author={data.author} />
      </section>
    </motion.div>
  );
}
