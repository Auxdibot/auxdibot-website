import { renderToStringClient } from "./renderClient";

export function renderToString(JSXElement: JSX.Element) {
  const isServer = typeof window === "undefined";
  if (isServer) {
    const { renderToStringServer } = require("./renderServer");
    return renderToStringServer(JSXElement);
  }
  return renderToStringClient(JSXElement);
}