import { Field } from "payload"

export const MedusaProductOptionValueField: Field = {
  name: "productOptionValue",
  type: "text",
  admin: {
    components: {
      Field:
        "@fields/medusaProductOptionValue/component#MedusaProductOptionValue",
    },
  },
}
