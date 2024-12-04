import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import RichText from "@components/RichText"
import { Product } from "payload-types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  payloadProduct?: Product
}

const ProductInfo = ({ product, payloadProduct }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {payloadProduct?.title || product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {payloadProduct?.description ? (
            // <RichText content={payloadProduct.description} />
            <p>Todo</p>
          ) : (
            product.description
          )}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
