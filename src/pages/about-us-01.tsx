import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-08";
import AboutArea from "@containers/about/layout-02";
import VideoArea from "@containers/video/layout-06";
import TestimonialArea from "@containers/testimonial/layout-07";
import CtaArea from "@containers/cta/layout-02";
import TeamArea from "@containers/team/layout-02";
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

const AboutUs01: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Us 01" />
            <HeroArea data={content?.["hero-area"]} />
            <AboutArea
                data={content?.["about-area"]}
                bg="tw-bg-white"
                space="top-bottom-3"
                titleSize="large"
            />
            <VideoArea data={content?.["video-area"]} titleSize="large" />
            <TestimonialArea
                data={content?.["testimonial-area"]}
                titleSize="large"
            />
            <CtaArea
                data={content?.["cta-area"]}
                space="bottom"
                bg="tw-bg-light-100"
            />
            <TeamArea data={content?.["team-area"]} titleSize="large" />
            <NewsletterArea data={content?.["newsletter-area"]} />
        </>
    );
};

AboutUs01.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "about-us-01");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AboutUs01;
