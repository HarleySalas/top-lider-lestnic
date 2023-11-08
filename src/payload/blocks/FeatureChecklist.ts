import { Block } from 'payload/types'
import { callToAction } from '../fields/callToAction'

export const FeatureChecklist: Block = {
  slug: 'featureChecklist',
  labels: {
    singular: {
      en: 'Feature Checklist',
      ru: 'Список функций',
    },
    plural: {
      en: 'Feature Checklists',
      ru: 'Списки функций',
    },
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: {
        en: 'Color Theme',
        ru: 'Цветовая тема',
      },
      defaultValue: 'light',
      options: [
        {
          label: {
            en: 'Light',
            ru: 'Светлая',
          },
          value: 'light',
        },
        {
          label: {
            en: 'Dark',
            ru: 'Тёмная',
          },
          value: 'dark',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
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
    callToAction(),
    {
      name: 'items',
      type: 'array',
      label: {
        en: 'Items',
        ru: 'Элементы',
      },
      admin: {
        initCollapsed: true,
        components: {
          //@ts-ignore
          RowLabel: ({ data, index }) => data?.title || `Элемент ${String(index).padStart(2, '0')}`,
        },
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
