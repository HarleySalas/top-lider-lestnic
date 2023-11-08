import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import type { Block } from 'payload/types'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsProps',
  labels: {
    singular: {
      en: 'Step',
      ru: 'Шаг',
    },
    plural: {
      en: 'Steps',
      ru: 'Шаги',
    },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: {
        en: 'Items',
        ru: 'Элементы',
      },
      labels: {
        singular: {
          en: 'Item',
          ru: 'Элемент',
        },
        plural: {
          en: 'Items',
          ru: 'Элементы',
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) =>
            data?.title || `Элемент ${String(index).padStart(2, '0')}`,
        },
      },
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: {
            en: 'Title',
            ru: 'Заголовок',
          },
        },
        {
          name: 'description',
          type: 'text',
          label: {
            en: 'Description',
            ru: 'Описание',
          },
        },
      ],
    },
  ],
}
