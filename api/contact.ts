import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, zipCode, birthYear } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required fields' });
  }

  console.log(`[Vercel Serverless] Lead submission received: ${name} | Phone: ${phone} | ZIP: ${zipCode || 'N/A'} | Birth Year: ${birthYear || 'N/A'} | Email: ${email || 'N/A'}`);

  return res.status(200).json({
    success: true,
    message: 'Lead received successfully. A licensed Florida broker will contact you shortly.',
    timestamp: new Date().toISOString()
  });
}
