"use client"
import React, { Suspense, useState } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import { Product } from "payload-types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  payloadProduct?: Product
  relatedProductIds?: string[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  payloadProduct,
  relatedProductIds,
}) => {
  const [currentVariant, setCurrentVariant] = useState(product.variants[0].id)
  if (!product || !product.id) {
    return notFound()
  }
  let payloadVariant = payloadProduct?.variants?.find(
    (i) => i.productVariant === currentVariant
  )
  let images = product.images
  if (payloadVariant?.images?.length !== 0) {
    images = payloadVariant?.images?.map((i) => ({ url: i.productImage }))
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} payloadProduct={payloadProduct} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative p-4">
          <ImageGallery images={images || []} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
                setCurrentVariant={() => {
                  //
                }}
              />
            }
          >
            <ProductActionsWrapper
              id={product.id}
              region={region}
              setCurrentVariant={setCurrentVariant}
            />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense>
          {/* <RelatedProducts
            relatedProductIds={relatedProductIds}
            countryCode={countryCode}
          /> */}
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
