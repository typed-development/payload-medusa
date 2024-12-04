/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from "dotenv"

dotenv.config({ path: ".env.demo" })

export default $config({
  app(input) {
    return {
      name: "PayloadMedusaNext",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    }
  },
  async run() {
    new sst.aws.Nextjs("Storefront", {
      environment: {
        NEXT_PUBLIC_MEDUSA_BACKEND_URL:
          "https://core-payload-medusa.demos.typed.co.nz",
        NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
          "pk_f02a760008a4e9c9e00a47319de9a7b193f5cd3f6e6cefac48b2c7ffd7b87564",
        NEXT_PUBLIC_BASE_URL: "https://payload-medusa.demos.typed.co.nz",
        NEXT_PUBLIC_DEFAULT_REGION: "dk",
        REVALIDATE_SECRET: "supersecret",
        DATABASE_URL: process.env.DATABASE_URL || "",
        PAYLOAD_SECRET: "YOUR_SECRET_HERE",
      },
      domain: {
        name: "payload-medusa.demos.typed.co.nz",
        dns: false,
        cert: "arn:aws:acm:us-east-1:515966519544:certificate/f1e54845-dcb6-4067-9bac-f7d79d37219c",
      },
    })
  },
})
