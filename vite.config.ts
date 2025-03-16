import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

import viteFastifyHtmx from "@fastify/htmx/plugin";

export default {
  root: join(dirname(fileURLToPath(import.meta.url)), "client"),
  plugins: [viteFastifyHtmx()],
  build: {
    rollupOptions: {
      // Without these options, too many modules, including
      // server modules were included in the build output .
      output: { preserveModules: true, preserveModulesRoot: "client" },
      preserveEntrySignatures: "strict",
      // </output-hack>
    },
  },
};
