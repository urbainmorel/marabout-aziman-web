const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

console.log('Testing key length:', apiKey.length);

async function testKey() {
  try {
    // Test 1: with query param ?key=
    const res1 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data1 = await res1.json();
    console.log('Test 1 (query param key) status:', res1.status);
    if (res1.ok) {
      console.log('Models found:', data1.models ? data1.models.length : 0);
      const imgModels = (data1.models || []).filter(m => m.name.includes('imagen') || m.name.includes('image') || m.name.includes('banana'));
      console.log('Image models available:', imgModels.map(m => m.name));
      return;
    } else {
      console.log('Test 1 error:', JSON.stringify(data1));
    }

    // Test 2: with header x-goog-api-key
    const res2 = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      headers: { 'x-goog-api-key': apiKey }
    });
    const data2 = await res2.json();
    console.log('Test 2 (header) status:', res2.status);
    if (!res2.ok) {
      console.log('Test 2 error:', JSON.stringify(data2));
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testKey();
