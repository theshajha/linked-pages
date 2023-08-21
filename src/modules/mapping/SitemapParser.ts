import axios from 'axios';
import * as xml2js from 'xml2js';
import * as cheerio from 'cheerio';

export const parseXmlSitemap = async (sitemapUrl: string) => {
    const response = await axios.get(sitemapUrl);
    const xml = response.data;
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    return result.urlset.url.map((url: any) => url.loc[0]);
};

export const parseHtmlSitemap = async (sitemapUrl: string) => {
    const response = await axios.get(sitemapUrl);
    const $ = cheerio.load(response.data);
    const links: string[] = [];
    $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
            links.push(href);
        }
    });
    return links;
};
