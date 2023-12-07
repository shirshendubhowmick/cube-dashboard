import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const strngifiedEnv = Object.keys(env).reduce(
    (acc, key) => {
      const withoutPrefixKey = key.replace("VITE_", "");
      acc[withoutPrefixKey] = JSON.stringify(env[key]);
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    plugins: [react()],
    root: "./src",
    define: {
      ...strngifiedEnv,
    },
  };
});
