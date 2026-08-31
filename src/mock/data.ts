export interface Author {
  name: string;
  slug: string;
  role: string;
  image: string;
  bio: string;
}

export interface Category {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  count?: number;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  mainImage: {
    asset: { url: string };
    alt: string;
  };
  author: Author;
  category: Category;
  bodyHtml?: string;
}

export interface DomainItem {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  image: string;
  bullets?: string[];
}

export interface ShopItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tag?: string;
}

export interface Testimonial {
  author: string;
  city: string;
  rating: number;
  content: string;
  service?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const siteSettings = {
  siteName: 'Cabinet Aziman',
  fullName: 'Maître Aziman',
  tagline: 'Grand Marabout en France : Voyance & Rituels Traditionnels',
  phone: '+33759399230',
  phoneDisplay: '+33 (0)7 59 39 92 30',
  whatsappNumber: '+22995309859',
  whatsappDisplay: '+229 95 30 98 59',
  whatsappLink: 'https://wa.me/22995309859?text=Bonjour%20Ma%C3%AEtre%20Aziman%2C%20je%20souhaite%20une%20consultation%20confidentielle.',
  email: 'contact@marabout-aziman.fr',
  address: 'Cabinet en Île-de-France & Interventions à distance',
  workingHours: '7j/7 - 24h/24 (Consultations sur RDV & Urgences)',
  experienceYears: 'Plus de 25 ans d\'initiation',
  interventionCities: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nantes', 'Strasbourg', 'Nice', 'Rennes', 'Montpellier', 'Toute la France & International'],
};

export const defaultAuthor: Author = {
  name: 'Maître Aziman',
  slug: 'maitre-aziman',
  role: 'Grand Marabout, Voyant & Guérisseur Traditionnel',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG0AC5xQQkZVN6GKqNppO3JNzVln1mTUhW6umDVdmkxouZfCo0_DRdkK99JyRWg_wA0QyRloapYsege7E7_ZcJAS6270Ri5Zif1zJycat-lf8eKhTyobL8Jxfy8bYNGi6uGx4oPJwa5H24swsvAgbA5mkPgwsZTU9dQB7J109JML-AhCeHjewTeBYpw7ZJFuowiUqBMcrOJR_aSpYojxKAQfILJtLdd5i52Ue3vcJ6NjQpaMhqpSOJMw',
  bio: 'Héritier d\'une prestigieuse lignée de grands prêtres du Fâ et du Vodun au Bénin, Maître Aziman pratique la voyance et les travaux occultes depuis plus de 25 ans. Installé en France, il accompagne particuliers et personnalités avec discrétion, déontologie et bienveillance.'
};

export const categories: Category[] = [
  {
    title: 'Amour & Sentiments',
    slug: 'amour-sentiments',
    description: 'Rituels de retour affectif immédiat, cadenas d\'amour, réconciliation de couple et fidélité absolue.',
    icon: 'heart',
    count: 6,
  },
  {
    title: 'Richesse & Finance',
    slug: 'richesse-finance',
    description: 'Ouverture des portes financières, déblocage de chance, pactes de prospérité et réussite matérielle.',
    icon: 'sparkles',
    count: 4,
  },
  {
    title: 'Commerce & Carrière',
    slug: 'commerce-carriere',
    description: 'Attraction de clientèle, protection d\'entreprise, avancement professionnel et succès aux examens.',
    icon: 'briefcase',
    count: 5,
  },
  {
    title: 'Divination & Voyance',
    slug: 'divination-voyance',
    description: 'Consultation sacrée du Fâ, tirage divinatoire des cauris et clairvoyance pour éclairer votre destin.',
    icon: 'eye',
    count: 3,
  },
  {
    title: 'Protection & Nettoyage',
    slug: 'protection-nettoyage',
    description: 'Désenvoûtement complet, retour à l\'envoyeur, purification des lieux et bouclier contre les attaques occultes.',
    icon: 'shield',
    count: 7,
  },
  {
    title: 'Santé Traditionnelle',
    slug: 'sante-traditionnelle',
    description: 'Pharmacopée africaine, vitalité, accompagnement fertilité et harmonisation des énergies vitales.',
    icon: 'leaf',
    count: 3,
  },
  {
    title: 'Justice & Procès',
    slug: 'justice-proces',
    description: 'Cadenas de justice, résolution favorable des litiges, protection juridique et apaisement des conflits.',
    icon: 'scale',
    count: 2,
  },
  {
    title: 'Immigration & Papiers',
    slug: 'immigration-papiers',
    description: 'Déblocage des dossiers administratifs, titres de séjour, visas, naturalisation et recours.',
    icon: 'document',
    count: 4,
  },
];

export const domains: DomainItem[] = [
  {
    id: 1,
    title: 'Amour & Sentiments',
    subtitle: 'Retour Affectif & Réconciliation',
    slug: 'amour-sentiments',
    description: 'Retour affectif urgent (24h à 72h), cadenas d\'amour, rapprochement de l\'être aimé, fidélité absolue et protection de couple.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoQWDvvcEMVZkMpUiyiJ4gTnds6oy2vFN6EX-7C-uJIkbwpLyGekRxOKVnQGBosfMctmvCDAafHVZypVWKFWCyAWYttjJ9BCQt9ONeHrwM3h_FE7ruswMng3TYPhJfNQCxSpspDV3ZRCqe7HIZ7ufgge95Z6Ckq_028nm9GF8C0d1REExIKBtQcJvoWqzQ5WgM-36dyY--S3771-yd-5GFxBUrm-9oWqCN2qEX1BQ7B5bw_MHg-XywOQ',
    bullets: ['Retour de l\'ex en 24h-72h', 'Cadenas d\'amour scellé', 'Fidélité & éloignement de rivale'],
  },
  {
    id: 2,
    title: 'Richesse & Finance',
    subtitle: 'Chance & Abondance',
    slug: 'richesse-finance',
    description: 'Déblocage des flux d\'argent, bains de fortune, pactes ancestraux de prospérité et attraction de gains inattendus.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1U5qGzfh0XdMPb4Pl5sg2gJsR_T9WVYUqpkZTn4uyBVsTTdLsiUbYmQ0YakmNX2uWHDyVnLlxoTMclvT2qM10lheJpq5rj7MnpJhwxn7UjEDb4B9pjhzOI1rypXXIke2tPy5JfR3ZX2-fdh0tEBZaa6Xh6UhkXz5YQi8Wapw0yuMmSovKSvOepr_IF15nqX9prgKpBoxcvARzRw1yXrLbFLdsED85LU41LUA2apDg4ElYqC371Kj0ykfmFm',
    bullets: ['Ouverture de chance financière', 'Bains de déblocage monétaire', 'Protection du patrimoine'],
  },
  {
    id: 3,
    title: 'Commerce & Carrière',
    subtitle: 'Clientèle & Succès Pro',
    slug: 'commerce-carriere',
    description: 'Savons et poudres d\'attraction irrésistible de clients, triomphe des entreprises, promotions et rayonnement professionnel.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UzGD0IJD8f6lItxj4Ggs_eFnv5-Z3XJzACtcBBCfCMgUA3eHuN1mDeAofW1F0V6mc6M_CKe6lLB8a0w3i63sWG_C8wc5TAqfMKQHpbc8afcB21D6RXkXVipLaaQcsxxB2YnnR3bBg6Mrg8UTVO64dIGZn0xCUULSjzpKoRR1nY1mvsLEEAdX7mkjz4X-Wx3p4dOQKOGs7zT3ByhU8ysV9tTKedqAGqYrw1B8f090eLoDhNtYZzvTUU_9LE',
    bullets: ['Attraction de clientèle abondante', 'Protection du fonds de commerce', 'Succès aux entretiens & contrats'],
  },
  {
    id: 4,
    title: 'Divination & Voyance',
    subtitle: 'Oracle du Fâ & Cauris',
    slug: 'divination-voyance',
    description: 'Consultation divinatoire d\'une précision chirurgicale pour révéler les causes invisibles de vos blocages et orienter vos choix.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XNcyMeOn7sb3LdvLK6ZN5YIFBxHk-QigYm4k34PAKSr0RzSNIEU-M1WTeXiJZJU7hkUVJuCEfy6wORtvKNEUFjr3-hcSXBH_ggQvpwxKf6IAmpM6p3q51GiswtGelnWIaxoudeJ0jluWXp-ZyB6vY_eoYgy_ENVhs7QBawpERMRHl8EDmhYCunNMN0VHRy2Hcoti-S2Dvmh2nRVbNlQmCrHoqBbhVCwCT3e8pJg33HUrwcGjnYqO2ywO--',
    bullets: ['Géomancie sacrée du Fâ', 'Tirage traditionnel des cauris', 'Diagnostic spirituel complet'],
  },
  {
    id: 5,
    title: 'Protection & Nettoyage',
    subtitle: 'Désenvoûtement & Bouclier',
    slug: 'protection-nettoyage',
    description: 'Anéantissement des mauvais sorts, neutralisation de la jalousie, retour immédiat à l\'envoyeur et bouclier inaltérable.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VEXBd6nYU0lh57SE6juouxQ7l_vWv5_2vtusKUNIN8xuLJPMkz6rsAj7zoFrlnfRqk7-ZN4wUq11HB09dEDldhVqKZ9P5J8470eLbd3iy1SSQyB3uSwWl6BpUuN5DAnguW9i2Q9Mtvu5EPlHkAZyxE8so6gWDy1qr0YnWQVoC_gegLGNx59Asz9yaGsYlJygUOnCBBJ_SQ8b89hLu5wUx-dgjPR8AwX0XU17E34dVGy7UitrN9LkfBl1X3',
    bullets: ['Purification de l\'aura & maison', 'Retour occulte à l\'envoyeur', 'Protection définitive de la famille'],
  },
  {
    id: 6,
    title: 'Santé Traditionnelle',
    subtitle: 'Fertilité & Pharmacopée',
    slug: 'sante-traditionnelle',
    description: 'Solutions naturelles et spirituelles pour la fertilité, le rééquilibrage énergétique et la vitalité par les plantes d\'Afrique.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1V251ilnw8QWUXSvScT3RC6X9xSrDGLA-DBU9sFYpn3DyJWYgU4rAcxgov18AEXshd4AlROb06hcK7EgaS2XiBvgx9q57P8gGPi7RzqALQjQ4oRtcWl6EcfnX-wJIMjaPUlUyULgnEqDj3sfMQ3L0kDLmkp-wMAOiWwKX6g22uH71KIk16gJ4PMFyNqYaZt-ZJ_OZDrz8mSsZ6tM7uHjU35Ni3Enms601zjYnkqseg7y4AhEOQC_Ue0QH0',
    bullets: ['Accompagnement fertilité & conception', 'Tisanes & décoctions secrètes', 'Harmonisation du corps et de l\'esprit'],
  },
  {
    id: 7,
    title: 'Justice & Procès',
    subtitle: 'Cadenas & Litiges',
    slug: 'justice-proces',
    description: 'Action spirituelle sur les juges et adversaires pour faire pencher la balance en votre faveur lors d\'un procès ou conflit.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD580WVxgtM4jJnlO2gN0KYR41vm62XyRVe6NJrpvSo3Vm41pySQj6otq4Cbw19vhw3_laSnD_E4UnpEgp-STP9lOK3AaKCtIgUcZngNz7PZpdDC6DK9pkFNk1xkAHixWicKsAUh4jqwum-lrKfLg0trDhIn5TgYl-BoAFPKVjBJhHtmXUbgHPxVFs0uOjQYFLd-_ArrQdQZVfbLA3EF6TG6zmMw4xbB6FdKXJrixzlcBROqZeeNRWnfA',
    bullets: ['Cadenas de fermeture de bouche', 'Apaisement des conflits judiciaires', 'Protection contre les condamnations'],
  },
  {
    id: 8,
    title: 'Immigration & Papiers',
    subtitle: 'Titres de Séjour & Visas',
    slug: 'immigration-papiers',
    description: 'Déblocage des dossiers en préfecture, recours OQTF, obtention rapide de visa et régularisation sereine de votre situation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1BshJ17oK19WZ0eEVSN1zEf8quuMMgAXlMiAolacwJlnI3C1h_WftCgIII89gI6kZYL6VvcIqI3T6YE-CLYQ31uEHcNPFJ13i2cUAasMCdZ1VKpSgBa2Q-Qn723amN5JykK1BT_ERY0eTbrz3_JnrohIO2nQOwkmgDbecWVw6ucCc7dzXyeChB9AZQZz_UDizsf1U_jGFLfiHB9ZiKtM416_uPUlFewi_eEQb3QRQf-eSAGbot4KFug',
    bullets: ['Accélération des démarches préfecture', 'Annulation d\'éloignement & OQTF', 'Facilitation de regroupement familial'],
  },
];

export const shopItems: ShopItem[] = [
  {
    id: 1,
    title: 'Savons Noirs & Rituels',
    category: 'Purification & Chance',
    description: 'Savon préparé à base d\'écorces sacrées et de cendres rituelles pour éliminer la poisse et attirer les ondes positives.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA22u8JArtCN4i_qfVfysTAFjXcy_aTXZB3oKoFKiNSifD53vQtZu0w4TWqXuzlBPBGVN7hgrNlKPvo1gRY8oWKVG4krl952Yb-zds7FZE7DOEuoJQMnpIp-vNW0LoSmo0xQgsnVVDp2tLSn51FoNew56OpyV__X43zIaL4Y2AzQ9loL_IrTxF9J1b1SqDMXi0BrefNlmlitO8yeGqnjkkiQm--9l5hxOD3UvdiE4xQKEWvoSQ8aVFP7w',
    tag: 'Très Demandé',
  },
  {
    id: 2,
    title: 'Eaux Sacrées & Lustrales',
    category: 'Bains de Déblocage',
    description: 'Eaux consacrées prélevées dans les sanctuaires traditionnels pour les bains de purification nocturnes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJAhYAlO6Mdvsw-gZkYF2aQQXUmZ85mosJV3zn1aV8EmtwG_Ev_UjL_uRz3jf4Of4YSNvqEQvpAMRTUeZVCspV02di65MSDPVerx4lzk0ziWSMf0RRPfkpvDxZsBX19uGF-5o-EvopNAXcy4KIEARBfdtZVvY4GmUd-ftvb3MN2Uk4z9tBbdnJBMxqIDkem867SSMlGe5m5HlfQU62qTfb_6H6Y2ofuM3zX4zKqkf6Roltt9c3JMDgUQ',
  },
  {
    id: 3,
    title: 'Parfums & Macérations',
    category: 'Séduction & Attraction',
    description: 'Parfum Dangoma et extraits magnétisés pour captiver l\'attention, susciter le désir et rayonner en société.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_dfFR6JsW11M1aWQDNagQ4YWWXqDKmtJRHzTauN5dauUdtU12LxY5_Z-QOaE4RbpNtqzYshtium8W-vjCn4dgtVpTh2qmkYbiauLNyamo7-AzAasGygF9KJETVE_SJ5CrcHIW3gSZlfRRMA4taHUXao2cpFoSlehsw84GckGg01Qjp_d7Moiv8gaORdwAl2pXUNFjp6BJ_CS9zibD6mC_qqV8R2IjNMAo97-kxIXWAaYL2dKIfsiMwA',
    tag: 'Spécial Amour',
  },
  {
    id: 4,
    title: 'Poudres Noires & Terres',
    category: 'Protection & Puissance',
    description: 'Poudres traditionnelles à brûler ou à frictionner pour ériger une barrière infranchissable contre la sorcellerie.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHMHimk60z2F9GZ6iSc_IC-gpcAPAo_-KCoV74Iefd_ZiO3bM6dHd9W7OpT7uA9lj2pBfsE1xrnJZk98L5ULorRxNoLoWjWmyysLtnNuIHEfcVTLzA60R_QJje7CfpyOU3ff21UWiUsU0i2gw6Z3qF0oq88rCI7Wfu2HSuUAlxBt3lw6ktnRTAJTUVqKP303603UNEeWJSFCttUxF4ItrXas-7RQIOO4O5PbP0v2NGoC8_SJfQoR8ZCg',
  },
  {
    id: 5,
    title: 'Talismans & Gris-Gris',
    category: 'Amulettes Consacrées',
    description: 'Amulettes en cuir cousues main avec versets et sceaux initiatiques pour une protection rapprochée permanente.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbFHv0Pkl5mSjd0nAnAHNX_a0N5ALy6AsBu6oJ7nbTxEKwjw2vn7N7dZVbEjiPz1nLbYqSMyMHzkChg5NcvDtmg-1KCTai-6Dmkq6W4FhlldXJZPg7UoaRYymjFamoK0d1XeRQKRNJAWlsuvZhqeeK0lLeBDstgrCXs6HHn-eEzHFnG85cOvy75MlGs8teELOxJcZwaqm4Rt-37Ha2D0MDobStLK2GYfhJ3hLCqmd2sicyyLiElyvEvA',
    tag: 'Fait Main',
  },
  {
    id: 6,
    title: 'Parures & Bayas',
    category: 'Perles de Charme',
    description: 'Perles de taille traditionnelles magnétisées pour consolider l\'amour, la sensualité et l\'attachement de votre partenaire.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl6OLl9b3eD5EagZkkC9XDYYp6YixqIm7e2FhaqDoY0OQRnvqpOEhtSBAQ-2eWHgKY69bzOr5i0Bdgx6lwGEXgk6C04eWSQPj317J4PAI71KV7eHzWrU-hsvpIGbAYjoQs6EveXz7QulJfdH9nxn5-QD76NQi-9FO8qTV0_LZEXup1YMAAzGzo6bC-J7u7V6nf5bkioIzo3nlCq64ywIugWaAuuYqL-hJ1ftRF4FkPdkKpO08pdHS1Mw',
  },
  {
    id: 7,
    title: 'Cadenas & Réceptacles',
    category: 'Scellement Rituel',
    description: 'Cadenas préparé avec invocations pour sceller un amour, bloquer un adversaire ou verrouiller une situation financière.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIDB9l-L3_Va6aHu2aHCpK9l5AfxZS2IX5myecvBqxeKUrn0uRHaEmptpVs_sXXHUmeAt2zCI4GOn4_zsYXCORl2niLYK0HuC0NWIqVSCkOWfsvji6SQtspSOXpD6ea0D4bDPf8jAG6yHHu0RjFyMOJyJl4Jvw8qNezaCXwd8m2OfmXbYuiswWxUaHrDRMimSIMcYkeQFKLfJrvsQK0x127eBRhI1T_TR24wRmYbo7mq4G6J0dNFISFw',
    tag: 'Puissant',
  },
  {
    id: 8,
    title: 'Pharmacopée Végétale',
    category: 'Plantes Sacrées',
    description: 'Racines et feuilles séchées d\'Afrique de l\'Ouest selon la posologie ancestrale pour l\'énergie et la fertilité.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Fdja5M_SybyT6kTZJvpIr0by-wqM4dr5vf18uzIqwsD9g0vdJkCki1kLVF-hwzqr0rlvN8rxi1O4VBZ-K6TqViXsUm5MZycqNGbLl-jJdkmiz9oauf-EmY45hyLUf2Dt_G4wN4uWcnzZRDgqNXTI2wdto68q4zoKu1GBzea_3nYoAlq7QfdIPydrjB7eeoga3oBDXWg1_grmdZbjHhdQWSOHexMHvdIpwYp0VhFehEV7dfNXFX7X_g',
  },
];

export const testimonials: Testimonial[] = [
  {
    author: 'Sylvie M.',
    city: 'Paris 15e',
    rating: 5,
    service: 'Retour Affectif & Cadenas d\'Amour',
    content: 'Après six mois d\'une rupture très douloureuse, Maître Aziman a réalisé un retour affectif avec cadenas d\'amour. Mon ex-compagnon est revenu vers moi en seulement cinq jours, plein de remords et d\'amour. Je recommande vivement son cabinet pour son sérieux et sa bienveillance.',
  },
  {
    author: 'Mamadou D.',
    city: 'Lyon 3e',
    rating: 5,
    service: 'Commerce & Attraction Clientèle',
    content: 'Mon restaurant était au bord de la faillite avec des dettes qui s\'accumulaient. Grâce au savon de fortune et aux poudres d\'attraction préparées par Maître Aziman, notre salle ne désemplit plus depuis trois mois. Un travail d\'une efficacité remarquable.',
  },
  {
    author: 'Jean-Claude B.',
    city: 'Bordeaux',
    rating: 5,
    service: 'Immigration & Titre de Séjour',
    content: 'J\'étais bloqué dans des démarches administratives complexes depuis plus de deux ans, menacé d\'obligation de quitter le territoire. Le travail occulte de Maître Aziman a permis de débloquer mon dossier en préfecture en quelques semaines seulement. Merci infiniment !',
  },
  {
    author: 'Émilie R.',
    city: 'Paris 11e',
    rating: 5,
    service: 'Retour Affectif Urgent',
    content: 'Mon fiancé était parti depuis trois mois avec une collègue de bureau. Grâce au rituel d\'éloignement de rivale et au retour affectif urgent, il a coupé tout contact avec elle et m\'a demandée en mariage deux semaines plus tard. Une bénédiction.',
  },
  {
    author: 'Karim B.',
    city: 'Marseille',
    rating: 5,
    service: 'Protection & Désenvoûtement',
    content: 'Notre famille subissait une série d\'accidents et de blocages incompréhensibles. La voyance de Maître Aziman a immédiatement détecté une jalousie malveillante. Après le rituel de purification et le bouclier protecteur, nous avons enfin retrouvé la paix.',
  },
  {
    author: 'Nadia F.',
    city: 'Nantes',
    rating: 5,
    service: 'Justice & Litige Foncier',
    content: 'Un procès qui durait depuis 4 ans pour une succession contestée s\'est réglé à notre avantage en une seule audience suite au rituel du cadenas de justice. Maître Aziman est un vrai homme de parole.',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'Comment se déroule une première consultation avec Maître Aziman ?',
    answer: 'La consultation débute systématiquement par une voyance divinatoire approfondie via l\'oracle du Fâ ou le tirage des cauris. À partir de votre date de naissance et de vos photos, Maître Aziman identifie avec exactitude l\'origine spirituelle de vos difficultés avant de vous préconiser le rituel le plus adapté.',
  },
  {
    question: 'Les rituels à distance sont-ils aussi efficaces qu\'en cabinet ?',
    answer: 'Absolument. Les énergies spirituelles et les lois occultes ne sont limitées par aucune barrière géographique. Que vous consultiez à son cabinet en Île-de-France ou à distance (par appel téléphonique ou WhatsApp), Maître Aziman travaille sur les mêmes supports vibratoires avec une efficacité équivalente.',
  },
  {
    question: 'Quels sont les délais pour constater les premiers résultats ?',
    answer: 'Dans la majorité des rituels urgents (notamment les retours affectifs et déblocages), les premiers signes concrets apparaissent entre 24 heures et 72 heures. Certains travaux de protection lourde ou de justice demandent entre 5 et 9 jours avec un accompagnement quotidien personnalisé.',
  },
  {
    question: 'Les rituels comportent-ils des risques ou un choc en retour ?',
    answer: 'Non, aucun. Maître Aziman pratique une magie traditionnelle ancestrale bienveillante, respectueuse des lois cosmiques et de la nature. Chaque rituel inclut systématiquement un bouclier de protection pour garantir l\'absence totale de choc en retour tant pour vous que pour vos proches.',
  },
  {
    question: 'Comment est garantie la discrétion et le secret professionnel ?',
    answer: 'Le secret initiatique est la règle absolue du Cabinet Aziman. Vos données, photographies, confidences et coordonnées restent strictement confidentielles et ne sont jamais divulguées à des tiers. Les colis de produits sacrés sont expédiés sous emballage neutre et anonyme.',
  },
];

export const mockPosts: Post[] = [
  {
    _id: 'post-1',
    title: 'Retour Affectif Urgent en France : Guide Complet des Rituels d\'Amour et Cadenas Mystique',
    slug: 'retour-affectif-urgent-marabout-france',
    publishedAt: '2026-08-25T10:00:00Z',
    readingTime: '6 min',
    featured: true,
    mainImage: {
      asset: {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4f_5jV6pe8Pj9O6LGbKOQDD3qkubb6QgQbT8gBG9sLccY3HQbvHwArXDvu2nRYtGB25vM2lTYOh76d3yyNMhFbbY-jmCOgroK88Ifc0CVx48pulupF8Rz_LzG0N1nshh2MKAUpRamokdil9f85LpYGgypJY4hNSVQiuBSxE4yIyGA7jLRli71SW4u8SofxXPSRLgZpBpf323DrWFg5WbejqaILpDfrBD--5GG4sG9nzMbkh3j4RBwCg',
      },
      alt: 'Rituel de retour affectif et cadenas d\'amour par Maître Aziman',
    },
    author: defaultAuthor,
    category: categories[0],
    excerpt: 'Découvrez comment un véritable marabout en France agit pour rétablir les liens brisés, faire revenir l\'être aimé en 24h à 72h et protéger définitivement votre couple contre l\'infidélité.',
    bodyHtml: `
      <h2>Pourquoi faire appel à un marabout pour un retour d'affection ?</h2>
      <p>La rupture amoureuse représente l'une des épreuves les plus déstabilisantes de l'existence. Lorsque le dialogue est rompu et que les tentatives rationnelles échouent, le recours aux <strong>forces spirituelles traditionnelles</strong> permet de réveiller les sentiments profonds enfouis dans le cœur de votre partenaire.</p>
      
      <blockquote>
        "L'amour véritable ne disparaît jamais ; il est souvent simplement obscurci par des interférences négatives ou des rancœurs passagères que la magie bienveillante sait dissoudre."
      </blockquote>

      <h2>Les 3 étapes fondamentales du rituel d'amour</h2>
      <h3>1. Le diagnostic divinatoire préalable par le Fâ</h3>
      <p>Avant d'engager toute action, Maître Aziman réalise un tirage sacré pour examiner la compatibilité astrale du couple et identifier d'éventuelles influences extérieures toxiques (rivale, jalousie familiale, sortilège de discorde).</p>

      <h3>2. La consécration nocturne du cadenas d'amour</h3>
      <p>Le rituel central mobilise des offrandes spécifiques et le scellement symbolique du cadenas d'amour. Ce travail agit directement sur le subconscient de l'être aimé, provoquant un sentiment irrésistible de manque et le désir ardent de renouer contact.</p>

      <h3>3. Le suivi personnalisé jusqu'au retour complet</h3>
      <p>Tout au long de l'intervention, Maître Aziman reste en contact téléphonique et WhatsApp direct avec le consultant afin de suivre les réactions de l'ex-conjoint et consolider l'harmonie retrouvée.</p>

      <h2>Les délais constatés et l'efficacité à distance</h2>
      <p>Grâce à une maîtrise parfaite des invocations vaudou et fâ, les premiers rapprochements interviennent généralement entre <strong>24 heures et 72 heures</strong>. Les interventions à distance bénéficient de la même puissance qu'une séance au cabinet.</p>
    `,
  },
  {
    _id: 'post-2',
    title: 'Protection Spirituelle et Désenvoûtement : Se Libérer du Mauvais Œil et des Blocages Occultes',
    slug: 'rituels-de-protection-et-desenvoutement',
    publishedAt: '2026-08-20T14:30:00Z',
    readingTime: '5 min',
    featured: false,
    mainImage: {
      asset: {
        url: 'https://lh3.googleusercontent.com/aida/AEtjO1VEXBd6nYU0lh57SE6juouxQ7l_vWv5_2vtusKUNIN8xuLJPMkz6rsAj7zoFrlnfRqk7-ZN4wUq11HB09dEDldhVqKZ9P5J8470eLbd3iy1SSQyB3uSwWl6BpUuN5DAnguW9i2Q9Mtvu5EPlHkAZyxE8so6gWDy1qr0YnWQVoC_gegLGNx59Asz9yaGsYlJygUOnCBBJ_SQ8b89hLu5wUx-dgjPR8AwX0XU17E34dVGy7UitrN9LkfBl1X3',
      },
      alt: 'Désenvoûtement et protection contre le mauvais œil',
    },
    author: defaultAuthor,
    category: categories[4],
    excerpt: 'Purification de l\'aura, retour à l\'envoyeur et boucliers protecteurs ancestraux pour retrouver la sérénité et briser les malédictions répétitives.',
    bodyHtml: `
      <h2>Reconnaître les signes d'un blocage ou envoûtement</h2>
      <p>Une fatigue inexpliquée, une série d'échecs brutaux, des conflits familiaux incessants ou une poisse persistante constituent souvent les symptômes d'une atteinte occulte ou du mauvais œil provoqué par la jalousie d'autrui.</p>
      
      <h2>La méthode de nettoyage spirituel en profondeur</h2>
      <p>Maître Aziman utilise des bains lustrales préparés à base de plantes sacrées d'Afrique, accompagnés d'invocations de protection. Cette purification détruit les liens négatifs et renvoie les mauvaises intentions à leur source d'émission.</p>
      
      <blockquote>
        "Nul ne peut progresser dans la vie avec une aura polluée. Le nettoyage énergétique est la première clé de la réussite matérielle et affective."
      </blockquote>

      <h2>Le talisman de protection rapprochée</h2>
      <p>Pour assurer une immunité durable, un talisman consacré est remis au consultant. Il forme un bouclier impénétrable protégeant son foyer, sa santé et son travail.</p>
    `,
  },
  {
    _id: 'post-3',
    title: 'Attraction de la Richesse et Prospérité Commerciale : Les Secrets de la Géomancie du Fâ',
    slug: 'secrets-chance-financiere-prosperite',
    publishedAt: '2026-08-15T09:15:00Z',
    readingTime: '7 min',
    featured: false,
    mainImage: {
      asset: {
        url: 'https://lh3.googleusercontent.com/aida/AEtjO1U5qGzfh0XdMPb4Pl5sg2gJsR_T9WVYUqpkZTn4uyBVsTTdLsiUbYmQ0YakmNX2uWHDyVnLlxoTMclvT2qM10lheJpq5rj7MnpJhwxn7UjEDb4B9pjhzOI1rypXXIke2tPy5JfR3ZX2-fdh0tEBZaa6Xh6UhkXz5YQi8Wapw0yuMmSovKSvOepr_IF15nqX9prgKpBoxcvARzRw1yXrLbFLdsED85LU41LUA2apDg4ElYqC371Kj0ykfmFm',
      },
      alt: 'Rituels de prospérité financière et attraction de clientèle',
    },
    author: defaultAuthor,
    category: categories[1],
    excerpt: 'Comment débloquer les canaux de l\'abondance financière et attirer une clientèle fidèle grâce aux rituels de fortune et à la pharmacopée sacrée.',
    bodyHtml: `
      <h2>L'argent et les lois spirituelles de l'attraction</h2>
      <p>L'argent est avant tout une énergie. Lorsqu'un individu subit des blocages karmiques ou financiers, ses projets capotent malgré tous ses efforts professionnels. Les rituels de richesse visent à aligner votre vibration sur la fréquence de l'abondance.</p>
      
      <h2>Les rituels pour commerçants et chefs d'entreprise</h2>
      <p>Pour les commerces de bouche, boutiques et prestataires de services, l'application de poudres attractives et le bain de savon de fortune permettent de démultiplier la fréquentation et de signer des contrats majeurs.</p>

      <h2>Témoignage de prospérité</h2>
      <p>Nombreux sont les entrepreneurs en France ayant surmonté des crises critiques grâce aux conseils occultes et rituels personnalisés dispensés au Cabinet Aziman.</p>
    `,
  },
];
