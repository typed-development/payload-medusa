import { Field } from "payload"

export const MedusaProductOptionField: Field = {
  name: "productOption",
  type: "text",
  admin: {
    components: {
      Field: "@fields/medusaProductOption/component#MedusaProductOption",
    },
  },
}
