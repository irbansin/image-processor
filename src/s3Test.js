// Usage: node src/s3Test.js
require('dotenv').config();
const s3 = require('./lib/s3');

async function testS3() {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `test-object-${Date.now()}.txt`,
      Body: 'S3 connection test',
      ContentType: 'text/plain',
    };
    const res = await s3.upload(params).promise();
    console.log('S3 upload successful:', res.Location);
  } catch (err) {
    console.error('S3 upload failed:', err.message);
    process.exit(1);
  }
}

testS3();
