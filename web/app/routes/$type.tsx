import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import CategoryPostIndex from "~/components/CategoryPostIndex";
import ProgressiveSanityImage from "~/components/Images/ProgressiveSanityImage";
import PageHeader from "~/components/Page/Header";
import Portable from "~/components/PortableText";
import sanityClient from "~/lib/sanityClient";
import { getSiteCategories } from "~/queries/categories";

export let loader: LoaderFunction = async ({ params }) => {
  const result = {
    type: "",
    content: []
  }
  const categories = await getSiteCategories();
  const isCategory = !!categories.find((cat: any) => cat.title.toLowerCase() == params.type)
  
  if(isCategory) {
    let posts = await sanityClient.fetch(
      `*[_type == "post" && lower(categories[0]->title) == "${params.type}"] | order(publishedAt desc){_id, title, excerpt, slug, publishedAt, categories[0]->{title, description}, description, readingTime, author->{name, imageUrl}, "mainImage": {"asset": mainImage.asset->{_id, url}, "alt": mainImage.alt, "caption":mainImage.caption}}`
    );

    return {
      type: "category",
      data: posts
    }
  } 
  
  if (!isCategory) {
    let result = await sanityClient.fetch(
      `*[_type == "page" && slug.current == "${params.type}"]{_id, title, body, _rawBody, excerpt, slug, _updatedAt, categories[0]->{title, description}, description, readingTime, author->{name, imageUrl}, "mainImage": {"asset": mainImage.asset->{_id, url}, "alt": mainImage.alt, "caption":mainImage.caption}}`
    );

    return {
      type: "static",
      data: result[0]
    }
  }

};

const transition = { duration: 0.5, ease: "easeInOut" };

const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition }
}; 

export default function CategoryPage() {
  const content = useLoaderData();
  const params = useParams();

  return (
    <>
      
      {content.type !== "static" && (
        <section className="content-index category-index">
          <h1 className="title">All things {params.type}.</h1>

          <h2 className="subtitle">{content.data[0]?.categories?.description || ""}</h2>
          <CategoryPostIndex posts={content.data} />
        </section>
      )}

      {content.type === "static" && (
        <>
          <motion.div 
            initial="exit"
            animate="enter"
            exit="exit"
            variants={postVariants}>
            
            <section className="content-index category-index">
              <h1 className="title">{content.data.title}</h1>
              <section className="blog-post">
                  <div className="relative inset-0 overflow-hidden rounded-lg pb-6">
                      {/* <img src={getHeaderImageUrl(data[0].mainImage, 7, 1264)} /> */}
                      <ProgressiveSanityImage mainImage={content.data.mainImage} hf={5} width={1264} />
                      <div className="absolute inset-0 bg-gray-500" style={{mixBlendMode: 'soft-light'}} />
                      {content.data.mainImage.caption && (
                        <p className="mt-2 pb-4 max-w-lg text-sm text-white sm:max-w-3xl">
                          {content.data.mainImage.caption}
                        </p>
                      )}
                      
                  </div>
                  <div className="grid grid-cols-3 gap-x-8">
                    <div className="col-span-2">
                      <Portable blocks={content.data.body} />
                    </div>
                    <div>
                      <p>Last updated on <strong>{format(parseISO(content.data._updatedAt), "EEEE, MMMM do yyyy")}</strong></p>
                    </div>
                  </div>
              </section>
            </section>
        </motion.div>
        </>
      )}
      </>

  );
}
