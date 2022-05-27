/* eslint-disable react/display-name */
import React from "react";
import Figure from "./Figure";
import BlogGist from "./Gist";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const serializers = {
  types: {
    authorReference: ({ node }: any) => (<span>{node.author.name}</span>),
    mainImage: Figure,
    gist: BlogGist,
    code: ({value}: any) => { 
      const {code, language} = value;
      return (
        <SyntaxHighlighter language={language} style={darcula}>
          {code}
        </SyntaxHighlighter>
      )
    },
  },
  marks: {
    code: (props: any) => {
      return (
        <span className="inline-code">
            {props.text}
        </span>
      )
    }
  }
};

export default serializers;
