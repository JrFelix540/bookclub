import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: "./src/graphql/**/*.graphql",
  generates: {
    "./src/generated/": {
      preset: "client",
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
