import { parseXmlSitemap, parseHtmlSitemap } from './SitemapParser';
import { fetchPageContent, analyzeContent } from './ContentReader';

export const analyzeWebsite = async (sitemapUrl: string) => {
    // Parse both XML and HTML sitemaps
    const xmlLinks = await parseXmlSitemap(sitemapUrl);
    const htmlLinks = await parseHtmlSitemap(sitemapUrl);

    // Combine and limit the number of links to process
    const MAX_URLS_TO_PROCESS = 100;
    const allLinks = xmlLinks.concat(htmlLinks);
    const linksToProcess = allLinks.slice(0, MAX_URLS_TO_PROCESS);

    console.log(`Found ${allLinks.length} URLs, processing ${linksToProcess.length}`);

    // Fetch and analyze content for each link
    const contentAnalysis = await Promise.all(
        linksToProcess.map(async (url: string) => {
            console.log(`Processing URL: ${url}`);
            const content = await fetchPageContent(url);
            const analyzedContent = analyzeContent(content); // Capture the analyzed content
            return {
                url,
                content: analyzedContent, // Return the analyzed content
            };
        })
    );

    return {
        sitemap: {
            xmlLinks,
            htmlLinks,
        },
        contentAnalysis,
        message: allLinks.length > MAX_URLS_TO_PROCESS
            ? `Found ${allLinks.length} URLs, but only processed the first ${MAX_URLS_TO_PROCESS}`
            : undefined,
    };
};
