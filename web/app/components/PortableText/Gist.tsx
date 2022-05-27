import React from "react";
import Gist from "react-gist";

const BlogGist = ({ value }: any) => {
  return <Gist id={value.url.split("/")[4].split(".")[0]} />;
};

export default BlogGist;
