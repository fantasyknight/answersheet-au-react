import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import Wrapper from "@ui/wrapper/wrapper-04";
import QuoteArea from "@containers/quote/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import VideoArea from "@containers/video/layout-07";
import ServiceArea from "@containers/service/layout-07";
import TestimonialArea from "@containers/testimonial/layout-04";
import BrandArea from "@containers/brand/layout-01";
import NewsletterArea from "@containers/newsletter/layout-02";

import { normalizedData } from "@utils/methods";

import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const AboutUs02: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Us 02" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="About Us"
                showTitle={false}
            />
            <Wrapper showBalls={false}>
                <QuoteArea
                    data={content?.["quote-area"]}
                    space="none"
                    bg="tw-bg-transparent"
                />
                <FunfactArea data={content?.["funfact-area"]} />
                <VideoArea
                    bg="tw-bg-transparent"
                    data={content?.["video-area"]}
                    space="none"
                />
            </Wrapper>
            <ServiceArea data={content?.["service-area"]} />
            <TestimonialArea data={content?.["testimonial-area"]} />
            <BrandArea data={content?.["brand-area"]} />
            <NewsletterArea
                data={content?.["newsletter-area"]}
                titleSize="large"
            />
        </>
    );
};

AboutUs02.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "about-us-02");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AboutUs02;
