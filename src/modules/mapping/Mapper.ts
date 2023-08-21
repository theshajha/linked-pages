import { parseXmlSitemap, parseHtmlSitemap } from './SitemapParser';
import { fetchPageContent, analyzeContent } from './ContentReader';

export const analyzeWebsite = async (sitemapUrl: string) => {
    // Parse both XML and HTML sitemaps
    const xmlLinks = await parseXmlSitemap(sitemapUrl);
    const htmlLinks = await parseHtmlSitemap(sitemapUrl);

    // Fetch and analyze content for each link
    const contentAnalysis = await Promise.all(
        xmlLinks.concat(htmlLinks).map(async (url: string) => { // Add the type here
            const content = await fetchPageContent(url);
            return analyzeContent(content);
        })
    );

    return {
        sitemap: {
            xmlLinks,
            htmlLinks,
        },
        contentAnalysis,
    };
};

