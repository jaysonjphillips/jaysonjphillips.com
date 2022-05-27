import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getMonth, getYear } from "date-fns";
import { AnimatePresence } from "framer-motion";
import CategoryPostIndex from "~/components/CategoryPostIndex";
import PageHeader from "~/components/Page/Header";
import Portable from "~/components/PortableText";
import sanityClient from "~/lib/sanityClient";
import { getSiteCategories } from "~/queries/categories";



export default function Tutorials() {
  return (
    <>
        <section className="content-index category-index">
        <AnimatePresence exitBeforeEnter>
          <Outlet />
        </AnimatePresence>
        </section>
      </>
  );
}
