import { Author } from "~/queries/posts";
import ProgressiveSanityImage from "../Images/ProgressiveSanityImage";
import Portable from "../PortableText";

type ByLineData = {
    author: Author;
}

export default function ByLine({ author }: ByLineData) {
  return (
    <div className="byline grid grid-cols-4 border-y-2 border-offset border-white py-4 mt-2">
      <ProgressiveSanityImage mainImage={author.image} width={250} hf={20} />
      <div className="col-span-3">
        <p className="font-medium mb-2">Written by <span className="font-bold">{author.name}</span></p>
        <Portable blocks={author.bio} />
      </div>
    </div>
  );
}
