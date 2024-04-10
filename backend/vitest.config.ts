import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*test.ts"],
    exclude: [...configDefaults.exclude, "db/**/*.js"],
    coverage: {
      provider: "v8",
      thresholds: {
        lines: 80,
        branches: 0,
        functions: 0,
        statements: 0,
      },
      exclude: ["**/*.js", "index.ts"],
    },
  },
});
