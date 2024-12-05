import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  console.log({ images })
  return (
    <div className="carousel w-full">
      {images.map((image, index) => {
        const prevIndex = index === 0 ? 0 : index - 1 // Ensure it doesn't go to -1
        const nextIndex = index === images.length - 1 ? index : index + 1 // Ensure it doesn't exceed the last index

        return (
          image.url && (
            <div className="carousel-item w-full" key={image.id}>
              <Container
                className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                id={`product${index}`}
              >
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  alt={`Product image ${index}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href={`#product${prevIndex}`} className="btn btn-circle">
                    ❮
                  </a>
                  <a href={`#product${nextIndex}`} className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </Container>
            </div>
          )
        )
      })}
    </div>
  )
}

export default ImageGallery
