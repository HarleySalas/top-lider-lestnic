import { CollectionConfig } from 'payload/types'
import { fields } from './fields'
import { richText } from '../../fields/richText'
import { link } from '../../fields/link'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    enableRichTextRelationship: false,
    enableRichTextLink: false,
  },
  access: {
    read: () => true,
  },
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
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        {
          label: {
            en: 'Standard',
            ru: 'Стандартный',
          },
          value: 'standard',
        },
        {
          label: {
            en: 'Multi-step',
            ru: 'Многошаговый',
          },
          value: 'multiStep',
        },
      ],
    },
    {
      name: 'fields',
      label: {
        en: 'Fields',
        ru: 'Поля',
      },
      type: 'blocks',
      blocks: [...fields],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'standard',
      },
    },
    {
      name: 'steps',
      label: {
        en: 'Steps',
        ru: 'Шаги',
      },
      type: 'array',
      fields: [
        {
          name: 'fields',
          type: 'blocks',
          blocks: [...fields],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'multiStep',
      },
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
    },
    {
      name: 'confirmationType',
      type: 'radio',
      admin: {
        description: {
          en: 'Choose whether to display an on-page message, or redirect to a different page after completion',
          ru: 'Выберите, отображать ли сообщение на странице или перенаправить на другую страницу после завершения',
        },
        layout: 'horizontal',
      },
      options: [
        {
          label: {
            en: 'Message',
            ru: 'Сообщение',
          },
          value: 'message',
        },
        {
          label: {
            en: 'Redirect',
            ru: 'Перенаправление',
          },
          value: 'redirect',
        },
      ],
      defaultValue: 'message',
    },
    richText({
      name: 'confirmationMessage',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.confirmationType === 'message',
      },
    }),
    link({
      overrides: {
        name: 'redirect',
        admin: {
          hideGutter: true,
          condition: (_, siblingData) => siblingData?.confirmationType === 'redirect',
        },
      },
    }),
    {
      name: 'emails',
      type: 'array',
      admin: {
        description: {
          en: "Send custom emails when a form is submitted. Use comma separated lists to send the same email to multiple recipients. To reference a value from this form, wrap that field's name with double curly brackets, i.e. {{firstName}}",
          ru: 'Отправьте пользовательские письма, когда форма отправляется. Используйте списки с разделителем запятой, чтобы отправлять одно и то же письмо нескольким получателям. Чтобы ссылаться на значение из этой формы, заключите имя этого поля в двойные фигурные скобки, например {{firstName}}',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'emailTo',
              label: {
                en: 'Email to',
                ru: 'Email получателю',
              },
              admin: {
                width: '100%',
                placeholder: {
                  en: '"John Doe" <johndoe@example.com>',
                  ru: '"Иван Иванов" <ivanov@example.com>',
                },
              },
            },
            {
              type: 'text',
              name: 'cc',
              label: 'CC',
              admin: {
                width: '50%',
              },
            },
            {
              type: 'text',
              name: 'bcc',
              label: 'BCC',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'replyTo',
              label: {
                en: 'Reply to',
                ru: 'Адрес для ответа',
              },
              admin: {
                width: '50%',
                placeholder: {
                  en: '"John Doe" <johndoe@example.com>',
                  ru: '"Иван Иванов" <ivanov@example.com>',
                },
              },
            },
            {
              type: 'text',
              name: 'emailFrom',
              label: {
                en: 'Email From',
                ru: 'Email отправителя',
              },
              admin: {
                width: '50%',
                placeholder: {
                  en: '"John Doe" <johndoe@example.com>',
                  ru: '"Иван Иванов" <ivanov@example.com>',
                },
              },
            },
          ],
        },
        {
          type: 'text',
          name: 'subject',
          label: {
            en: 'Subject',
            ru: 'Тема',
          },
          defaultValue: 'Вы получили новое сообщение!',
          required: true,
        },
        richText({
          name: 'message',
          label: {
            en: 'Message',
            ru: 'Сообщение',
          },
          admin: {
            description: {
              en: 'Enter the message that should be sent in this email.',
              ru: 'Введите сообщение, которое следует отправить в этом письме.',
            },
          },
        }),
      ],
    },
  ],
}
