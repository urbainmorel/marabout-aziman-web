const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Load API key
const envContent = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : (process.env.OPENAI_API_KEY || '');

if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not found!');
  process.exit(1);
}

const outputDir = path.resolve('public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const variants = [
  {
    name: "portefeuille_vodun_variante1.jpg",
    prompt: "Macro photorealistic photography of a sacred West African Vodun altar scene from Benin. A rich red velvet altar cloth holds an open brown leather pouch spilling out an abundance of green 100 Euro banknotes. Stacks of 100 Euro bills are scattered across the red velvet fabric. Beside the pouch is an authentic hand-carved dark wood statue of a kneeling African woman holding a calabash bowl on top of her head with both hands, featuring visible carved wood grain and tool marks. Decorated with white sea cowrie shells (cauris), fresh green plant leaves, kola nuts, a small terracotta ritual pot, a traditional brass bell, and glowing lit white candles emitting soft smoke. Absolutely NO rosary, NO beads, NO cross. Warm candlelight glow, dark atmospheric background, hyper-realistic."
  },
  {
    name: "portefeuille_vodun_variante2.jpg",
    prompt: "Cinematic medium close-up shot of a traditional Beninese ritual shrine altar. A luxurious brown leather wallet pouch sits wide open on a vibrant red velvet satin cloth, overflowing with wads of crisp green 100 Euro cash. Numerous 100 Euro banknotes are neatly stacked and scattered around the altar. Next to the wallet stands a handcrafted raw wooden figurine of a kneeling woman silhouette carrying a carved calabash on her head with both hands. Surrounding artifacts include shiny white cowrie shells, sacred green leaves, kola nuts, a clay pot, and lit tall white candles producing soft incense smoke. Strictly NO rosary and NO prayer beads. Dramatic lighting, ultra detailed."
  },
  {
    name: "portefeuille_vodun_variante3.jpg",
    prompt: "High-end spiritual still life shot of a Vodun consecrated ritual altar. Brimming with wealth, a brown leather pouch on a deep red velvet backdrop is filled to capacity with 100 Euro bills spilling over onto the cloth. Loose 100 Euro banknotes and piles of cash rest next to a hand-carved dark wood statue of a kneeling African woman holding a calabash above her head. Traditional ritual elements include white cowrie shells, kola nuts, fresh green medicinal leaves, a terracotta ritual bowl, a brass ritual bell, and warm lit white candles with gentle flames. NO rosary, NO beads. Rich warm aesthetic, shallow depth of field, photorealistic."
  }
];

async function generateVariant(variant) {
  const filePath = path.join(outputDir, variant.name);
  console.log(`Generating ${variant.name}...`);

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: variant.prompt,
      n: 1,
      size: "1536x1024"
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  if (!data.data || !data.data[0] || !data.data[0].b64_json) {
    throw new Error('Missing b64_json response');
  }

  const buffer = Buffer.from(data.data[0].b64_json, 'base64');
  await sharp(buffer).jpeg({ quality: 88 }).toFile(filePath);
  console.log(`Successfully generated and saved: ${filePath}`);
}

async function run() {
  for (const v of variants) {
    try {
      await generateVariant(v);
    } catch (e) {
      console.error(`Failed ${v.name}:`, e.message);
    }
  }
}

run();
