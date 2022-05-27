import sanityClient from "~/lib/sanityClient";

export const getPhotoGalleries = async () => {
    let posts = await sanityClient.fetch(
        `*[_type == "galleryPost"] | order(_createdAt desc)`
    );

    return posts.slice(0, 2);
}

export const getPhotoGalleryBySlug = async (slug: string) => {
    let post = await sanityClient.fetch(
        `*[_type == "galleryPost" && slug.current == $slug]|order(_createdAt desc){
            _id, _createdAt, "gallery": galleryImages[]{_key, alt, "_ref": asset._ref, asset->{_ref, url}}, slug, title, mainImage}`, {slug}
    );

    return post;
}

export const getPhotoGalleryRefsBySlug = async (slug: string) => {
    let post = await sanityClient.fetch(
        `*[_type == "galleryPost" && slug.current == $slug]|order(_createdAt desc){
            _id, _createdAt, body, excerpt, "gallery": galleryImages[]{_key, alt, asset, caption}, slug, title, mainImage}`, {slug}
    );
    return post;
}

export const getWidthAndHeightFromRef = (ref: string) => {
    return ref.split("-").at(-2)?.split("x");

}