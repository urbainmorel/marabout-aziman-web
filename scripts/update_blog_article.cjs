const fs = require('fs');
const path = require('path');

const blogDataPath = path.resolve('src/data/blogData.ts');
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Replace image field
blogData = blogData.replace(
  `"image": "/images/blog/richesse-prosperite/portefeuille-magique-grand-maitre-aziman-1.webp"`,
  `"image": "/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp"`
);

// Replace secondaryImage field
blogData = blogData.replace(
  `"secondaryImage": "/images/blog/richesse-prosperite/portefeuille-magique-grand-maitre-aziman-2.webp"`,
  `"secondaryImage": "/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp"`
);

// HTML figure replacements for contentHtml

// Figure 1 HTML replacement
const oldFig1Html = `<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><!-- EMPLACEMENT IMAGE 1 : HERO BANNER --></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans">!<a href="https://www.marabout-aziman.fr/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp" class="text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors">Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré</a></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><em class="italic text-slate-900">Figure 1 : Authentique portefeuille magique Bédou en cuir véritable, scellé et consacré au sanctuaire du Grand Maître Aziman.</em></p>`;

const newFig1Html = `<figure class="my-8 text-center">
  <img src="/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp" alt="Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré" class="w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200" />
  <figcaption class="mt-3 text-sm text-slate-600 italic font-serif">Figure 1 : Authentique portefeuille magique Bédou en cuir véritable, scellé et consacré au sanctuaire du Grand Maître Aziman.</figcaption>
</figure>`;

// Figure 2 HTML replacement
const oldFig2Html = `<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><!-- EMPLACEMENT IMAGE 2 : CONSÉCRATION AU SANCTUAIRE --></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans">!<a href="https://www.marabout-aziman.fr/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp" class="text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors">Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire</a></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><em class="italic text-slate-900">Figure 2 : Rituel de charge nocturne sur l'autel de la divinité de l'abondance Dan au sanctuaire de Cotonou.</em></p>`;

const newFig2Html = `<figure class="my-8 text-center">
  <img src="/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp" alt="Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire" class="w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200" />
  <figcaption class="mt-3 text-sm text-slate-600 italic font-serif">Figure 2 : Rituel de charge nocturne sur l'autel de la divinité de l'abondance Dan au sanctuaire de Cotonou.</figcaption>
</figure>`;

// Figure 3 HTML replacement
const oldFig3Html = `<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><!-- EMPLACEMENT IMAGE 3 : UTILISATION QUOTIDIENNE DU BILLET TÉMOIN --></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans">!<a href="https://www.marabout-aziman.fr/images/blog/utilisation-billet-temoin-portefeuille-magique.webp" class="text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors">Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent</a></p>\n<p class="my-4 text-base text-slate-800 leading-relaxed font-sans"><em class="italic text-slate-900">Figure 3 : Positionnement du billet témoin neuf dans le compartiment principal pour activer l'attraction matérielle.</em></p>`;

const newFig3Html = `<figure class="my-8 text-center">
  <img src="/images/blog/utilisation-billet-temoin-portefeuille-magique.webp" alt="Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent" class="w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200" />
  <figcaption class="mt-3 text-sm text-slate-600 italic font-serif">Figure 3 : Positionnement du billet témoin neuf dans le compartiment principal pour activer l'attraction matérielle.</figcaption>
</figure>`;

blogData = blogData.replace(oldFig1Html, newFig1Html);
blogData = blogData.replace(oldFig2Html, newFig2Html);
blogData = blogData.replace(oldFig3Html, newFig3Html);

// Markdown image replacements for content & rawContent
const oldMarkdown1 = `![Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré](https://www.marabout-aziman.fr/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp)`;
const newMarkdown1 = `![Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré](/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp)`;

const oldMarkdown2 = `![Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire](https://www.marabout-aziman.fr/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp)`;
const newMarkdown2 = `![Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire](/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp)`;

const oldMarkdown3 = `![Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent](https://www.marabout-aziman.fr/images/blog/utilisation-billet-temoin-portefeuille-magique.webp)`;
const newMarkdown3 = `![Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent](/images/blog/utilisation-billet-temoin-portefeuille-magique.webp)`;

blogData = blogData.replaceAll(oldMarkdown1, newMarkdown1);
blogData = blogData.replaceAll(oldMarkdown2, newMarkdown2);
blogData = blogData.replaceAll(oldMarkdown3, newMarkdown3);

fs.writeFileSync(blogDataPath, blogData, 'utf8');
console.log('Successfully updated blogData.ts with HTML figures & card image!');
