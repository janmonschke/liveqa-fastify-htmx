import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const isDev = process.env["NODE_ENV"] !== "production";

export default {
  plugins: isDev
    ? []
    : [
        // Setting up purgeCSS for the external CSS framework
        purgeCSSPlugin({
          content: ["./client/**/*.tsx"],
          css: ["./client/external.css"],
          // Keep all CSS module declarations
          safelist: [/_./],
          variables: true,
        }),
      ],
};
