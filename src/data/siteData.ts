export interface SiteSettings {
  siteName: string;
  fullName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappLink: string;
  whatsappRdvLink: string;
  email: string;
  address: string;
  addressDetails: string;
  workingHours: string;
  experienceYears: string;
  legalEntity: string;
  siret: string;
  rcs: string;
}

export const siteSettings: SiteSettings = {
  siteName: 'Cabinet Aziman',
  fullName: 'Maître Aziman',
  tagline: 'Grand Marabout en France : Voyance & Rituels Traditionnels',
  phone: '+33759399230',
  phoneDisplay: '+33 (0)7 59 39 92 30',
  whatsappNumber: '+22995309859',
  whatsappDisplay: '+229 95 30 98 59',
  whatsappLink: 'https://wa.me/22995309859?text=Bonjour%20Ma%C3%AEtre%20Aziman%2C%20je%20souhaite%20une%20consultation%20confidentielle.',
  whatsappRdvLink: 'https://wa.me/22995309859?text=Bonjour%20Ma%C3%AEtre%20Aziman%2C%20je%20souhaite%20prendre%20un%20rendez-vous%20pour%20une%20consultation.',
  email: 'contact@marabout-aziman.fr',
  address: 'Cabinet en Île-de-France (Paris) & Interventions partout en France',
  addressDetails: 'Accès Métro / RER à 3 min à pied. Parking sécurisé. Adresse exacte transmise par SMS/WhatsApp lors de la confirmation du RDV.',
  workingHours: '7j/7 - 24h/24 (Consultations privées sur RDV & Ligne d\'urgence)',
  experienceYears: 'Plus de 25 ans d\'initiation aux secrets ancestraux du Fâ et du Vodun',
  legalEntity: 'Alexandre MELBECK (VOYANCE TOTAL - Cabinet Maître Aziman)',
  siret: '945 386 159 00012',
  rcs: 'RCS TRIEUX A 945 386 159',
};

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    icon: '🏛️',
    title: 'Cabinet & Distance',
    description: 'Reçoit en toute confidentialité en région parisienne et consulte par appel ou WhatsApp dans toute la France.',
  },
  {
    icon: '🔒',
    title: '100% Discret & Secret',
    description: 'Secret initiatique absolu. Vos confidences, photographies et rituels sont strictement protégés et confidentiels.',
  },
  {
    icon: '⚡',
    title: 'Action Rapide & Suivi',
    description: 'Interventions ciblées pour déclencher des résultats visibles sous 24h à 7 jours avec suivi quotidien dédié.',
  },
];

export interface Testimonial {
  author: string;
  city: string;
  rating: number;
  category: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    author: 'Sylvie M.',
    city: 'Paris 11e',
    rating: 5,
    category: 'Amour & Retour Affectif',
    text: 'Mon fiancé était parti depuis quatre mois avec une collègue de travail et m\'avait bloquée sur son téléphone. Après avoir fait appel à Maître Aziman pour un retour affectif urgent avec cadenas d\'amour, mon ex m\'a rappelée en larmes au bout de cinq jours. Il a quitté cette femme et nous avons fixé la date de notre mariage. Merci du fond du cœur Maître.',
  },
  {
    author: 'Karim B.',
    city: 'Marseille 1er',
    rating: 5,
    category: 'Harmonie de Couple',
    text: 'Mon épouse demandait le divorce après dix ans de mariage. Grâce au rituel de fixation et au savon de séduction du Maître Aziman, notre couple a retrouvé sa complicité du début. Mon foyer est sauvé.',
  },
  {
    author: 'Élodie P.',
    city: 'Nantes',
    rating: 5,
    category: 'Déblocage Célibat',
    text: 'J\'étais célibataire depuis six ans et toutes mes relations échouaient. Après le bain de déblocage du célibat, j\'ai rencontré l\'homme de ma vie trois semaines plus tard. Nous venons d\'emménager ensemble.',
  },
  {
    author: 'Moussa D.',
    city: 'Lyon 3e',
    rating: 5,
    category: 'Commerce & Clientèle',
    text: 'Mon restaurant dans le centre de Lyon perdait des clients chaque mois à cause de la concurrence. Après avoir utilisé la poudre de seuil et le savon de fortune de Maître Aziman, mes ventes ont triplé en un mois. Ma salle est complète midi et soir.',
  },
  {
    author: 'Didier V.',
    city: 'Paris 12e',
    rating: 5,
    category: 'Richesse & Jeux de Hasard',
    text: 'Je portais la bague de chance financière en validant ma grille d\'Euromillions. J\'ai remporté plus de 38 000 euros au rang 2. Je n\'y croyais plus et pourtant les résultats ont dépassé mes espérances.',
  },
  {
    author: 'Bakary C.',
    city: 'Bobigny (93)',
    rating: 5,
    category: 'Titre de Séjour & OQTF',
    text: 'Sans papiers depuis sept ans, j\'avais reçu une OQTF. Maître Aziman a réalisé le rituel de gel de dossier et m\'a donné la poudre de parole. Le tribunal administratif a annulé mon expulsion et la préfecture m\'a délivré ma carte de séjour.',
  },
  {
    author: 'Josiane F.',
    city: 'Paris 18e',
    rating: 5,
    category: 'Désenvoûtement & Nuits',
    text: 'Je subissais des cauchemars terrifiants avec un mari de nuit qui détruisait ma santé et ma vie intime. Dès le premier bain de décharge avec l\'huile Tchotcho et le savon de désenvoûtement du Maître Aziman, les attaques ont cessé net. Je revis enfin.',
  },
  {
    author: 'David N.',
    city: 'Paris 17e',
    rating: 5,
    category: 'Justice & Procès',
    text: 'Je risquais deux ans de prison ferme pour une affaire correctionnelle. Le cadenas de justice de Maître Aziman a fait basculer mon procès : mon avocat a soulevé une nullité et j\'ai été relaxé immédiatement.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: 'Comment se déroule une première consultation avec Maître Aziman ?',
    answer: 'La consultation commence systématiquement par une voyance divinatoire par le Fâ ou les cauris. Ainsi, Maître Aziman identifie avec précision la source invisible de vos difficultés avant de vous proposer le rituel adapté.',
  },
  {
    question: 'Les rituels à distance sont-ils aussi efficaces qu\'en cabinet ?',
    answer: 'Oui, les rituels à distance possèdent une efficacité identique. En effet, les vibrations spirituelles ne connaissent aucune frontière spatiale. Maître Aziman travaille sur vos photographies, noms complets et dates de naissance.',
  },
  {
    question: 'Quels sont les délais pour constater les premiers résultats ?',
    answer: 'Les premiers effets se manifestent généralement entre 24 heures et 7 jours selon la complexité du problème. De plus, un suivi quotidien vous est assuré par téléphone ou WhatsApp jusqu\'à l\'obtention du résultat souhaité.',
  },
  {
    question: 'Quelle est la déontologie appliquée par Maître Aziman ?',
    answer: 'Maître Aziman applique une éthique rigoureuse : secret initiatique absolu, respect des lois naturelles sans magie noire destructive, honnêteté totale sur la faisabilité dès le premier contact et accompagnement bienveillant.',
  },
];
