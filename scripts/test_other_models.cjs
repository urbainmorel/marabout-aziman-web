const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

async function testOtherModels() {
  const models = [
    'gemini-2.5-flash-image',
    'imagen-3.0-generate-002',
    'nano-banana-pro-preview',
    'gemini-3.1-flash-lite-image'
  ];

  for (const m of models) {
    console.log(`\nTesting ${m}...`);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "draw a cowrie shell on wood" }] }]
        })
      });
      console.log(`${m} status:`, res.status);
      const data = await res.json();
      if (res.ok) {
        console.log(`${m} SUCCESS!`, Object.keys(data));
      } else {
        console.log(`${m} message:`, data.error ? data.error.message.substring(0, 150) : data);
      }
    } catch (e) {
      console.log(`${m} error:`, e.message);
    }
  }
}

testOtherModels();
