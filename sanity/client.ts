import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: 'y8rqnviv',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
};

const builder = imageUrlBuilder(sanityConfig);

export function urlFor(source: any) {
  if (!source) return { url: () => '/images/placeholder.jpg' };
  try {
    return builder.image(source);
  } catch {
    return { url: () => (typeof source === 'string' ? source : '/images/placeholder.jpg') };
  }
}
