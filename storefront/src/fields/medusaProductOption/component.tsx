"use client"

import * as React from "react"
import { SelectInput, useField } from "@payloadcms/ui"
import { useMedusaProductContext } from "../../provider"

export const MedusaProductOption: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  console.log("MedusaProductOption", path, value)

  const medusa = useMedusaProductContext()
  const productOptions = medusa.product.options.map((option) => {
    return {
      label: `${option.title}`,
      value: option.id,
    }
  })

  return (
    <div>
      <label className="field-label">Select product option</label>
      <SelectInput
        path={path}
        name={path}
        options={productOptions}
        value={value}
        onChange={(e) => {
          setValue(e.value)
        }}
      />
    </div>
  )
}
