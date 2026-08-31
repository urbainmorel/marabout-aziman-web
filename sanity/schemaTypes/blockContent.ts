import { defineType, defineArrayMember } from 'sanity';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Puces', value: 'bullet' },
        { title: 'Numéroté', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Souligné', value: 'underline' },
        ],
        annotations: [
          {
            title: 'Lien',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (SEO)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende',
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Encadré d\'Avertissement / Conseil',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type d\'encadré',
          options: {
            list: [
              { title: 'Conseil Spirituel', value: 'tip' },
              { title: 'Important / Discrétion', value: 'important' },
              { title: 'Avertissement', value: 'warning' },
            ],
          },
          initialValue: 'tip',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Titre de l\'encadré',
        },
        {
          name: 'content',
          type: 'text',
          title: 'Contenu',
        },
      ],
    }),
  ],
});
