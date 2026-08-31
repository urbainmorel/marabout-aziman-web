import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Pages Statiques',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre / Accroche',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image d\'en-tête (Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Contenu de la page',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO de la page',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Titre Meta', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Description Meta', type: 'text', rows: 2 }),
      ],
    }),
  ],
});
