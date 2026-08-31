import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du Cabinet / Marabout',
      type: 'string',
      initialValue: 'Cabinet Maître Aziman',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Sous-titre',
      type: 'string',
      initialValue: 'Grand Marabout en France : Voyance & Rituels Traditionnels',
    }),
    defineField({
      name: 'phone',
      title: 'Numéro de téléphone (Format appel, ex: +33759399230)',
      type: 'string',
      initialValue: '+33759399230',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Numéro affiché (ex: +33 (0)7 59 39 92 30)',
      type: 'string',
      initialValue: '+33 (0)7 59 39 92 30',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp (ex: +22995309859)',
      type: 'string',
      initialValue: '+22995309859',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappDisplay',
      title: 'Numéro WhatsApp affiché (ex: +229 95 30 98 59)',
      type: 'string',
      initialValue: '+229 95 30 98 59',
    }),
    defineField({
      name: 'email',
      title: 'Adresse Email de contact',
      type: 'string',
      initialValue: 'contact@marabout-aziman.fr',
    }),
    defineField({
      name: 'address',
      title: 'Localisation du Cabinet principal',
      type: 'string',
      initialValue: 'Île-de-France / Paris & Consultations à distance France entière',
    }),
    defineField({
      name: 'workingHours',
      title: 'Horaires d\'ouverture',
      type: 'string',
      initialValue: '7j/7 - 24h/24 (Urgences acceptées)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux Sociaux',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Lien Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Lien Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'Lien TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'Lien YouTube', type: 'url' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO par défaut',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Titre Meta par défaut',
          type: 'string',
          initialValue: 'Grand Marabout en France : Voyance & Rituels | Cabinet Aziman',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Description Meta par défaut',
          type: 'text',
          rows: 3,
          initialValue: 'Consultez Maître Aziman, grand marabout en France. Retour affectif rapide, chance, protection et rituels ancestraux. RDV au cabinet ou à distance.',
        }),
        defineField({
          name: 'ogImage',
          title: 'Image de partage réseaux sociaux (Open Graph)',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
});
