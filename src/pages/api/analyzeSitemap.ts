import { NextApiRequest, NextApiResponse } from 'next';
import { analyzeWebsite } from '@/modules/mapping/Mapper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { sitemapUrl } = req.query;

    if (!sitemapUrl || typeof sitemapUrl !== 'string' || !sitemapUrl.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid sitemap URL' });
    }


    try {
        const analysis = await analyzeWebsite(sitemapUrl);
        console.log(analysis);
        res.status(200).json(analysis);
    } catch (error: any) {
        console.error('Error analyzing sitemap:', error); // Log the error for debugging
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ error: 'Failed to analyze sitemap', details: errorMessage });
    }

};
