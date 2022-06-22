import { Link } from "@remix-run/react";
import { format, getMonth, getYear } from "date-fns";
import { getHeaderImageUrl } from "~/lib/images";
import ProgressiveSanityImage from "./Images/ProgressiveSanityImage";
import Portable from "./PortableText";

  
  export default function CategoryPostIndex(props: any) {
    const {posts, archive = false} = props;
    return (
      <div className="pt-6 pb-4 lg:pb-8 lg:pt-6 work-sans">
        <div className="relative mx-auto divide-y-2 divide-gray-200">
          <div className={`grid ${archive ? 'grid-cols-2' : 'grid-cols-1'} gap-y-6 lg:gap-y-12 md:gap-x-8 xs:max-w-1/2`}>
            {posts.map((post: any) => {
                let date = new Date(post.publishedAt);
                return (
                <article key={post.title && post.title || post.mainImage.title} className="grid md:grid-cols-2 gap-x-4 grid-cols-1">
                  <div> 
                        <ProgressiveSanityImage mainImage={post.mainImage} hf={13} width={1080} />
                  </div>

                  {/* right excerpt */}
                  <div>
                      <Link to={`/${post.categories && post.categories.title.toLowerCase() || "gallery"}/${post.slug.current}`} className="block">
                        {!archive && (<p className="text-2xl font-semibold">{post.title}</p>)}
                        {archive && (<p className="text-lg font-semibold">{post.title}</p>)}

                          <p className="text-md font-medium invisible lg:visible ">{format(date, "MMM d, Y")}</p>
                          {!archive && (<div className="mt-3 text-base hidden lg:block text-ellipsis overflow-hidden"><Portable blocks={post.excerpt} /></div>)}
                      </Link>
                      <div className="mt-3 invisible lg:visible">
                      <Link to={`/${post.categories && post.categories.title.toLowerCase() || "gallery"}/${post.slug.current}`} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                          Read full story
                      </Link>
                      </div>
                  </div>
                </article>
                )}
            )}
          </div>
        </div>
      </div>
    )
  }
  