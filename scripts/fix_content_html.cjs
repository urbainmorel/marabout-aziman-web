const fs = require('fs');
const path = require('path');

const blogDataPath = path.resolve('src/data/blogData.ts');
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Replace pseudo-links in contentHtml with real HTML figure tags for Figure 1, Figure 2, Figure 3

// 1. Figure 1 HTML replacement
const link1 = `<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><!-- EMPLACEMENT IMAGE 1 : HERO BANNER --></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\">!<a href=\\"https://www.marabout-aziman.fr/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp\\" class=\\"text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors\\">Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré</a></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><em class=\\"italic text-slate-900\\">Figure 1 : Authentique portefeuille magique Bédou en cuir véritable, scellé et consacré au sanctuaire du Grand Maître Aziman.</em></p>`;

const fig1 = `<figure class=\\"my-8 text-center\\"><img src=\\"/images/blog/portefeuille-magique-grand-maitre-aziman-cuir.webp\\" alt=\\"Véritable portefeuille magique avec le Grand Maître Aziman en cuir noble consacré\\" class=\\"w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200 mx-auto\\" /><figcaption class=\\"mt-3 text-sm text-slate-600 italic font-serif\\">Figure 1 : Authentique portefeuille magique Bédou en cuir véritable, scellé et consacré au sanctuaire du Grand Maître Aziman.</figcaption></figure>`;

// 2. Figure 2 HTML replacement
const link2 = `<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><!-- EMPLACEMENT IMAGE 2 : CONSÉCRATION AU SANCTUAIRE --></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\">!<a href=\\"https://www.marabout-aziman.fr/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp\\" class=\\"text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors\\">Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire</a></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><em class=\\"italic text-slate-900\\">Figure 2 : Rituel de charge nocturne sur l'autel de la divinité de l'abondance Dan au sanctuaire de Cotonou.</em></p>`;

const fig2 = `<figure class=\\"my-8 text-center\\"><img src=\\"/images/blog/consecration-portefeuille-magique-sanctuaire-aziman.webp\\" alt=\\"Cérémonie de consécration nocturne du portefeuille magique par Maître Aziman au sanctuaire\\" class=\\"w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200 mx-auto\\" /><figcaption class=\\"mt-3 text-sm text-slate-600 italic font-serif\\">Figure 2 : Rituel de charge nocturne sur l'autel de la divinité de l'abondance Dan au sanctuaire de Cotonou.</figcaption></figure>`;

// 3. Figure 3 HTML replacement
const link3 = `<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><!-- EMPLACEMENT IMAGE 3 : UTILISATION QUOTIDIENNE DU BILLET TÉMOIN --></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\">!<a href=\\"https://www.marabout-aziman.fr/images/blog/utilisation-billet-temoin-portefeuille-magique.webp\\" class=\\"text-brand-700 font-semibold underline decoration-brand-300 hover:text-brand-900 hover:decoration-brand-600 transition-colors\\">Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent</a></p>\\n<p class=\\"my-4 text-base text-slate-800 leading-relaxed font-sans\\"><em class=\\"italic text-slate-900\\">Figure 3 : Positionnement du billet témoin neuf dans le compartiment principal pour activer l'attraction matérielle.</em></p>`;

const fig3 = `<figure class=\\"my-8 text-center\\"><img src=\\"/images/blog/utilisation-billet-temoin-portefeuille-magique.webp\\" alt=\\"Billet témoin inséré dans le compartiment du portefeuille magique pour attirer l'argent\\" class=\\"w-full max-h-[480px] object-cover rounded-2xl shadow-lg border border-brand-200 mx-auto\\" /><figcaption class=\\"mt-3 text-sm text-slate-600 italic font-serif\\">Figure 3 : Positionnement du billet témoin neuf dans le compartiment principal pour activer l'attraction matérielle.</figcaption></figure>`;

if (!blogData.includes(link1)) {
  console.error('Could not find link1 string in blogData.ts!');
} else {
  blogData = blogData.replace(link1, fig1);
  console.log('Replaced link1 with fig1');
}

if (!blogData.includes(link2)) {
  console.error('Could not find link2 string in blogData.ts!');
} else {
  blogData = blogData.replace(link2, fig2);
  console.log('Replaced link2 with fig2');
}

if (!blogData.includes(link3)) {
  console.error('Could not find link3 string in blogData.ts!');
} else {
  blogData = blogData.replace(link3, fig3);
  console.log('Replaced link3 with fig3');
}

fs.writeFileSync(blogDataPath, blogData, 'utf8');
console.log('contentHtml figures updated!');
