/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from "dotenv";

dotenv.config({ path: ".env.demo" });
export default $config({
  app(input) {
    return {
      name: "PayloadMedusa",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("VPC");
    const cluster = new sst.aws.Cluster("Cluster", { vpc });
    const bucket = new sst.aws.Bucket("Assets", {
      access: "public",
    });
    const bucketName = bucket.name;
    const CoreDBURL = new sst.Secret("CoreDBURL");

    const service = cluster.addService("Core", {
      loadBalancer: {
        domain: {
          name: "core-payload-medusa.demos.typed.co.nz",
          dns: false,
          cert: "arn:aws:acm:ap-southeast-2:515966519544:certificate/eec64fbc-b848-4a04-a2a6-a886377b1aa4",
        },
        ports: [
          { listen: "80/http", forward: "9000/http" },
          { listen: "443/https", forward: "9000/http" },
        ],
        health: {
          "9000/http": {
            path: "/health",
            interval: "2 minute",
            timeout: "10 seconds",
          },
        },
      },
      architecture: "arm64",
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
      link: [bucket, CoreDBURL],

      environment: {
        LOG_LEVEL: "debug",
        STORE_CORS:
          "http://localhost:8000,https://docs.medusajs.com,https://payload-medusa.demos.typed.co.nz",
        ADMIN_CORS:
          "http://localhost:9000,https://core.payload-medusa.demos.typed.co.nz",
        AUTH_CORS:
          "http://localhost:9000,https://payload-medusa.demos.typed.co.nz",
        REDIS_URL: "redis://localhost:6379",
        JWT_SECRET: "supersecret",
        COOKIE_SECRET: "supersecret",
        DATABASE_URL: process.env.DATABASE_URL || "",
        S3_FILE_URL:
          "https://payloadmedusa-demo-assets-bdvwsrme.s3.ap-southeast-2.amazonaws.com",
        S3_REGION: "ap-southeast-2",
        S3_BUCKET: bucketName,
        S3_ENDPOINT: "https://s3.ap-southeast-2.amazonaws.com",
      },
    });
  },
});
