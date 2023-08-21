import { parseXmlSitemap, parseHtmlSitemap } from './SitemapParser';
import { fetchPageContent, analyzeContent } from './ContentReader';

const analyzePageListContent = (url: string) => {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    return {
        url,
        rootUrl: urlObj.origin,
        L1: pathParts[0] || '',
        L2: pathParts[1] || '',
        L3: pathParts[2] || '',
        L4: pathParts[3] || '',
        L5: pathParts[4] || '',
    };
};
export const analyzeWebsite = async (sitemapUrl: string) => {
    // Parse both XML and HTML sitemaps
    const xmlLinks = await parseXmlSitemap(sitemapUrl);
    const htmlLinks = await parseHtmlSitemap(sitemapUrl);

    // Combine and limit the number of links to process
    const MAX_URLS_TO_PROCESS = 50;
    const allLinks = xmlLinks.concat(htmlLinks);
    const linksToProcess = allLinks.slice(0, MAX_URLS_TO_PROCESS);

    console.log(`Found ${allLinks.length} URLs, processing ${linksToProcess.length}`);

    // Fetch and analyze content for each link
    const contentAnalysis = await Promise.all(
        linksToProcess.map(async (url: string) => {
            console.log(`Processing URL: ${url}`);
            const content = await fetchPageContent(url);
            const urlPaths = analyzePageListContent(url);
            const analyzedContent = analyzeContent(content, urlPaths.rootUrl); // Capture the analyzed content


            return {
                url,
                content: analyzedContent, // Return the analyzed content
                paths: urlPaths,
            };
        })
    );

    return {
        message: allLinks.length > MAX_URLS_TO_PROCESS
            ? `Found ${allLinks.length} URLs, but only processed the first ${MAX_URLS_TO_PROCESS}`
            : undefined,
        // sitemap: {
        //     xmlLinks,
        //     htmlLinks,
        // },
        contentAnalysis,
    };
};
