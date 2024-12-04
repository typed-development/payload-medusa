"use client"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import { useEffect, useState } from "react"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default function ProductActionsWrapper({
  id,
  region,
  setCurrentVariant,
}: {
  id: string
  region: HttpTypes.StoreRegion
  setCurrentVariant: (e: any) => void
}) {
  const [enrichedProduct, setProduct] = useState<HttpTypes.StoreProduct>()
  useEffect(() => {
    ;(async () => {
      const [product] = await getProductsById({
        ids: [id],
        regionId: region.id,
      })
      setProduct(product)
    })()
  }, [id])

  if (!enrichedProduct) {
    return null
  }

  return (
    <ProductActions
      product={enrichedProduct}
      region={region}
      setCurrentVariant={setCurrentVariant}
    />
  )
}
