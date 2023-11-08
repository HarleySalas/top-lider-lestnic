import type { CollectionConfig } from 'payload/types'
import { sendEmail } from './hooks/sendEmail'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    create: () => true,
    update: () => false,
    read: ({ req: { user } }) => !!user, //logged in users
  },
  admin: {
    enableRichTextRelationship: false,
  },
  hooks: {
    beforeChange: [sendEmail],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submissionData',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'field',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            if (typeof value !== 'undefined') {
              return true
            }

            return 'This field is required'
          },
        },
      ],
    },
  ],
}
