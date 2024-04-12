
export function renderToStringClient(element: JSX.Element) {
  const ReactDom = require("next/dist/compiled/react/cjs/react-dom-server-legacy.browser.production.js")
  return ReactDom.renderToString(element);
}