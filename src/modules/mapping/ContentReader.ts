import axios from 'axios';
import * as cheerio  from 'cheerio';

const getTotalLinks = ($: cheerio.CheerioAPI) => {
    return $('a').length;
};

const getInternalLinks = ($: cheerio.CheerioAPI, baseUrl: string) => {
    const urlObj = new URL(baseUrl);
    return $('a').filter((_, element) => {
        const href = $(element).attr('href');
        return href ? href.startsWith(urlObj.origin) : false; // Ensure a boolean is returned
    }).length;
};

const getCTAs = ($: cheerio.CheerioAPI) => {
    return $('button, a.cta-button').length;
};

const getImagesWithoutAlt = ($: cheerio.CheerioAPI) => {
    return $('img:not([alt])').length;
};

const getTotalForms = ($: cheerio.CheerioAPI) => {
    return $('form').length;
};

const getTotalScripts = ($: cheerio.CheerioAPI) => {
    return $('script').length;
};

export const fetchPageContent = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const analyzeContent = (html: string, baseUrl: string) => {
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

    return {
        title,
        description,
        keywords,
        headings,
        images,
        totalImages: images.length, // Added total images count
        totalLinks: getTotalLinks($),
        internalLinks: getInternalLinks($, baseUrl),
        CTAs: getCTAs($),
        imagesWithoutAlt: getImagesWithoutAlt($),
        totalForms: getTotalForms($),
        totalScripts: getTotalScripts($),
        // Add more analysis results as needed
    };
};
