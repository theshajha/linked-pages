import { parseStringPromise } from 'xml2js';
import { JSDOM } from 'jsdom';

export const parseXmlSitemap = async (url: string) => {
    const response = await fetch(url);
    const xml = await response.text();
    const result = await parseStringPromise(xml);
    return result.urlset.url.map((item: any) => item.loc[0]);
};

export const parseHtmlSitemap = async (url: string) => {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('a');
    return Array.from(links).map((link) => link.href);
};
