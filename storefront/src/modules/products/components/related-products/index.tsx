import Product from "../product-preview"
import { getRegion } from "@lib/data/regions"

type RelatedProductsProps = {
  relatedProductIds: string[]
  countryCode: string
}

export default async function RelatedProducts({
  relatedProductIds,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Related products
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          You might also want to check out these products.
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {relatedProductIds.map((product) => (
          <li key={product}>
            {<Product region={region} productId={product} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
