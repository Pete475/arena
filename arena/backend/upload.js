import AWS from 'aws-sdk';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// ---- 1. Configure AWS S3 ----
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,   // safer than hardcoding
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'YOUR_BUCKET_REGION',                 // e.g., 'us-east-1'
});

// ---- 2. Configure Supabase ----
const supabase = createClient(
  'https://rnybpoktwbztcnoqlhoz.supabase.co',
  process.env.PROD_DB
);

// ---- 3. Upload function ----
async function uploadFileToS3(filePath, s3Key) {
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: s3Key,
    Body: fileStream,
    ACL: 'public-read' // optional, allows public URL
  };

  const result = await s3.upload(params).promise();
  return result.Location; // S3 URL
}

// ---- 4. Save URL to Supabase ----
async function saveFileLinkToSupabase(url, fileName) {
  const { data, error } = await supabase
    .from('files')  // replace with your table name
    .insert([{ url, name: fileName }]);

  if (error) throw error;
  return data;
}

// ---- 5. Example usage ----
async function main() {
  try {
    const filePath = './example.txt';  // local file
    const s3Key = 'uploads/example.txt';

    const s3Url = await uploadFileToS3(filePath, s3Key);
    console.log('Uploaded to S3:', s3Url);

    const saved = await saveFileLinkToSupabase(s3Url, 'example.txt');
    console.log('Saved to Supabase:', saved);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
