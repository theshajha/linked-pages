import React, { useState } from 'react';
import { Grid, Flex, Box, Button, Tooltip, Table, Heading, Text, TextField} from '@radix-ui/themes';

const Home: React.FC = () => {
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actions, setActions] = useState<string[]>([]);

    const addLog = (message: string) => {
        setActions((prevActions) => [...prevActions, message]);
    };

    const handleSitemapInput = async () => {
        addLog('Starting analysis...');
        setIsLoading(true);
        try {
            const response = await fetch(`/api/analyzeSitemap?sitemapUrl=${sitemapUrl}`);
            const analysis = await response.json();
            setResult(analysis);
            // addLog('Analysis completed.');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            addLog(`Error: ${errorMessage}`);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-8">
            <Heading as="h1">Website Analysis Tool</Heading>
            <Text>This tool provides comprehensive analysis of a website by reading its full sitemap and content.</Text>
            <Grid columns="4" gap="1">
                <Flex direction="row" gap="3">
                    <Box width="auto">
                        <TextField.Root>
                            {/*<TextField.Slot>*/}
                            {/*</TextField.Slot>*/}
                            <TextField.Input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} placeholder="Enter sitemap URL"  />
                        </TextField.Root>
                    </Box>

                    <Box width="auto">
                        <Tooltip content={isLoading ? 'Analyzing...' : 'Analyze Sitemap'}>
                            <Button disabled={isLoading} onClick={handleSitemapInput} className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition duration-200">
                                {isLoading ? 'Analyzing...' : 'Analyze Sitemap'}
                            </Button>
                        </Tooltip>
                    </Box>

                </Flex>
            </Grid>

            <div>
                {actions.map((action, index) => (
                    <p key={index}>{action}</p>
                ))}
            </div>
            {result && (
                <Flex direction="column" gap="2">
                    <Text>Analysis completed. {result.message}</Text>
                    <Heading as="h2">Pages</Heading>
                    <Table.Root variant="surface">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Page Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Keywords</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Root URL</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>L1</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>L2</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>L3</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total Images</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total Links</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Internal Links</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total Forms</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total Scripts</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total CTAs</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {result.contentAnalysis && result.contentAnalysis.map((page: any, index: number) => (
                                <Table.Row key={index}>
                                <Table.RowHeaderCell><a href={page.url}>{page.content.title}</a></Table.RowHeaderCell>
                                <Table.Cell>{page.content.keywords}</Table.Cell>
                                <Table.Cell>{page.paths.rootUrl}</Table.Cell>
                                <Table.Cell>{page.paths.L1}</Table.Cell>
                                <Table.Cell>{page.paths.L2}</Table.Cell>
                                <Table.Cell>{page.paths.L3}</Table.Cell>
                                <Table.Cell>{page.content.totalImages}</Table.Cell>
                                <Table.Cell>{page.content.totalLinks}</Table.Cell>
                                <Table.Cell>{page.content.internalLinks}</Table.Cell>
                                <Table.Cell>{page.content.totalForms}</Table.Cell>
                                <Table.Cell>{page.content.totalScripts}</Table.Cell>
                                <Table.Cell>{page.content.CTAs}</Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table.Root>

                    {/* Add more tables for other data types */}
                </Flex>
            )}
        </div>
    );
};

export default Home;
