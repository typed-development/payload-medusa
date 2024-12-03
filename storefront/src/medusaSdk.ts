import Medusa from "@medusajs/js-sdk";

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000";

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
}
let MEDUSA_API_KEY = "";
if (process.env.PAYLOAD_PUBLIC_MEDUSA_API_KEY) {
  MEDUSA_API_KEY = process.env.PAYLOAD_PUBLIC_MEDUSA_API_KEY;
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: MEDUSA_API_KEY,
});
