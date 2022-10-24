import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-02";
import HeroArea from "@containers/hero/layout-03";
import AboutArea from "@containers/about/layout-02";
import FunFactArea from "@containers/funfact/layout-01";
import VideoArea from "@containers/video/layout-03";
import CourseArea from "@containers/course/layout-04";
import TestimonialArea from "@containers/testimonial/layout-03";
import TeamArea from "@containers/team/layout-01";
import BlogArea from "@containers/blog/layout-03";
import NewsletterArea from "@containers/newsletter/layout-01";

import { normalizedData } from "@utils/methods";
import { IBlog, ICourse } from "@utils/types";

import { getPageData } from "../lib/page";
import { getAllBlogs } from "../lib/blog";
import { getallCourses } from "../lib/course";

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
            <SEO title="Distant Learning" />
            <HeroArea data={content?.["hero-area"]} />
            <AboutArea
                data={content?.["about-area"]}
                titleSize="large"
                space="top-bottom-3"
            />
            <FunFactArea
                data={content?.["funfact-area"]}
                bg="tw-bg-gray-200"
                space="none"
            />
            <VideoArea
                data={content?.["video-area"]}
                titleSize="large"
                space="top-bottom-2"
            />
            <CourseArea
                data={{ ...content?.["course-area"], courses: data.courses }}
                space="bottom"
            />
            <TestimonialArea
                data={content?.["testimonial-area"]}
                titleSize="large"
            />
            <TeamArea data={content?.["team-area"]} titleSize="large" />
            <BlogArea
                data={{ ...content?.["blog-area"], blogs: data.blogs }}
                titleSize="large"
            />
            <NewsletterArea data={content?.["newsletter-area"]} />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("home", "index-03");
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
                footerMode: "light",
            },
        },
    };
};

export default Home;
