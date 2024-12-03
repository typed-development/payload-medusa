"use client"

import React, { Fragment, useEffect } from "react"

import { DefaultEditView } from "@payloadcms/ui"
import { MedusaProvider } from "../provider"

export const CustomEditView = ({ ...props }) => {
  const productId = props?.data?.medusaProductId

  return (
    <MedusaProvider id={props.id} productId={productId}>
      <DefaultEditView {...props} />
    </MedusaProvider>
  )
}

export default CustomEditView
