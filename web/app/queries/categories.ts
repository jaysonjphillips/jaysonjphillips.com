import sanityClient from "~/lib/sanityClient"

export const getSiteCategories = async () => {
   return await sanityClient.fetch(`*[_type=="category"] | order(lower(title) asc){_id, title, description}`)
}

export const isSiteCategory = async (slug: string) => {
    const category = await sanityClient.fetch(`*[_type=="category" && slug.current == $slug]{slug.current}`, { slug })
    return !!category.length
}