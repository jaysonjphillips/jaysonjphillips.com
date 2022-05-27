import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMonth, getYear } from "date-fns";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "~/components/GalleryCard";
import Lightbox from "~/components/Images/Lightbox";
import ProgressiveSanityImage from "~/components/Images/ProgressiveSanityImage";
import PhotoCardHeader from "~/components/PhotoCard/PhotoCardHeader";
import Portable from "~/components/PortableText";
import {
  getPhotoGalleryBySlug,
  getPhotoGalleryRefsBySlug,
  getWidthAndHeightFromRef,
} from "~/queries/photos";
import sanityClient from "../../lib/sanityClient";

export let loader: LoaderFunction = async ({ params }) => {
  const slug: string = params.slug || "";
  const post = await getPhotoGalleryRefsBySlug(slug);
  const date = new Date(post[0]._createdAt);
  return { date, ...post[0] };
};

export default function GalleryPost() {
  const data = useLoaderData();
  return (
    <div key={data._id}>
      <h1 className="title">{data.title}</h1>
      <section key="header" className="blog-post">
        <div className="relative inset-0 overflow-hidden rounded-lg pb-6">
          <ProgressiveSanityImage mainImage={data.mainImage} hf={5} width={1284} />
          <div
            className="absolute inset-0 bg-gray-500"
            style={{ mixBlendMode: "soft-light" }}
          />
        </div>
        <Portable blocks={data.body} />
      </section>
      <ul
        role="list"
        className="blog-post grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
      >
        {data.gallery.map((file: { [index: string]: any }) => {
          const [w]: any =
            getWidthAndHeightFromRef(file.asset._ref) || undefined;

          return (
            <li key={file._key} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <Lightbox key={`${file._key}-lightbox`}
                  mainImage={file}
                  width={w}
                  hf={15}
                  alt={file.alt}
                  caption={file.caption || ""}
                />
              </div>
              <p className="mt-2 block font-medium pointer-events-none">
                {file.caption}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
