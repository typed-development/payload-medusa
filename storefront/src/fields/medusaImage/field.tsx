import { Field } from "payload"

export const ProductImageSelectField: Field = {
  name: "productImage",
  type: "text",

  admin: {
    components: {
      Field: "@fields/medusaImage/component#SingleImageSelectComponent",
    },
  },
}
