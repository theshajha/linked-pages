import type { AppProps } from 'next/app';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function MyApp({ Component, pageProps }: AppProps) {
        return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            <Component {...pageProps} />
        </Theme>
        );
}

export default MyApp;
