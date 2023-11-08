import payload from 'payload'
import { FieldHook } from 'payload/types'
import { Gallery } from '@/payload/payload-types'

export const populateGalleryImages: FieldHook = async () => {
  let galleryImages: Gallery[] = []

  const data = await payload
    .find({
      collection: 'gallery',
      depth: 2,
      limit: 500,
    })
    .catch(err => console.error(err))

  if (typeof data === 'object') {
    galleryImages = data?.docs || []
  }

  return galleryImages
}
