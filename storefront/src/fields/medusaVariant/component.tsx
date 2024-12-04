"use client"
import * as React from "react"
import { SelectInput, useField } from "@payloadcms/ui"
import { useMedusaProductContext } from "../../provider"

export function SingleImageSelectComponent({ path }: { path }) {
  const { value, setValue } = useField<string>({ path })

  const medusa = useMedusaProductContext()
  console.log(medusa?.product)
  if (!medusa?.product) return null

  const variantOptions = medusa.product.variants.map((variant) => {
    return {
      label: `SKU:${variant.sku} - ${variant.title}`,
      value: variant.id,
    }
  })

  return (
    <div className="field-type">
      <h2>Select Variant</h2>
      <SelectInput
        path={path}
        name={path}
        options={variantOptions}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  )
}
