"use client"
import * as React from "react"
import { useField } from "@payloadcms/ui"
import { useMedusaProductContext } from "../../provider"
import ReactSelect from "react-select"
import { createFilter } from "react-select"
import { ProductOption, SmallOption } from "../../components/ProductOption"

export const MedusaProduct: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  const medusa = useMedusaProductContext()

  const products = [...medusa.allProducts]

  const productOptions = [
    ...products.flatMap((product) => {
      return [
        {
          label: <ProductOption product={product} />,
          smallLabel: <SmallOption product={product} />,
          string: `${product.title} ${product.variants
            .map((x) => x.sku)
            .join(", ")}`,
          value: product.id,
        },
      ]
    }),
  ]
  productOptions.sort((a, b) => a.string.localeCompare(b.string))

  return (
    <div className="field-type">
      <label className="field-label">Select product</label>
      <ReactSelect
        options={productOptions}
        value={{
          value: value,
          label: productOptions.find((option) => option.value === value)
            ?.smallLabel,
        }}
        filterOption={createFilter({
          stringify: (option) => (option.data as any).string ?? "",
        })}
        onChange={(e) => {
          setValue(e.value)
        }}
      />
    </div>
  )
}
