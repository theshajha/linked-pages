import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Website Analysis Tool</h1>
            <p>This tool provides comprehensive analysis of a website by reading its full sitemap and content.</p>
            <Link href="/about">
                <a>Learn more</a>
            </Link>
        </div>
    );
};

export default Home;
