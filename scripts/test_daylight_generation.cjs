const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

async function testDaylightGeneration() {
  const prompt = "Crisp daytime documentary photograph of real authentic West African ritual objects neatly arranged on a rustic light wooden table by a bright sunlit window. Natural white daylight, sharp focus, clear details. An antique brass padlock tied with red and white cotton cords, glistening natural white cowrie shells, a small terracotta bowl with raw honey, dried botanicals. Raw tactile physical textures, wood grain, authentic documentary photo taken on modern camera, bright and luminous natural daylight, high clarity, clean background, strictly no humans, no hands, no CGI, no 3D render, no plastic skin.";

  console.log('1. Calling gpt-image-2 with bright daylight prompt...');
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    })
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('API Error:', data);
    return;
  }

  const b64 = data.data[0].b64_json;
  const rawBuffer = Buffer.from(b64, 'base64');
  
  const testDir = path.resolve('public/images/test');
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

  const rawPath = path.join(testDir, 'daylight_raw.png');
  fs.writeFileSync(rawPath, rawBuffer);
  console.log(`Raw image saved: ${rawPath} (${(rawBuffer.length / 1024).toFixed(1)} KB)`);

  // Convert to WebP and JPG optimized < 200 KB
  const webpPath = path.join(testDir, 'daylight_optimized.webp');
  await sharp(rawBuffer)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);
  
  const webpSize = fs.statSync(webpPath).size / 1024;
  console.log(`Optimized WebP saved: ${webpPath} (${webpSize.toFixed(1)} KB - Under 200KB: ${webpSize < 200})`);

  const jpgPath = path.join(testDir, 'daylight_optimized.jpg');
  await sharp(rawBuffer)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(jpgPath);

  const jpgSize = fs.statSync(jpgPath).size / 1024;
  console.log(`Optimized JPG saved: ${jpgPath} (${jpgSize.toFixed(1)} KB - Under 200KB: ${jpgSize < 200})`);
}

testDaylightGeneration().catch(console.error);
