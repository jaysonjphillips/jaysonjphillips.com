import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ProgressiveSanityImage from "~/components/Images/ProgressiveSanityImage";
import { getSiteCategories } from "~/queries/categories";

export let loader: LoaderFunction = async () => {
  return await getSiteCategories();
}

export default function Index() {
    const categories = useLoaderData();

    return (
      <section className="content-index category-index">
        <h1 className="title">welcome. we're glad you could join us.</h1>
        
        <div className="w-full overflow-hidden rounded-lg shadow-lg sm:flexmt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {categories.map((cat: any) => (
          <>
          <div className="w-full max-w-lg overflow-hidden rounded-lg shadow-lg sm:flex bg-slate-200">
            <div className="w-full sm:w-1/3">
              {/* <ProgressiveSanityImage width={} hf={} /> */}
              <img className="object-cover w-full h-60" src="https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Flower and sky"/>
            </div>
            <div className="flex-1 px-6 py-4">
              <h2 className="subtitle light">{cat.title}</h2>
              <p className="leading-normal text-zinc-700">{cat.description}</p>
              <Link to={`/${cat.title.toLowerCase()}`} className="text-blue-500">Read more</Link>
            </div>
          </div>
          </>
        
        
        ))}
        </div>
        </section>
  );
}
