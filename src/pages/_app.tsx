import type { AppProps } from 'next/app';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import {PrimaryNav} from '@/components/Header';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
        return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            <PrimaryNav />
            <Component {...pageProps} />
        </Theme>
        );
}

export default MyApp;
