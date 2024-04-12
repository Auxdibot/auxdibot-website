export function renderToStringServer(element: any) {
    const ReactDOMServer = require("react-dom/server");
    const html = ReactDOMServer.renderToString(element);
  
    return html;
} 