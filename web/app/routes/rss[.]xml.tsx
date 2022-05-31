import { LoaderFunction } from "@remix-run/node";
import { getAllPosts } from "~/queries/posts";
import { format, isBefore, parseISO } from "date-fns";
import Portable from "~/components/PortableText";
import { renderToString } from "react-dom/server";

export const loader: LoaderFunction = async ({ params }) => {

    const feedURL: string = `https://jaysonjphillips.com/rss.xml`;

    const posts = await getAllPosts();
    const publishedPosts = posts.filter(post => (isBefore(parseISO(post.publishedAt), new Date())));
    const feedPosts: Array<any> = publishedPosts.map(post => {
        //             `<description><![CDATA[${getPlainTextFromPortableText(post.excerpt)}]]></description>`,
        const title = post.title.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
            return '&#'+i.charCodeAt(0)+';';
         });
        
        console.log(title)
        return [
            `<item>`,
            `<title>${title}</title>`,
            `<pubDate>${format(parseISO(post.publishedAt), "EEE, dd MMM yyyy hh:mm:ss xxxx")}</pubDate>`,
            `<link>https://jaysonjphillips.com/${post.categories.title.toLowerCase()}/${post.slug.current}</link>`,
            `<content:encoded><![CDATA[${renderToString(<Portable blocks={post.body} />)}]]></content:encoded>`,
            `<category>${post.categories.title}</category>`,
            `<guid>${post._id}</guid>`,
            `</item>`,
        ].join("").replace('/&(?!#?[a-z0-9]+;)/g', '&amp;');
    });

    const feedContent = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">`,
        `<channel>`,
        `<title>jaysonjphillips.com</title>`,
        `<description>Code, tutorials, tech, musings, workouts and photos. In no such order.</description>`,
        `<link>https://jaysonjphillips.com</link>`,
        `<atom:link href="https://jaysonjphillips.com/rss.xml" rel="self" type="application/rss+xml" />`,
        `<language>en-US</language>`,
        `<docs>https://cyber.harvard.edu/rss/rss.html</docs>`,
        `<sy:updatePeriod>daily</sy:updatePeriod>`,
        ...feedPosts,
        `</channel>`,
        `</rss>`,
        ];

    return new Response(feedContent.join("").replace('/&(?!#?[a-z0-9]+;)/g', '&amp;'), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "x-content-type-options": "nosniff",
        }
    });
}