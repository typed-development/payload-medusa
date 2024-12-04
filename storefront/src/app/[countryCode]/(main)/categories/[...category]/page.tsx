import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreProductCategory, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { initPayload, payloadClient } from "payloadSdk"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

// export async function generateStaticParams() {
//   await initPayload()
//   const product_categories = await listCategories()
//   const data = payloadClient?.find({ collection: "productCategories" })
//   if (!data) {
//     return []
//   }

//   const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
//     regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
//   )

//   const categoryHandles = product_categories.map(
//     (category: any) => category.handle
//   )

//   const staticParams = countryCodes
//     ?.map((countryCode: string | undefined) =>
//       categoryHandles.map((handle: any) => ({
//         countryCode,
//         category: [handle],
//       }))
//     )
//     .flat()

//   return staticParams
// }

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params
//   try {
//     const productCategory = await getCategoryByHandle(params.category)

//     const title = productCategory.name + " | Medusa Store"

//     const description = productCategory.description ?? `${title} category.`

//     return {
//       title: `${title} | Medusa Store`,
//       description,
//       alternates: {
//         canonical: `${params.category.join("/")}`,
//       },
//     }
//   } catch (error) {
//     notFound()
//   }
// }

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  await initPayload()
  const category = await payloadClient?.find({
    collection: "productCategories",
    where: { slug: { equals: params.category[0] } },
  })
  const { sortBy, page } = searchParams

  if (!category) {
    notFound()
  }

  return (
    <CategoryTemplate
      productIds={
        category?.docs[0].products
          ?.map((p) => p.productId)
          .filter((x): x is string => !!x) ?? []
      }
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
