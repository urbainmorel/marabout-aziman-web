import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legalPage',
  title: 'Pages Légales (Mentions, Confidentialité, CGU)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre légal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (ex: mentions-legales, politique-confidentialite, cgu)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Date de dernière mise à jour',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu juridique',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Titre Meta', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Description Meta', type: 'text', rows: 2 }),
      ],
    }),
  ],
});
