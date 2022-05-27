import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Portable from "~/components/PortableText";
import { motion } from "framer-motion";
import ProgressiveSanityImage from "~/components/Images/ProgressiveSanityImage";
import { format, parseISO } from "date-fns";
import { getPostBySlug, Post } from "~/queries/posts";
import ByLine from "~/components/Author/ByLine";

export let loader: LoaderFunction = async ({ params }) => {
  return await getPostBySlug(params.slug || "");
};

const transition = { duration: 0.85, ease: "easeInOut" };

const postVariants = {
  initial: { x: -500, opacity: 0 },
  enter: { x: 0, opacity: 1, transition },
  exit: { x: 500, opacity: 0, transition },
};

export default function CategoryPost() {
  const data: Post = useLoaderData()[0];
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={postVariants}
      key={`${data._id}-post`}
    >
      <h1 className="title">{data.title}</h1>
      <section className="blog-post">
        <div className="relative inset-0 overflow-hidden rounded-lg mb-6">
          <ProgressiveSanityImage mainImage={data.mainImage} hf={5} width={1264} />

          <div
            className="absolute inset-0 bg-gray-700/60"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        <div className="blog-post-grid grid grid-cols-3 gap-x-8 mb-8">
          <div className="col-span-2">
            <Portable blocks={data.body} />
          </div>
          <div>
            <p>
              This post was published in{" "}
              <strong>{data.categories.title}</strong>
              {` `} on{" "}
              {format(parseISO(data.publishedAt), "EEEE, MMMM do, yyyy")}
              {data._updatedAt
                ? ` and last updated on ${format(parseISO(data._updatedAt), "EEEE, MMMM do, yyyy")}`
                : ""}
              .
            </p>
          </div>
        </div>
        <ByLine author={data.author} />
      </section>
    </motion.div>
  );
}
