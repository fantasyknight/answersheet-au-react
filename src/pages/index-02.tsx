import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-02";
import BrandArea from "@containers/brand/layout-01";
import CourseArea from "@containers/course/layout-03";
import ServiceArea from "@containers/service/layout-02";
import VideoArea from "@containers/video/layout-02";
import TestimonialArea from "@containers/testimonial/layout-02";
import CtaArea from "@containers/cta/layout-02";
import FunFactArea from "@containers/funfact/layout-03";
import BlogArea from "@containers/blog/layout-02";
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
        recentPosts: IBlog[];
        recentPostsWithImage: IBlog[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Course Portal" />
            <HeroArea data={content?.["hero-area"]} />
            <BrandArea data={content?.["brand-area"]} />
            <CourseArea
                data={{ ...content?.["course-area"], courses: data.courses }}
            />
            <ServiceArea data={content?.["service-area"]} />
            <VideoArea
                data={content?.["video-area"]}
                titleSize="large"
                space="top-bottom-2"
            />
            <TestimonialArea data={content?.["testimonial-area"]} />
            <CtaArea data={content?.["cta-area"]} />
            <FunFactArea data={content?.["funfact-area"]} />
            <BlogArea
                data={{
                    ...content?.["blog-area"],
                    recentPosts: data.recentPosts,
                    recentPostsWithImage: data.recentPostsWithImage,
                }}
            />
            <NewsletterArea data={content?.["newsletter-area"]} />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("home", "index-02");
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
    const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);
    const { blogs: recentPostsWithImage } = getAllBlogs(
        ["title", "image", "category", "views"],
        5,
        2
    );
    return {
        props: {
            data: {
                page,
                courses,
                recentPosts,
                recentPostsWithImage,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Home;
