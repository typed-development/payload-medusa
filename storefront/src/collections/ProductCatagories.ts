import type { CollectionConfig } from "payload"

import { slugField } from "../fields/slug"

import { MedusaProductField } from "../fields/medusaProduct/field"

export const ProductCatagories: CollectionConfig = {
  slug: "productCategories",

  versions: {
    drafts: true,
  },

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "slug",
    components: {
      views: {
        edit: { root: { Component: "../components/CustomEditView" } },
      },
    },
  },

  fields: [
    slugField(),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      type: "array",
      name: "products",
      fields: [MedusaProductField],
    },
  ],
}
