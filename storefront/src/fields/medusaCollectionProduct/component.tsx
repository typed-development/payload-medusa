"use client"
import * as React from "react"
import { useAllFormFields, useField } from "@payloadcms/ui"
import { useMedusaProductContext } from "../../provider"
import ReactSelect, { createFilter } from "react-select"
import { ProductOption, SmallOption } from "../../components/ProductOption"

export const MedusaCollectionProduct: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path })

  const medusa = useMedusaProductContext()
  const productOptions = [
    ...medusa.allProducts.flatMap((product) => {
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

  const [fields, dispatchFields] = useAllFormFields()

  React.useEffect(() => {
    if (!medusa.product) return
    dispatchFields({
      type: "UPDATE",
      path: "slug",
      value: medusa.product.handle,
    })
  }, [medusa.product])

  return (
    <div className="field-type">
      <label className="field-label">Product selector</label>
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
          medusa.setProductId(String(e.value))
          setValue(e.value)
        }}
      />
    </div>
  )
}
