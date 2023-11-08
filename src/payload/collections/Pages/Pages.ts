import type { CollectionConfig } from 'payload/types'
import { rolesOrPublished } from '../../access/rolesOrPublished'
import { roles } from '../../access/roles'
import { fullTitle } from '../../fields/fullTitle'
import { slug } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { populatePathname } from '../../hooks/populatePathname'
import { hero } from '../../fields/hero'
import { FeatureChecklist } from '../../blocks/FeatureChecklist'
import { Banner } from '../../blocks/Banner'
import { GalleryRelationship } from '../../blocks/GalleryRelationship'
import { revalidate } from '../../utilities/revalidate'
import { Content } from '../../blocks/Content'
import { Section } from '../../blocks/Section'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: ['title', 'fullTitle', 'pathname', 'updatedAt', 'status'],
    enableRichTextLink: true,
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${doc.pathname}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}${data.pathname}`,
    },
  },
  hooks: {
    beforeChange: [populatePublishedDate, populatePathname],
    afterChange: [
      ({ req, doc }) => {
        revalidate({ req, doc, type: 'path', value: doc?.pathname })
      },
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  access: {
    read: access => rolesOrPublished(access, ['editor', 'admin']),
    update: access => roles(access, ['editor', 'admin']),
    create: access => roles(access, ['editor', 'admin']),
    delete: access => roles(access, ['admin']),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
    },
    fullTitle,
    {
      name: 'publishedDate',
      type: 'date',
      label: {
        en: 'Published Date',
        ru: 'Дата публикации',
      },
      admin: {
        position: 'sidebar',
      },
    },
    slug(),
    {
      name: 'pathname',
      type: 'text',
      unique: true,
      index: true,
      label: {
        en: 'Pathname',
        ru: 'Pathname',
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    hero,
    {
      name: 'blocks',
      type: 'blocks',
      label: {
        en: 'Blocks',
        ru: 'Блоки',
      },
      labels: {
        singular: {
          en: 'Block',
          ru: 'Блок',
        },
        plural: {
          en: 'Blocks',
          ru: 'Блоки',
        },
      },
      admin: {
        initCollapsed: true,
      },
      blocks: [Content, FeatureChecklist, Banner, Section, GalleryRelationship],
    },
  ],
}
