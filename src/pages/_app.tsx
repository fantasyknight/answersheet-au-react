import { ElementType, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import SEO from "@components/seo/deafult-seo";
import FallbackLayout from "@layout/fallback";
import { UIProvider } from "@contexts/ui-context";
import { UserProvider } from "@contexts/user-context";

import "@assets/css/font-awesome-pro.min.css";
import "@assets/css/font-linea.css";
import "@assets/css/fonts.css";
import "@assets/css/tailwind.css";
import "@assets/css/swiper.css";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps = typeof pageProps.layout === "object" ? pageProps.layout : {};
    const session = pageProps.session as Session;

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    return (
        <SessionProvider session={session}>
            <UIProvider>
                <UserProvider>
                    <Layout {...layoutProps}>
                        <SEO />
                            <Component {...pageProps} />
                    </Layout>
                </UserProvider>
            </UIProvider>
        </SessionProvider>
    );
};

export default MyApp;
