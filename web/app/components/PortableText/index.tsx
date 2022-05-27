import React from "react";
import {PortableText} from "@portabletext/react";
import serializers from "./serializers";

const Portable = ({ blocks }: any) => {
  
  return (
  <PortableText value={blocks} components={serializers} />
)};

export default Portable;
