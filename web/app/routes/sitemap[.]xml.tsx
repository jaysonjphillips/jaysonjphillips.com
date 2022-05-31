import { LoaderFunction } from "@remix-run/node";
import { format, isBefore, parseISO } from "date-fns";
import { getPhotoGalleries } from "~/queries/photos";
import { getAllPosts } from "~/queries/posts";

export const loader: LoaderFunction = async () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.

  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) =>
    isBefore(parseISO(post.publishedAt), new Date())
  );

  const sitemapPosts = publishedPosts.map((post) => {
    return [
      `<url>`,
      `<loc>https://jaysonjphillips.com/${post.categories.title.toLowerCase()}/${
        post.slug.current
      }</loc>`,
      `<lastmod>${format(
        (post._updatedAt && parseISO(post._updatedAt)) ||
          parseISO(post.publishedAt),
        "yyyy-MM-dd"
      )}</lastmod>`,
      `</url>`,
    ].join("");
  });

  const galleryPosts = await getPhotoGalleries();
  const publishedGalleries = galleryPosts.filter((post: any) =>
    isBefore(parseISO(post.publishedAt), new Date())
  );

  const sitemapGalleries = publishedGalleries.map((post: any) => {
    return [
      `<url>`,
      `<loc>https://jaysonjphillips.com/photos/${post.slug.current}</loc>`,
      `<lastmod>${format(
        (post._updatedAt && parseISO(post._updatedAt)) ||
          parseISO(post.publishedAt),
        "yyyy-MM-dd"
      )}</lastmod>`,
      `</url>`,
    ].join("");
  });

  const rootPages = [
    "about",
    "now",
    "fitness",
    "projects",
    "tutorials",
    "tutorials/archive",
    "photos",
    "blog",
    "blog/archive",
    "rss.xml",
  ];
  const sitemapPages = rootPages.map((page) => {
    return [
      `<url>`,
      `<loc>https://jaysonjphillips.com/${page}</loc>`,
      `<lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>`,
      `</url>`,
    ].join("");
  });

  const content = [
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `<url>`,
    `<loc>https://jaysonjphillips.com/</loc>`,
    `<lastmod>
            ${
              (publishedPosts[0]._updatedAt &&
                format(parseISO(publishedPosts[0]._updatedAt), "yyyy-MM-dd")) ||
                format(parseISO(publishedPosts[0].publishedAt), "yyyy-MM-dd")
            }
        </lastmod>`,
    `<priority>1.0</priority></url>`,
    ...sitemapPages,
    ...sitemapPosts,
    ...sitemapGalleries,
    `</urlset>`,
  ];
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content.join(""), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
