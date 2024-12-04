import { Field } from "payload"

export const ProductVariantField: Field = {
  name: "productVariant",
  type: "text",

  admin: {
    components: {
      Field: "@fields/medusaVariant/component#SingleImageSelectComponent",
    },
  },
}
