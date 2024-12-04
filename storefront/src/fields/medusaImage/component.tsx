"use client"

import * as React from "react"
import { useField } from "@payloadcms/ui"
import ReactSelect from "react-select"
import { createFilter } from "react-select"

import { useMedusaProductContext } from "../../provider"

const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function SingleImageSelectComponent({ path }: { path }) {
  const { value, setValue } = useField<string>({ path })
  const medusa = useMedusaProductContext()
  const productId = medusa.productId

  const images = medusa.product?.images?.map((image) => {
    return {
      label: (
        <div style={{ height: 150 }}>
          <img src={image.url} alt={image.url} style={{ height: "100%" }} />
        </div>
      ),
      smallLabel: <SmallOption url={image.url} />,
      value: image.url,
    }
  })

  const prevProductId = usePrevious(productId)
  React.useEffect(() => {
    if (prevProductId && prevProductId !== productId) {
      setValue(null)
    }
  }, [productId, prevProductId])

  if (!images) return null

  return (
    <div className="field-type">
      <h2>Select an Image</h2>
      <CustomSelect
        options={images}
        value={value}
        onChange={(e) => setValue(e.value)}
      />

      {value && (
        <div style={{ marginTop: 20 }}>
          <h3>Preview:</h3>
          <img
            src={value}
            alt="Selected"
            style={{ width: "300px", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  )
}

function SmallOption({ url }): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ marginRight: 20 }}>
        <img
          src={url}
          alt={url}
          style={{ width: "25px", height: "25px", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div>{url}</div>
      </div>
    </div>
  )
}

const CustomSelect = (props: any) => {
  return (
    <ReactSelect
      {...props}
      styles={{
        menuList: (base) => ({
          display: "flex",
          flexWrap: "wrap",
        }),
        option: (base) => ({
          width: "fit-content",
        }),
      }}
      options={props.options}
      value={{
        value: props.value,
        label: props.options.find((option) => option.value === props.value)
          ?.smallLabel,
      }}
      filterOption={createFilter({
        stringify: (option) => (option.data as any).string ?? "",
      })}
    />
  )
}
