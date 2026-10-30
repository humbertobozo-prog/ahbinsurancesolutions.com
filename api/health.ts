import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json({
    status: 'ok',
    service: 'AHB Insurance Solutions API',
    broker: 'Andres H. Bozo (NPN 21228432)',
    timestamp: new Date().toISOString()
  });
}
