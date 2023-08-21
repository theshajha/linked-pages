import axios from 'axios';
import cheerio from 'cheerio';

export const fetchPageContent = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const analyzeContent = (html: string) => {
    const $ = cheerio.load(html);
    // Analyze and extract specific content as needed
};
