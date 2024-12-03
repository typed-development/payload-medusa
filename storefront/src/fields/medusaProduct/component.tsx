"use client"
import * as React from "react"
import { useMedusaProductContext } from "../../provider"
import { SelectInput, useAuth, useField } from "@payloadcms/ui"
import { ProductOption, SmallOption } from "../../components/ProductOption"
import { TextFieldClientComponent } from "payload"

export const MedusaProduct: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  const medusa = useMedusaProductContext()

  const products = [...medusa.allProducts]
  console.log({ products })
  const productOptions = products.map((product) => {
    return {
      label: product.title,
      value: product.id,
    }
  })

  return (
    <div className="field-type">
      <label className="field-label">Select product</label>
      <SelectInput
        options={productOptions}
        value={value}
        // filterOption={createFilter({
        //   stringify: (option) => (option.data as any).string ?? "",
        // })}
        onChange={(v) => {
          setValue(v.value)
        }}
        name={path}
        path={path}
      />
    </div>
  )
}
