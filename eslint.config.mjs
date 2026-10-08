import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", ".qa/**", "next-env.d.ts"]
  },
  ...nextVitals
];

export default config;
