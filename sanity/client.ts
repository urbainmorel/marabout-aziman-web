import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: 'y8rqnviv',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
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

export async function sanityFetch<T = any>(query: string, params: Record<string, any> = {}): Promise<T> {
  const url = new URL(`https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}`);
  url.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Sanity Query Error: ${res.statusText}`);
  }

  const json = await res.json();
  return json.result;
}

