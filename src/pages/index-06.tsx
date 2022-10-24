import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-03";
import HeroArea from "@containers/hero/layout-06";
import QuoteArea from "@containers/quote/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import ServiceArea from "@containers/service/layout-05";
import CourseArea from "@containers/course/layout-07";
import TestimonialArea from "@containers/testimonial/layout-05";
import BrandArea from "@containers/brand/layout-02";
import BlogArea from "@containers/blog/layout-03";
import ServiceAreaTwo from "@containers/service/layout-06";
import CtaArea from "@containers/cta/layout-03";

import { normalizedData } from "@utils/methods";
import { IBlog, ICourse } from "@utils/types";

import { getPageData } from "../lib/page";
import { getallCourses } from "../lib/course";
import { getAllBlogs } from "../lib/blog";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
        courses: ICourse[];
        blogs: IBlog[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Remote Training" />
            <HeroArea data={content?.["hero-area"]} />
            <Wrapper>
                <QuoteArea data={content?.["quote-area"]} space="top-2" />
                <FunfactArea
                    data={content?.["funfact-area"]}
                    bg="tw-bg-white-catskill"
                />
            </Wrapper>
            <ServiceArea data={content?.["service-area"]} titleSize="large" />
            <CourseArea
                data={{ ...content?.["course-area"], courses: data.courses }}
                titleSize="large"
            />
            <TestimonialArea data={content?.["testimonial-area"]} />
            <BrandArea data={content?.["brand-area"]} space="bottom" />
            <BlogArea data={{ ...content?.["blog-area"], blogs: data.blogs }} />
            <ServiceAreaTwo
                data={content?.["service-area-two"]}
                titleSize="large"
            />
            <CtaArea data={content?.["cta-area"]} space="bottom" />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("home", "index-06");
    const courses = getallCourses(
        [
            "title",
            "thumbnail",
            "price",
            "currency",
            "total_lectures",
            "total_students",
        ],
        0,
        6
    );

    const { blogs } = getAllBlogs(
        ["title", "image", "category", "postedAt", "views"],
        0,
        3
    );

    return {
        props: {
            data: {
                page,
                courses,
                blogs,
            },

            layout: {
                headerTransparent: true,
                headerMode: "light",
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Home;
