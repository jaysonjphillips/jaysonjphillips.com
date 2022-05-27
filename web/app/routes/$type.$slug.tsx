import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { getMonth, getYear } from "date-fns";
import { getPostBySlug } from "~/queries/posts";
import sanityClient from '../lib/sanityClient'

export let loader: LoaderFunction = async ({params}) => {
    return await getPostBySlug(params.slug || "")
}

export default function CategoryPost() {
    const data = useLoaderData();
    
    return (
        <main className="bg-dark-jjp">
        <section className="blog-post">
            <h1 className="title">{data[0].title}</h1>
        </section>
        </main>
    )
}