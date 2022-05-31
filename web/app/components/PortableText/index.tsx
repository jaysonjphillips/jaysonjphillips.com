import React from "react";
import htm from 'htm'
import vhtml from 'vhtml'
import {PortableText} from "@portabletext/react";
import serializers from "./serializers";
import { PortableTextOptions, toHTML } from "@portabletext/to-html";
import BlogGist from "./Gist";

const html = htm.bind(vhtml)

const Portable = ({ blocks }: any) => {
  
  return (
  <PortableText value={blocks} components={serializers} />
)};

const things: PortableTextOptions = {}
export const PortableHTML = ({ blocks }: any) => {
  return toHTML(blocks, {components: {}});
}

export default Portable;
