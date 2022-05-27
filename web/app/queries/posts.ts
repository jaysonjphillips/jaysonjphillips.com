import { SanityMainImage } from "~/lib/images";
import sanityClient from "~/lib/sanityClient"

export type Post = {
    _id: string;
    publishedAt: string;
    _updatedAt?: string;
    title: string;
    slug: string;
    mainImage: {
        asset: {
            _id: string;
            url: string;
        },
        alt: string;
        caption: string;
    }
    body: Array<any>;
    _rawBody: Array<any>;
    excerpt: Array<any>;
    categories: {
        title: string;
        description: string;
    }
    readingTime: number;
    author: Author;
}

export type Author = {
    name: string;
    bio: Array<any>;
    image: SanityMainImage;
}

export const getPostBySlug = async (slug: string): Promise<Array<Post>> => {
    const result = await sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"]{_id, title, body, _rawBody, excerpt, slug, publishedAt, categories[0]->{title, description}, "author": authors[0].author->, "readingTime": round(length(pt::text(body)) / 5 / 180 ), "mainImage": {"asset": mainImage.asset->{_id, url}, "alt": mainImage.alt, "caption":mainImage.caption}}`);
    return result;
}