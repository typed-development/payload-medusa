import { Field } from "payload"

export const MedusaProductField: Field = {
  name: "productId",
  type: "text",
  admin: {
    components: {
      Field: "./component",
    },
  },
}
