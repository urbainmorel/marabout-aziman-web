const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

async function testGeneration() {
  const prompt = "Close-up macro of consecrated African sea cowrie shells and antique brass padlock on dark carved wood with warm candlelight. Shot on iPhone 17 Pro Max style, hyper-realistic, shallow depth of field.";
  
  // Method 1: Imagen style predict / generateImages
  // Let's test endpoint
  const endpoint1 = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateImages?key=${apiKey}`;
  const body1 = {
    prompt: { text: prompt },
    numberOfImages: 1,
    aspectRatio: "16:9",
    outputMimeType: "image/jpeg"
  };

  console.log('Testing Method 1 (generateImages)...');
  try {
    const res1 = await fetch(endpoint1, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body1)
    });
    console.log('Method 1 status:', res1.status);
    const data1 = await res1.json();
    if (res1.ok) {
      console.log('Method 1 SUCCESS!');
      console.log('Keys:', Object.keys(data1));
      return data1;
    } else {
      console.log('Method 1 failed:', JSON.stringify(data1).substring(0, 300));
    }
  } catch (e) {
    console.log('Method 1 error:', e.message);
  }

  // Method 2: generateContent (multimodal generation)
  const endpoint2 = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${apiKey}`;
  const body2 = {
    contents: [
      {
        parts: [
          { text: `Generate an image with this prompt: ${prompt}` }
        ]
      }
    ]
  };

  console.log('Testing Method 2 (generateContent)...');
  try {
    const res2 = await fetch(endpoint2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body2)
    });
    console.log('Method 2 status:', res2.status);
    const data2 = await res2.json();
    if (res2.ok) {
      console.log('Method 2 SUCCESS!');
      console.log('Keys:', Object.keys(data2));
      return data2;
    } else {
      console.log('Method 2 failed:', JSON.stringify(data2).substring(0, 300));
    }
  } catch (e) {
    console.log('Method 2 error:', e.message);
  }

  // Method 3: Check model metadata
  console.log('Checking model info...');
  const res3 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image?key=${apiKey}`);
  const data3 = await res3.json();
  console.log('Model info supportedMethods:', data3.supportedGenerationMethods);
}

testGeneration();
