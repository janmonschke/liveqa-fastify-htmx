// Both routes.js and root.jsx are provided
// internally so you don't have to.

// The /: prefix is the @fastify/vite convention for
// shadowable virtual modules — if you  place your own
// route.js and root.jsx files in the root of your
// client/ directory, they're used instead

// Default virtual modules are located in node_modules/@fastify/htmx/virtual

export { routes } from "/:routes.js";
export { default as root } from "/:root.jsx";

// Can also be a function that receives ({ app, req, reply })
export const head = (
  <>
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🙋‍♀️</text></svg>"
    ></link>
    <meta name="htmx-config" content='{"scrollIntoViewOnBoost":false}'></meta>
  </>
);
