import type { CollectionConfig, Field } from "payload"

import { slugField } from "../fields/slug"

import { ProductImageSelectField } from "../fields/medusaImage/field"
import { ProductVariantField } from "../fields/medusaVariant/field"
import { MedusaProductField } from "../fields/medusaProduct/field"
import { MedusaProductOptionField } from "../fields/medusaProductOption/field"
import { MedusaProductOptionValueField } from "../fields/medusaProductOptionValue/field"

const variantFields: Field[] = [
  ProductVariantField,
  { name: "images", type: "array", fields: [ProductImageSelectField] },
]

const relatedProductFields: Field[] = [MedusaProductField]

const productOptionsFields: Field[] = [
  MedusaProductOptionField,
  {
    name: "optionValues",
    type: "array",
    fields: [
      MedusaProductOptionValueField,
      // richText()
    ],
  },
]

export const Products: CollectionConfig = {
  slug: "products",

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
        edit: {
          default: { Component: "@components/CustomEditView#CustomEditView" },
        },
      },
    },
  },

  fields: [
    {
      name: "medusaProductId",
      type: "text",
      admin: {
        position: "sidebar",
        components: {
          Field:
            "@fields/medusaCollectionProduct/component#MedusaCollectionProduct",
        },
      },
    },
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
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },

    {
      type: "tabs",
      tabs: [
        {
          label: "Variants",
          fields: [
            {
              name: "variants",
              type: "array",
              fields: variantFields,
            },
          ],
        },
        {
          label: "Related products",
          fields: [
            {
              name: "relatedProducts",
              type: "array",
              fields: relatedProductFields,
            },
          ],
        },
        {
          label: "Options",
          fields: [
            {
              name: "productOptions",
              type: "array",
              fields: productOptionsFields,
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
