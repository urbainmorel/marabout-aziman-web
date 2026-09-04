const dotenv = require('dotenv');
dotenv.config();

const token = process.env.SANITY_API_TOKEN;
const projectId = 'y8rqnviv';
const dataset = 'production';

async function testConnection() {
  console.log('Testing Sanity connection with projectId:', projectId, 'and dataset:', dataset);
  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-03-01/data/query/${dataset}?query=*[_type in ["post", "category", "author"]]`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log('Sanity response status:', res.status);
    console.log('Current docs count:', data.result ? data.result.length : 0);
    console.log('Result sample:', data);
  } catch (err) {
    console.error('Error connecting to Sanity:', err);
  }
}

testConnection();
