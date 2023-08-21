import React, { useState } from 'react';
import { analyzeWebsite } from '@/modules/mapping/Mapper';

const Home: React.FC = () => {
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleSitemapInput = async () => {
        const response = await fetch(`/api/analyzeSitemap?sitemapUrl=${sitemapUrl}`);
        const analysis = await response.json();
        setResult(analysis);
    };


    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">Website Analysis Tool</h1>
            <p className="text-lg mb-6">This tool provides comprehensive analysis of a website by reading its full sitemap and content.</p>
            <div className="flex flex-col md:flex-row items-center mb-6">
                <input type="text" value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} placeholder="Enter sitemap URL" className="border p-2 flex-grow mr-2 mb-2 md:mb-0" />
                <button onClick={handleSitemapInput} className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition duration-200">Analyze Sitemap</button>
            </div>
            <pre className="bg-gray-100 p-4 rounded overflow-x-scroll">{result && JSON.stringify(result, null, 2)}</pre>
        </div>
    );
};

export default Home;
