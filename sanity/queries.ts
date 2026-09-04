export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  readingTime,
  featured,
  mainImage,
  secondaryImage,
  author->{
    name,
    "slug": slug.current,
    image,
    role
  },
  category->{
    title,
    "slug": slug.current
  }
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  readingTime,
  featured,
  mainImage,
  secondaryImage,
  body,
  seo,
  author->{
    name,
    "slug": slug.current,
    image,
    role,
    bio
  },
  category->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const RELATED_POSTS_QUERY = `*[_type == "post" && slug.current != $slug && category._ref == $categoryId][0...2] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  category->{
    title,
    "slug": slug.current
  }
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  icon
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

export const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  lastUpdated,
  body,
  seo
}`;
