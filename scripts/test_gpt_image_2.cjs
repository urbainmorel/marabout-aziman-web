const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

async function testGptImage2() {
  const testPrompt = "Macro still life photograph of consecrated African sea cowrie shells and antique brass padlock on dark carved wood with warm candlelight. Shot on iPhone 17 Pro Max style, hyper-realistic, shallow depth of field.";
  
  console.log('Testing gpt-image-2 generation...');
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: testPrompt,
      n: 1,
      size: "1024x1024"
    })
  });

  console.log('Status:', res.status);
  const data = await res.json();
  if (res.ok) {
    console.log('SUCCESS with gpt-image-2!');
    console.log('Result data:', Object.keys(data));
    if (data.data && data.data[0]) {
      console.log('Image URL or B64:', data.data[0].url ? data.data[0].url.substring(0, 80) : 'b64_json received');
    }
  } else {
    console.log('Error:', JSON.stringify(data, null, 2));
  }
}

testGptImage2();
