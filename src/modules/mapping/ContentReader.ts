import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchPageContent = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const analyzeContent = (html: string) => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const keywords = $('meta[name="keywords"]').attr('content');
    const headings = {
        h1: $('h1').length,
        h2: $('h2').length,
        h3: $('h3').length,
        // Continue for other heading levels
    };
    const images: { src: string | undefined; alt: string | undefined }[] = [];
    $('img').each((index, element) => {
        images.push({
            src: $(element).attr('src'),
            alt: $(element).attr('alt'),
        });
    });
    // Continue with other analyses as needed

    return {
        title,
        description,
        keywords,
        headings,
        images,
        // Add more analysis results as needed
    };
};
