import { Block } from 'payload/types'

export const FormCard: Block = {
  slug: 'formCard',
  interfaceName: 'FormCardProps',
  labels: {
    singular: {
      en: 'Form Card',
      ru: 'Карточка формы',
    },
    plural: {
      en: 'Form Cards',
      ru: 'Карточки формы',
    },
  },
  fields: [
    {
      name: 'form',
      label: {
        en: 'Form',
        ru: 'Форма',
      },
      relationTo: 'forms',
      type: 'relationship',
    },
  ],
}
