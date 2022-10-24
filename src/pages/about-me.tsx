import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ServiceArea from "@containers/service/layout-01";
import TestimonialArea from "@containers/testimonial/layout-06";
import VideoArea from "@containers/video/layout-07";
import BrandArea from "@containers/brand/layout-01";
import FunFactArea from "@containers/funfact/layout-02";
import NewsletterArea from "@containers/newsletter/layout-01";

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

const AboutMe: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Me" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="About Me"
                showTitle={false}
                className="tw-bg-gray-200"
            />
            <ServiceArea
                data={content?.["service-area"]}
                space="bottom-3"
                bg="tw-bg-gray-200"
            />
            <VideoArea
                data={content?.["video-area"]}
                bg="tw-bg-gray-200"
                space="none"
            />
            <TestimonialArea data={content?.["testimonial-area"]} />
            <BrandArea data={content?.["brand-area"]} space="bottom" />
            <FunFactArea
                data={content?.["funfact-area"]}
                bg="tw-bg-white-catskill"
            />
            <NewsletterArea data={content?.["newsletter-area"]} />
        </>
    );
};

AboutMe.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "about-me");
    return {
        props: {
            data: {
                page,
            },
        },
    };
};

export default AboutMe;
