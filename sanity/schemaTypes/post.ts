import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Articles de Blog & Rituels',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
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
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (SEO)',
        },
      ],
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Image secondaire (illustration rituel)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (SEO)',
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait / Résumé',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (ex: 5 min)',
      type: 'string',
      initialValue: '5 min',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant (Featured)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Corps de l\'article',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'Optimisation SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Titre Meta', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Description Meta', type: 'text', rows: 2 }),
        defineField({ name: 'keywords', title: 'Mots-clés (séparés par des virgules)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `par ${author}` };
    },
  },
});
