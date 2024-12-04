"use client"

import * as React from "react"
import { SelectInput, useAllFormFields, useField } from "@payloadcms/ui"
import { useMedusaProductContext } from "../../provider"
import { FormState } from "payload"

const findProductOptionField = (
  form: FormState,
  path: string[],
  fieldName: string
) => {
  while (path.length) {
    const productOption = form[`${path.join(".")}.${fieldName}`]
    if (productOption) return productOption
    path.pop()
  }
}

export const MedusaProductOptionValue: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path })

  const [form, dispatch] = useAllFormFields()

  const productOptionId = findProductOptionField(
    form,
    path.split("."),
    "productOption"
  )?.value

  const medusa = useMedusaProductContext()
  const productOption = medusa.product?.options?.find(
    (x) => x.id === productOptionId
  )
  if (!productOption) return null

  const options = productOption.values.map((option) => {
    return {
      label: `${option.value}`,
      value: option.id,
    }
  })

  return (
    <div>
      <label className="field-label">Select product option value</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => {
          setValue(e.value)
        }}
      />
    </div>
  )
}
