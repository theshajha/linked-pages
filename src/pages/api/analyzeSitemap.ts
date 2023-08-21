import { NextApiRequest, NextApiResponse } from 'next';
import { analyzeWebsite } from '@/modules/mapping/Mapper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { sitemapUrl } = req.query;

    if (typeof sitemapUrl !== 'string') {
        return res.status(400).json({ error: 'Invalid sitemap URL' });
    }

    try {
        const analysis = await analyzeWebsite(sitemapUrl);
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze sitemap' });
    }
};
