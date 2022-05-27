import React from "react";
import Img from "gatsby-image";
import * as sanity from "../../lib/sanityClient";

export default ({ node }: any) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }
    const imgData = sanity.imageUrlFor(node.asset._id);
    return (
    <figure>
      <img src={imgData.url()} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};
