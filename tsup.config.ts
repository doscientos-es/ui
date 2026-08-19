import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // The public barrel includes React Aria components and hooks. Preserve an
  // RSC client boundary in the compiled artifacts consumed by Next.js apps.
  banner: {
    js: '"use client";',
  },
});
