import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import sanityClient from "~/lib/sanityClient";

export const loader: LoaderFunction = async () => {
    let posts = await sanityClient.fetch(
        `*[_type == "galleryPost"] | order(_createdAt desc)`
      );
  
      return {
        type: "photos",
        data: posts
      }
}

export default function Gallery() {
    const { data } = useLoaderData();
    return (
        <section className="content-index category-index">
          <Outlet />
        </section>
    )
}