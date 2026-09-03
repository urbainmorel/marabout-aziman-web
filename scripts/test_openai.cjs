const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const keyMatch = envContent.match(/OPENAI_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

console.log('Testing OpenAI key length:', apiKey.length);

async function testOpenAI() {
  try {
    // 1. Check models
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    console.log('Models endpoint status:', res.status);
    const data = await res.json();
    if (res.ok) {
      const imgModels = (data.data || []).filter(m => m.id.includes('dall') || m.id.includes('image') || m.id.includes('gpt'));
      console.log('Available models:', (data.data || []).filter(m => m.id.includes('dall') || m.id.includes('image')).map(m => m.id));
    } else {
      console.log('Error fetching models:', data);
      return;
    }

    // 2. Test generation of 1 image
    console.log('\nTesting image generation...');
    const testPrompt = "Macro still life photograph of consecrated African sea cowrie shells and antique brass padlock on dark carved wood with warm candlelight. Shot on iPhone 17 Pro Max style, hyper-realistic, shallow depth of field.";
    
    // Test dall-e-3 or gpt-image-2
    const imgRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: testPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"
      })
    });

    console.log('Image generation status:', imgRes.status);
    const imgData = await imgRes.json();
    if (imgRes.ok) {
      console.log('SUCCESS! Image URL generated:', imgData.data[0].url.substring(0, 80) + '...');
    } else {
      console.log('Image generation error:', imgData);
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

testOpenAI();
